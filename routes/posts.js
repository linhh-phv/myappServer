const express = require("express");
const router = express.Router();
const Post = require("../models/post");

// get all posts
router.get("/", async (req, res) => {
  try {
    const getPosts = await Post.find();
    res.json(getPosts);
  } catch (error) {
    res.json({ message: err });
  }
});

// get posts with postsId
router.get("/:postsId", async (req, res) => {
  try {
    const findPosts = await Post.findById(req.params.postsId);
    res.json(findPosts);
  } catch (error) {
    res.json({ message: err });
  }
});

// add posts
// router.post("/", async (req, res) => {
//   const { title, description, date } = req.body;
//   console.log(title, description, date);
//   const post = new Post({ title, description, date });
//   try {
//     const savePosts = await post.save();
//     res.json(savePosts);
//   } catch (error) {
//     res.json({ message: err });
//   }
// });

//delete posts with postsId
router.delete("/:postsId", async (req, res) => {
  try {
    const removePosts = await Post.remove({ _id: req.params.postsId });
    res.json(removePosts);
  } catch (error) {
    res.json({ message: err });
  }
});

//update posts with postsId
router.patch("/:postsId", async (req, res) => {
  const { title, description, date } = req.body;
  try {
    const updatePosts = await Post.updateOne(
      { _id: req.params.postsId },
      {
        $set: { title },
      }
    );
    res.json(updatePosts);
  } catch (error) {
    res.json({ message: err });
  }
});

module.exports = router;
