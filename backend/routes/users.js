const express=require('express')
const { signInController, signUpController } = require('../controllers/auth')
const router=express.Router()

//route for signin
router.post('/signin',signInController) 

//route for signup
router.post('/signup',signUpController)


module.exports=router