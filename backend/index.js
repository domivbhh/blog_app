const mongoose=require('mongoose')
const express=require('express')
const dotenv=require('dotenv')
dotenv.config()
const userRouter=require("./routes/users.js")



//initializing the express server
const app=express()


//middlewares
app.use(express.json())
app.use('/auth',userRouter)


//listening to server
app.listen(process.env.PORT,()=>{
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log('server is listening to port 5000 and DB connected successfully')
    }).catch((err)=>{
        console.log('failed to connect DB',err.message)
    })
})