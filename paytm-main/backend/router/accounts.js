const express = require ('express')
const  mongoose = require( "mongoose")
const { Accounts,User } = require('../db/mongoose-schema')
const user_middleware = require("../auth_middleware/user_middleware")
const Accountsrouter= express.Router()
Accountsrouter.get('/balance',user_middleware,async (req,res)=>{
    const userid = req.userId
    const account = await Accounts.findOne({
        UserId:userid
    })
    res.json({
        balance:account.balance
    })
})
Accountsrouter.post('/transfer',user_middleware,async (req,res)=>{
    const session = await mongoose.startSession()
    session.startTransaction()
   try{ const tousername = req.body.tousername
    const amount = req.body.amount
    
    const userid = req.userId
    const account = await Accounts.findOne({UserId:userid}).session(session)
    if(!account){
        await session.abortTransaction();
        return res.status(404).json({ msg: "user account not found" });
    }
    console.log(account)
    const toaccount = await User.findOne({username:tousername }).session(session)
    if(!toaccount){
        await session.abortTransaction();
        return res.status(404).json({ msg: "recepient account not found" });
    }


    const touserId = toaccount._id
    if(!touserId){
        await session.abortTransaction();
        return res.status(404).json({ msg: "recepient account not found" });
    }
    const toaccountId = await Accounts.findOne({
        UserId:touserId
    })
    if(!toaccountId){
        await session.abortTransaction();
       return res.json({
            msg :"recepient account not found"
        })
    }
    if (account.balance<amount){
        await session.abortTransaction();
        res.json({
            msg:"insufficient balance "
        })
        }

     await Accounts.findByIdAndUpdate({_id:account._id},{
        $inc  :{balance:-amount}
     }).session(session)  
     await Accounts.findByIdAndUpdate({_id:toaccountId._id},{
       $inc:{balance:amount}
     }).session(session)

     await session.commitTransaction();
     session.endSession();


   res.json({
    msg:"transfered successfully"
   })}
   catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Error during transfer:', error);
    res.status(500).json({ msg: "Internal server error" });
}
})

module.exports=Accountsrouter
