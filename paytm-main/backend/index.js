const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
const router = require ("./router/index")
const port = 3000
app.use(express.json())
app.use('/api/v1',router)

app.get("/",(req,res)=>{
res.json({
    msg:"hii there"
})
})

app.listen(port)