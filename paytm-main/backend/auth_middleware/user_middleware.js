const jwt = require ('jsonwebtoken')
const JWT_SCERET= require("../config")
function Usermiddleware(req,res,next){
const token= req.headers.authorization
if (!token || !token.startsWith('Bearer ')) {
    return res.status(403).json({
        msg:"send the right token"
    });
}
const word = token.split(" ")
const jwtToken = word[1]
try{const decodedvalue = jwt.verify(jwtToken,JWT_SCERET)
    if (decodedvalue.userId){
        req.userId=decodedvalue.userId
       return next()
    }
    res.status(403).json({
       msg:"user is not signed In" 
    })
}catch(err){
    res.status(403).json({
        msg:"invalid authorization header"
    })
}
}
module.exports=Usermiddleware