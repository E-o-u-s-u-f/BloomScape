import express from "express";
import { uploadFiles } from "./multer/multiplelocal.js";
import { Multiplelocal } from "./models/multiplelocal.js";
import getDataUrl from "./bufferGenerator.js";
import cloudinary from "cloudinary";
import { MultipleCloud } from "./models/multipleCloud.js";
import uploadMultipleCloud from "./multer/multipleCloud.js";
const router = express.Router();

router.post("/local", uploadFiles, async (req, res) => {
  try {
    const files = req.files;
    const imagePaths = files.map((image) => image.path);
    await Multiplelocal.create({
      image: imagePaths,
    });
    res.json({
      message: "image uploaded",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/cloud/search", async (req, res) => {
  try {
    const { title } = req.query;

    if (!title) {
      return res
        .status(400)
        .json({ message: "Title query parameter is required." });
    }

    //console.log("Received title:", title);

    // Build the query object
    let query = {};
    if (title) {
      query.title = { $regex: title, $options: "i" };
    }

    //console.log("Query being used:", query);

    // Search for posts based on the constructed query
    const posts = await MultipleCloud.find(query);

    // console.log("Found posts:", posts);  /

    if (posts.length === 0) {
      return res.status(404).json({
        message: "No posts found with the provided title.",
      });
    }

    res.json(posts);
  } catch (error) {
    console.error("Error during search:", error);
    res.status(500).json({ message: error.message });
  }
});

router.put("/cloud/:id", async (req, res) => {
  try {
    const { status, adminApproved } = req.body;
    const postId = req.params.id;

    if (status === "rejected") {
      //  Delete the post if it's rejected
      const deletedPost = await MultipleCloud.findByIdAndDelete(postId);

      if (!deletedPost) {
        return res.status(404).json({ message: "Post not found" });
      }

      return res.json({ message: "Post rejected and deleted" });
    }

    // Otherwise, update the status
    const updatedPost = await MultipleCloud.findByIdAndUpdate(
      postId,
      { status, adminStatus: adminApproved },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({ message: "Post status updated", updatedPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/cloud/:id", async (req, res) => {
  try {
    const postId = req.params.id;

    const deletedPost = await MultipleCloud.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({ message: "Post rejected and deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/cloud", async (req, res) => {
  try {
    const posts = await MultipleCloud.find(); // Fetch all posts
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/cloud", uploadMultipleCloud, async (req, res) => {
  try {
    const files = req.files;
    const { profileName, title, content, likeAmount, adminStatus } = req.body;

    // Validate required fields
    if (!profileName || !title || !content) {
      return res.status(400).json({
        message: "Profile name, title, and content are required.",
      });
    }

    // Map through files to upload to Cloudinary
    const imageUploadPromises = files.map(async (file) => {
      const fileBuffer = getDataUrl(file); // Assuming this returns the correct format

      const result = await cloudinary.v2.uploader.upload(
        fileBuffer.content || file.buffer,
        {
          resource_type: "auto", // Automatically detect file type
        }
      );

      return {
        url: result.secure_url,
        id: result.public_id,
      };
    });

    // Await the results of all uploads
    const uploadedImages = await Promise.all(imageUploadPromises);

    // Create the document with the new fields, including adminStatus
    await MultipleCloud.create({
      image: uploadedImages,
      profileName,
      title,
      content,
      likeAmount: likeAmount || 0,
      adminStatus: adminStatus !== undefined ? adminStatus : false,
    });

    res.json({
      message: "Post uploaded to the Cloud ",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
