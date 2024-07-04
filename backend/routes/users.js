const express=require('express')
const { signInController, signUpController, logOutController } = require('../controllers/auth')
const router=express.Router()

//route for signin
router.post('/signin',signInController) 

//route for signup
router.post('/signup',signUpController)

//route for logout
router.get('/logout',logOutController)

module.exports=router