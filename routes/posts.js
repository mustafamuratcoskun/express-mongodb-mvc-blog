const express = require("express");
const postController = require("../controllers/postController");

const router = express.Router();

router.get("/", postController.getAllPosts);
router.get("/posts/add", postController.getAddPost);
router.post("/posts/add", postController.postAddPost);
router.get("/posts/edit/:id", postController.getEditPost);
router.put("/posts/edit", postController.postEditPost);
router.delete("/posts/delete/:id", postController.getDeletePost);
module.exports = router;
