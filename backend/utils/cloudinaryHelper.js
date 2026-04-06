const cloudinary = require('../config/cloudinary');
const fs = require('fs');

const uploadToCloudinary = async (filePath, folder) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: `dress-admin/${folder}`,
        });
        // Delete local temp file
        fs.unlinkSync(filePath);
        return result.secure_url;
    } catch (error) {
        console.error(error);
        throw new Error('Cloudinary upload failed');
    }
};

module.exports = { uploadToCloudinary };
