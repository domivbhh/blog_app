const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Comment = require("../models/comment.js");
const Post = require("../models/post.js");

//createPost controller
async function createPostController(req,res){
    try {
        if(req.body){
            const newPost=await Post.create(req.body)
            res.status(200).json({data:newPost})
        }
    } 
    catch (error) {
        res.status(500).json({ data: error.message });
        
    }
}

//update post

const updatePostController=async(req,res)=>{
    try {
        const{id}=req.params
        if(req.body){
            const updatePost=await Post.findByIdAndUpdate({_id:id},{$set:req.body},{new:true})
            res.status(200).json(updatePost)    
        }
    } 
    catch (error) {
        res.status(500).json({ data: error.message });
    }
}

//deletePost

const deletePostController = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const deletedPost = await Post.findByIdAndDelete(
        { _id: id });
      res.status(200).json({data:'post deleted successfully'});
    }
  } catch (error) {
    res.status(500).json({ data: error.message });
  }
};

//get post controller


const getPostController = async (req, res) => {
    try {
        const {search}=req.query
        if(search){
        const searchFilter={title:{$regex:search,$options:'i'}}
        const getPost = await Post.find(searchFilter);
        res.status(200).json(getPost);
        }
        else{
        const getPost = await Post.find();
        res.status(200).json(getPost);
        }
    } 
catch (error) {
    res.status(500).json({ data: error.message });
  }
};


//get user post
const getUserPostController = async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      const post = await Post.find({ userId: id })
      res.status(200).json({ data: post });
    }
  } catch (error) {
    res.status(500).json({ data: error.message });
  }
};


const getsinglePostController = async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      const post = await Post.find({_id:id });
      res.status(200).json({ data: post });
    }
  } catch (error) {
    res.status(500).json({ data: error.message });
  }
};






module.exports={createPostController,getsinglePostController,getPostController,deletePostController,getUserPostController,updatePostController}