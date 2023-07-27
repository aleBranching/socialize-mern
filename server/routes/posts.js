import express from "express";
import {
  getFeedPosts,
  getUserPosts,
  likePost,
  postComment,
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();
// USAGE
// app.use("/", postRoutes);

// READ

router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
router.post("/:userId/:postID", verifyToken, postComment);

// UPDATE

router.patch("/:id/like", verifyToken, likePost);

export default router;
