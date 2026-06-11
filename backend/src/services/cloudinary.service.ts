import { v2 as cloudinary } from 'cloudinary';


// 1. Extract the variables
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

// 2. Validate them
if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Missing Cloudinary environment variables. Check your .env file!");
}
// Configure using the environment variables we set up
cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
});

export const uploadSystemLogo = (fileStream: NodeJS.ReadableStream): Promise<{ url: string; publicId: string }> => {
    return new Promise((resolve, reject) => {
        console.log("you arrive /home/sefiw/desktop/projects/TRNpro/backend/src/services/cloudinary.service.ts");

        const stream = cloudinary.uploader.upload_stream(
            {
                folder: 'organizations/logos', // Keeps your dashboard clean
                allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'avif'],

                // --- LOGO TRANSFORMATIONS ---
                transformation: [
                    {
                        width: 400,
                        height: 400,
                        crop: 'fill',       // Crops out excess edges to fill the 400x400 box perfectly
                        gravity: 'center'   // Focuses the crop on the center of the logo
                    },
                    {
                        quality: 'auto',    // Compresses file size automatically
                        fetch_format: 'auto'// Serves WebP/AVIF depending on the user's browser
                    }
                ]
            },
            (error, result) => {
                if (error) return reject(error);

                if (result) return resolve({
                    url: result.secure_url,
                    publicId: result.public_id
                });
                reject(new Error("Upload failed without explicit error"));
            }
        );

        fileStream.pipe(stream);
    });
};