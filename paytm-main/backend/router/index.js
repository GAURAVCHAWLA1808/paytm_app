const express = require ('express')
const {Router} = require ('express')
const router = Router()
const Userrouter = require('./user')
const Accountsrouter=require('./accounts')
router.use("/user",Userrouter)
router.use("/account",Accountsrouter)




router.get('/',(req,res)=>{
    res.json({
        msg:"hii there"
    })
})
module.exports=router


