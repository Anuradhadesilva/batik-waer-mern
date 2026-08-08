const express = require("express");
const router = express.Router();
const { upload, uploadBufferToCloudinary } = require("../../helpers/cloudinary");

// Single and Multi-Image Upload Route for Cloudinary
router.post("/images", upload.array("productImages", 5), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "No files were uploaded." });
    }

    // Upload each buffer to Cloudinary in parallel
    const uploadPromises = req.files.map((file) =>
      uploadBufferToCloudinary(file.buffer, "BatikStore/products")
    );

    const results = await Promise.all(uploadPromises);
    const urls = results.map((result) => result.secure_url);

    res.status(200).json({
      success: true,
      urls: urls,
      result: results,
    });
  } catch (error) {
    console.error("Upload Route Error:", error);
    res.status(500).json({ success: false, message: "Error uploading files." });
  }
});

module.exports = router;
