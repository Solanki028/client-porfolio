const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

// Configure Cloudinary (already configured via env vars, but ensure config is loaded)
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload Controller
exports.uploadImage = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    // Create a stream upload to Cloudinary
    const streamUpload = (req) => {
        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: 'portfolio', // Optional folder
                },
                (error, result) => {
                    if (result) {
                        resolve(result);
                    } else {
                        reject(error);
                    }
                }
            );
            streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
    };

    const upload = async (req) => {
        try {
            const result = await streamUpload(req);
            res.status(200).json({
                message: 'Image uploaded successfully',
                url: result.secure_url,
                public_id: result.public_id
            });
        } catch (error) {
            console.error('Cloudinary Upload Error Details:', error);
            console.error('Cloudinary Config:', {
                cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                api_key: process.env.CLOUDINARY_API_KEY ? 'Set' : 'Not Set',
                api_secret: process.env.CLOUDINARY_API_SECRET ? 'Set' : 'Not Set'
            });
            res.status(500).json({ message: 'Error uploading image', error: error.message });
        }
    };

    upload(req);
};
