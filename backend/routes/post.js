const express = require("express");
const router = express.Router();
const {createPostController,getPostController,getsinglePostController,updatePostController,getUserPostController,deletePostController}=require('../controllers/post.js');
const verifyToken = require("../middleware/verifyToken.js");


//create post route handler
router.post("/create", verifyToken, createPostController);

//get post route handler
router.get("/", verifyToken, getPostController);

//get user post route handler
router.get("/user/:id", verifyToken, getUserPostController);

//delete post controller
router.delete("/:id", verifyToken, deletePostController);

//update post controller
router.put("/:id", verifyToken, updatePostController);

//route for get singlepost
router.get("/posts/:id", verifyToken, getsinglePostController);



module.exports=router