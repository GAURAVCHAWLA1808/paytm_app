const  mongoose = require( "mongoose")
mongoose.connect('mongodb+srv://chawlagaurav1805:WnsdBtaDkZyHg7y5@cluster0.xavwhhc.mongodb.net/paytm')
const {Schema}=mongoose 
const Userschema = new Schema({
    username :String,
    password : String,
    firstname: String,
    lastname:String
})
const AccountsSchema = new Schema({
    UserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance:{
        type:Number,
        required:true
    }
})
 const User = mongoose.model('User',Userschema)
 const Accounts = mongoose.model('Accounts',AccountsSchema)
module.exports={
    User,
    Accounts
}