const Post = require("../models/postModel");

const createPost = async (req, res) => {
  try {
    const user = req.user;
    const { title, text } = req.body;
    if (!title) {
      return res.status(400).send("title is Required");
    }
    if (!text) {
      return res.status(400).send("Blog Text is required");
    }

    const post = await Post.create({
      title,
      text,
      userId: user._id,
    });

    if (post) {
      return res.status(200).json({ post, msg: "Post created successfully" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong! [POST CREATION]");
  }
};

const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find({});
    return res.status(200).send(posts);
  } catch (error) {
    return res.status(500).send("Something went wrong! [GET ALL POST]");
  }
};

const getPostById = async(req,res) =>{
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).send("Post Id is required");
        }
        const post = await Post.findById(id);
        if(post){
            return res.status(201).send(post);
        }
        else {
            return res.status(404).send("BLOG POST NOT FIND");
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send("Something went wrong [GET POST BY ID]");
    }
}

const deletePostById = async(req,res) =>{
    try {
        const user = req.user;
        const {id} = req.params;
        if(!id){
            return res.status(400).send("Post Id is required");
        }
        const post = await Post.findById(id);
        if(!post){
            return res.status(404).send("Unable to find the blog post");
        }
        if(user._id.toString() !== post.userId.toString()){
            return res.status(401).send("You are not authorized to delete this post");
        }
        const result = await Post.findByIdAndDelete(id);
        if(result){
            return res.status(200).send("Blog post deleted Successfully");
        }
        else {
            return res.status(400).send("Unable to delete the post")
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send("Something went wrong [Delete By ID]");
    }
}

const updatePostById = async(req,res) =>{
    try {
        const user = req.user;
        const {id} = req.params;
        if(!id){
            return res.status(400).send("Post Id is required");
        }
        const {title, text} = req.body;
        const post = await Post.findById(id);
        if(!post){
            return res.status(404).send("Unable to find the blog post");
        } 

        if(user._id.toString() !== post.userId.toString()){
            console.log("hello")
            return res.status(401).send("You are not authorized to update this post");
        }
        const updatedPost = await Post.findByIdAndUpdate(id,{
            title: title?title:post.title,
            text: text?text:post.text,
            userId : post.userId,
        })
        if(updatedPost){
            return res.status(200).send(updatedPost);
        }
        else {
            return res.status(400).send("unable to update the blog post");
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send("Something went wrong [UPDATE by Id]");
    }
}

module.exports = { createPost, getAllPost ,getPostById ,deletePostById , updatePostById};
