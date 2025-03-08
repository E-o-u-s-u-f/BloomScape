import express from "express";
import mongoose from "mongoose"; // ✅ Import mongoose
import { MultipleCloud } from "../models/multipleCloud.js";

const router = express.Router();

// ✅ Add a comment to a post
router.post("/:postId/comments", async (req, res) => {
    const { postId } = req.params;
    const { text, userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({ message: "Invalid post ID" });
    }
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }

    try {
        const post = await MultipleCloud.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const newComment = {
            userId: new mongoose.Types.ObjectId(userId), // ✅ Ensure it's an ObjectId
            text,
            timestamp: new Date(),
        };

        post.comments.push(newComment);
        await post.save();

        res.status(201).json({ message: "Comment added", comment: newComment });
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ Get all comments for a post
router.get("/:postId/comments", async (req, res) => {
    const { postId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({ message: "Invalid post ID" });
    }

    try {
        const post = await MultipleCloud.findById(postId).populate("comments.userId", "fullName"); 
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json({ comments: post.comments });
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ Delete a comment
router.delete("/:postId/comments/:commentId", async (req, res) => {
    const { postId, commentId } = req.params;
    const { userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(postId) || !mongoose.Types.ObjectId.isValid(commentId)) {
        return res.status(400).json({ message: "Invalid post or comment ID" });
    }
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }

    try {
        const post = await MultipleCloud.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const commentIndex = post.comments.findIndex(comment => comment._id.toString() === commentId);
        if (commentIndex === -1) {
            return res.status(404).json({ message: "Comment not found" });
        }

        if (post.comments[commentIndex].userId.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Unauthorized action" });
        }

        post.comments.splice(commentIndex, 1);
        await post.save();

        res.status(200).json({ message: "Comment deleted" });
    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
