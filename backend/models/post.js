const mongoose = require("mongoose");

//creating post schema
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
    },
    desc: {
      type: String,
      required: true,
      uniques: true,
    },
    photo: {
      type: String,
      required: false,
      default:
        "https://contenthub-static.grammarly.com/blog/wp-content/uploads/2019/08/August-blog-header-Amplification-437x233.png",
    },
    username: {
      type: String,
      required: false,
    },
    userId: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: false,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("post", postSchema);
module.exports = Post;
