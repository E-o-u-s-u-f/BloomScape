import express from "express";
import { uploadFile } from "./multer/singellocal.js";
import { Singellocal } from "./models/singlelocal.js";
import uploadFileCloud from "./multer/singleCloud.js";
import getDataUrl from "./bufferGenerator.js";
import cloudinary from "cloudinary";
import { SingleCloud } from "./models/SingleCloud.js";
const router =express.Router();

router.post("/local",uploadFile,async (req,res) => {
    try {
        const file=req;
        await Singellocal.create({
            image: file?.path,
        });
        res.json({
            message:"Pic uploaded",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});
router.post("/cloud", uploadFileCloud, async (req, res) => {
    try {
        // Get the file object
        const file = req.file;

        // Get the file buffer (without converting it to Data URI)
        const fileBuffer = file.buffer;  // Use the buffer directly

        // Upload the buffer directly to Cloudinary
        const cloud = await cloudinary.v2.uploader.upload_stream({
            resource_type: 'auto',  // Automatically detects the resource type (image/video)
        }, (error, result) => {
            if (error) {
                return res.status(500).json({
                    message: error.message,
                });
            }
            // Save the result from Cloudinary to your database
            SingleCloud.create({
                image: {
                    url: result.secure_url,
                    id: result.public_id,
                },
            });

            res.json({
                message: 'Pic uploaded',
            });
        });

        // Pass the buffer to the upload stream
        cloud.end(fileBuffer);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});
export default router;
