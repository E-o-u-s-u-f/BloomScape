import express from "express";
import { uploadFiles } from "./multer/multiplelocal.js";
import { Multiplelocal } from "./models/multiplelocal.js";
import getDataUrl from "./bufferGenerator.js";
import cloudinary from "cloudinary";
import { MultipleCloud } from "./models/multipleCloud.js";
import uploadMultipleCloud from "./multer/multipleCloud.js";
const router =express.Router();

router.post("/local",uploadFiles,async (req,res) => {
     try {
        const files=req.files;
        const imagePaths=files.map((image)=>image.path);
        await Multiplelocal.create({
            image: imagePaths,
        });
        res.json({
            message:"image uploaded",
        });
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
});

router.get("/cloud", async (req, res) => {
    try {
        const posts = await MultipleCloud.find();  // Fetch all posts
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/cloud", uploadMultipleCloud, async (req, res) => {
    try {
        const files = req.files;
        const { profileName, title, content, likeAmount } = req.body;  // Destructure the new fields from request body

        // Validate required fields (you can customize this validation)
        if (!profileName || !title || !content) {
            return res.status(400).json({ message: "Profile name, title, and content are required." });
        }

        // Map through files to upload to Cloudinary
        const imageUploadPromises = files.map(async (file) => {
            const fileBuffer = getDataUrl(file);  // Assuming this returns the correct format

            const result = await cloudinary.v2.uploader.upload(fileBuffer.content || file.buffer, {
                resource_type: 'auto', // Automatically detect file type
            });

            return {
                url: result.secure_url,
                id: result.public_id,
            };
        });

        // Await the results of all uploads
        const uploadedImages = await Promise.all(imageUploadPromises);

        // Create the document with the new fields
        await MultipleCloud.create({
            image: uploadedImages,
            profileName,  // Add profileName from request body
            title,        // Add title from request body
            content,      // Add content from request body
            likeAmount: likeAmount || 0,  // If likeAmount is not provided, default to 0
        });

        res.json({
            message: "Images uploaded to Cloud with additional data",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});


export default router;