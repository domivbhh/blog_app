const User=require('../models/user.js')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const Comment=require('../models/comment.js')
const Post=require('../models/post.js')

//signin controller
const signInController=async(req,res)=>{
    try {
      const {email, password } = req.body;
      if (email.trim !== "" ) {
        let user = await User.find({ email })
        if(user){
          if(password.trim !== ""){
            const verifyPassword=await bcrypt.compare(password,user[0].password)
            if(verifyPassword){
              const respdata = await User.find({ email }).select("-password");
              
              //creating jwt token
              const token=jwt.sign({id:user[0]._id},process.env.JWT_SECRET,{expiresIn:"3d"})
              
              res
              .status(200)
              .json({ data: respdata ,token
              });
            }
            else{
              res.status(401).json({data:'wrong password'})
            }
          }}
        }
        
    }
    catch (err) {
     res.status(500).json(err.message)   
    }
}


//signup controller
const signUpController = async (req,res) => {
  try {
    const { username, email, password } = req.body;
    if(username.trim()!=='' && email.trim!=="" && password.trim!=="")
      {
      const hashedPassword=await bcrypt.hash(password,10)
      const newUser=await User.create({ username, email,password:hashedPassword });
      const respdata=await User.find({email}).select('-password')
      res.status(200).json({ data: respdata });
      }
    
  } catch (err) 
  {
     res.status(500).json(err.message);   
  }
};


//logout user
const logOutController=async(req,res)=>{
  try {
      res.clearCookie("jwt",{sameSite:'none',secure:true}).status(200).json({data:"user logout successfully"})
  } 
  catch (error) {
    res.status(500).json({data:'logout failed'})
  }
}


//update user password
const updateUserController=async(req,res)=>{
  try {
      if(req.body.password){
        const password=req.body.password
        req.body.password=await bcrypt.hash(password,10)
      }  
      const updatedUser=await User.findByIdAndUpdate({_id:req.params.id},{$set:req.body},{new:true})
        res.status(200).json({data:updatedUser});

  } 
  catch (error) {
    res.status(500).json({data:error.message})
  }
}


//delete user
const deleteUserController = async (req, res) => {
  try {
    const{id}=req.params
    if(id){
      const user=await User.findByIdAndDelete({_id:id})
      const comment = await Comment.findByIdAndDelete({ _id: id });
      const post = await Post.findByIdAndDelete({ _id: id });
      if(user){
      res
        .clearCookie("jwt", { sameSite: "none", secure: true })
        .status(200)
        .json({ data: "user deleted successfully" });
      }
    }    
    }
   catch (error) {
    res.status(500).json({ data: error.message })
   }
};


//get specific user

const getUserController=async(req,res)=>{
  const {id}=req.params
  try {
    if(id){
      const user=  await User.find({_id:id}).select('-password')
      res.status(200).json({data:user})
    }
  } 
  catch (error) {
    res.status(500).json({ data: error.message });
    
  }
}


//exporting the controllers
module.exports={signInController,signUpController,logOutController,getUserController,updateUserController,updateUserController,deleteUserController}