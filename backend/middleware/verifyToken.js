const jwt=require('jsonwebtoken')

const verifyToken=async(req,res,next)=>{
    const token = req.headers.token;
    if(!token){
        return res.status(401).json({data:'user is not authenticated please login'})

    }
    jwt.verify(token,process.env.JWT_SECRET,async(err,data)=>{
        if(err){
        return res
          .status(403)
          .json({ data: "Token is not valid" });

        }
        req.userId=data.id
        next()
    })
}

module.exports=verifyToken