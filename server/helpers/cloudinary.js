const cloudinary = require("cloudinary").v2;
const multer = require("multer");
require("dotenv").config();

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer Memory Storage with File Filters and Size Limits
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB max file size limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files (JPEG, PNG, WEBP) are allowed!"), false);
    }
  },
});

/**
 * Uploads a file (Base64 string or file path) to Cloudinary
 * @param {string} file - Base64 data URI or file path
 * @param {string} folder - Target Cloudinary folder (default: 'BatikStore/products')
 */
async function imageUploadUtil(file, folder = "BatikStore/products") {
  try {
    const result = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
      folder: folder,
    });
    return result;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw error;
  }
}

/**
 * Uploads a Buffer directly to Cloudinary using upload_stream (High performance, RAM-friendly)
 * @param {Buffer} buffer - File buffer from req.file.buffer
 * @param {string} folder - Target Cloudinary folder
 */
function uploadBufferToCloudinary(buffer, folder = "BatikStore/products") {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: "auto",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(buffer);
  });
}

module.exports = {
  cloudinary,
  upload,
  imageUploadUtil,
  uploadBufferToCloudinary,
};
