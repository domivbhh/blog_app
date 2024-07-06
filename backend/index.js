const mongoose=require('mongoose')
const express=require('express')
const dotenv=require('dotenv')
dotenv.config()
const userRouter=require("./routes/users.js")
const postRouter=require("./routes/post.js")
const commentRouter=require("./routes/comment.js")
const cookieParser=require('cookie-parser')
const cors=require('cors')
const multer=require('multer')



//initializing the express server
const app=express()


//middlewares
app.use(express.json())
app.use(cors())
app.use('/auth',userRouter)
app.use('/post',postRouter)
app.use('/comment',commentRouter)
app.use(cookieParser())

//image upload
const storage=multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null,'images')
    },
    filename:(req,file,fn)=>{
        fn(null,req.body.img)
    }
})

const upload=multer({storage:storage})

app.post('/api/upload',upload.single('file'),(req,res)=>{
    res.status(200).json({message:'image uploaded'})
})


//listening to server
app.listen(process.env.PORT,()=>{
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log('server is listening to port 4000 and DB connected successfully')
    }).catch((err)=>{
        console.log('failed to connect DB',err.message)
    })
})