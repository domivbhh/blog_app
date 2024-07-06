const express = require("express");
const router = express.Router();
const {
  getPostCommentController,createCommentController,updateCommentController,deleteCommentController
} = require("../controllers/comment.js");
const verifyToken = require("../middleware/verifyToken.js");

//create post route handler
router.post("/create", verifyToken, createCommentController);


//get user post route handler
router.get("/post/:id", verifyToken, getPostCommentController);

//delete post controller
router.delete("/:id", verifyToken, deleteCommentController);

//update post controller
router.put("/:id", verifyToken, updateCommentController);

module.exports = router;
