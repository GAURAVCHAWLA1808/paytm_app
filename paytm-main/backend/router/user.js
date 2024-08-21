const express = require ('express')
const Userrouter = express.Router()
const zod = require('zod')
const jwt = require("jsonwebtoken")
const {User,Accounts}= require("../db/mongoose-schema")
const JWT_SCERET = require('../config')
const Usermiddleware=require('../auth_middleware/user_middleware')

const signupSchema= zod.object({
    username:zod.string().email(),
    password:zod.string().min(8),
    firstname:zod.string(),
    lastname:zod.string()
})
const signinSchema = zod.object({
    username:zod.string().email(),
    password:zod.string().min(8)
})
const updateuserschema = zod.object({
    firstname:zod.string(),
    lastname:zod.string(),
    password:zod.string().min(8)
})
 


Userrouter.post('/signup',async (req,res)=>{
    const { success } = signupSchema.safeParse(req.body);
    console.log('Signup Body:', req.body); 
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        });
    }

    const existingUser = await User.findOne({
        username: req.body.username
    });

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken"
        });
    }

    try {
        const user = await User.create({
            username: req.body.username,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname
        });
        const userId = user._id;

        console.log('Created User:', user); 

       
       const account= await Accounts.create({
            UserId: userId,
            balance: 1 + Math.random() * 10000
        });
         console.log(account)

        console.log('Account created for userId:', userId); 

        const token = jwt.sign({
            userId
        }, JWT_SCERET);

        res.json({
            message: "User created successfully",
            token: token
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

        


Userrouter.post('/signin',async (req,res)=>{
    const body = req.body
    const {success}= signinSchema.safeParse(body)
    const user = await User.findOne({
        username:body.username,
        password:body.password
    })
    if (!success){
        res.json({
            msg:"pls send the right inputs"
        })
    }
    if(!user){
     res.json({
        msg:"there is no user with this username"
     })
    }
    const token = jwt.sign({userId:user._id},JWT_SCERET) 
    res.send({
        token:token
    })

    
})
Userrouter.put('/update',Usermiddleware,async (req,res)=>{
    const body = req.body;
    const { success, data } = updateuserschema.safeParse(body); 
    if (!success) {
        return res.json({
            msg: "Something is wrong with your inputs"
        });
    }

    try {
        const updated = await User.updateOne({ _id: req.userId }, data); 

        if (updated) {
            return res.json({
                msg: "User updated successfully"
            });
        } else {
            return res.json({
                msg: "User was not updated (no changes made)"
            });
        }
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({
            msg: "Internal server error"
        });
    }

})
Userrouter.get('/bulk',Usermiddleware,async(req,res)=>{
    const filter = req.query.filter || ""
    const users = await User.find({
        
        $or:[{
            firstname:{
                "$regex":filter
            }},
           { lastname:{
                "$regex":filter
            },
        }]
    })
    res.json({
        user: users.map(user=>({
           
            firstname: user.firstname,
            lastname: user.lastname,
            username:user.username
            
        }))
     })
})
Userrouter.get("/validation", (req, res) => {
    const token = req.headers.authorization;
  
    try {
      if (!token || !token.startsWith('Bearer ')) {
        return res.status(403).json({
          valid: false,
          msg: "send the right token"
        });
      }
  
      const jwtToken = token.split(' ')[1];
      const decodedValue = jwt.verify(jwtToken, JWT_SCERET);
  
      if (decodedValue.userId) {
        return res.status(200).json({
          valid: true,
          userId: decodedValue.userId 
        });
      } else {
        return res.status(403).json({
          valid: false,
          msg: "Invalid token"
        });
      }
  
    } catch (error) {
      console.error("JWT verification error:", error.message);
      return res.status(403).json({
        valid: false,
        msg: "Invalid token"
      });
    }
  });


module.exports=Userrouter