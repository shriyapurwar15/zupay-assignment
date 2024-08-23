const express = require("express");
const { verifyToken } = require("../middleware/verifyToken");
const { createPost, getAllPost, getPostById, deletePostById, updatePostById } = require("../controller/postController");
const router = express.Router();    

router.get("/",getAllPost);
router.get("/:id",getPostById);
router.post("/",verifyToken,createPost);
router.put("/:id",verifyToken,updatePostById);
router.delete("/:id",verifyToken,deletePostById);

module.exports = router;