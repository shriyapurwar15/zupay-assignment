const mongoose = require("mongoose")

const postModel = mongoose.Schema({
    title : {type : String, required : true},
    text : {type : String, required : true},
    userId : {type : mongoose.Schema.Types.ObjectId , ref : "User"}
},{
    timestamps : true
})

const Post = mongoose.model("Post",postModel)
module.exports = Post;