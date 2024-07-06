const express=require('express')
const { signInController, signUpController, logOutController ,getUserController,updateUserController,deleteUserController} = require('../controllers/auth')
const verifyToken = require('../middleware/verifyToken')
const router=express.Router()

//route for signin
router.post('/signin',signInController) 

//route for signup
router.post('/signup',signUpController)

//route for logout
router.get("/logout", verifyToken, logOutController);

//route for update user profile
router.put('/:id',verifyToken,updateUserController)

//route for delete user
router.delete("/:id", verifyToken, deleteUserController);

//route for get specific user
router.get("/:id", verifyToken, getUserController);

module.exports=router