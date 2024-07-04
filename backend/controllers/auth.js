const User=require('../models/user.js')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


//signin controller
const signInController=async(req,res)=>{
    try {
      const {email, password } = req.body;
      if (email.trim !== "" ) {
        let user = await User.find({ email })
        if(user){
          if(password.trim !== ""){
            const verifyPassword=await bcrypt.compare(password,user[0].password)
            console.log(verifyPassword)
            if(verifyPassword){
              const respdata = await User.find({ email }).select("-password");
              
              //creating jwt token
              const token=jwt.sign({id:user[0]._id},process.env.JWT_SECRET,{expiresIn:"3d"})
              res.cookie("jwt", token).status(200).json({ data: respdata });
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



const logOutController=async(req,res)=>{
  try {
      res.clearCookie("jwt",{sameSite:'none',secure:true}).status(200).json({data:"user logout successfully"})
  } 
  catch (error) {
    res.status(500).json({data:'logout failed'})
  }
}



module.exports={signInController,signUpController,logOutController}