const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Comment = require("../models/comment.js");
const Post = require("../models/post.js");

//related to one post



//createPost controller
async function createCommentController(req, res) {
  try {
    if (req.body) {
      const newComment = await Comment.create(req.body);
      res.status(200).json({ data: newComment });
    }
  } catch (error) {
    res.status(500).json({ data: error.message });
  }
}

//update comment

const updateCommentController = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.body) {
      const updateComment = await Comment.findByIdAndUpdate(
        { _id: id },
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updateComment);
    }
  } catch (error) {
    res.status(500).json({ data: error.message });
  }
};

//deletePost

const deleteCommentController = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const deletedComment = await Comment.findByIdAndDelete({ _id: id });
      res.status(200).json({ data: "comment deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ data: error.message });
  }
};



//get post comments
const getPostCommentController = async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      const post = await Post.find({ postId: id });
      res.status(200).json({ data: post });
    }
  } catch (error) {
    res.status(500).json({ data: error.message });
  }
};



module.exports={getPostCommentController,deleteCommentController,updateCommentController,createCommentController}