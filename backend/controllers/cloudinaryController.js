import { v2 as cloudinary } from "cloudinary";
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
    cloud_name: "dy9bfgpi5", // Replace with your cloud name
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const generateSignature = async (req, res) => {
    console.log('Reached cloudinary controller');
    try {
        const userId = req.userId._id;

        if (!userId) {
            return res.status(400).json({ 
                success: false, 
                message: 'User ID is missing' 
            });
        }

        const timestamp = Math.floor(Date.now() / 1000);
        const expiration = timestamp + 120; // 2 minutes from now
        const folder = `fiver/${userId}/images`;
        const params = {
            timestamp,
            folder,
        };

        const signature = cloudinary.utils.api_sign_request(
            params, 
            process.env.CLOUDINARY_API_SECRET
        );
        console.log("String to sign:", `folder=${folder}&timestamp=${timestamp}`);
        console.log("Generated Signature:", signature)
        console.log('Generated signature:', {
            signature,
            timestamp,
            expiration,
            folder: params.folder,
            api_key: process.env.CLOUDINARY_API_KEY
        });

        return res.status(200).json({
            success: true,
            data: {
                signature,
                timestamp,
                expiration,
                folder: params.folder,
                api_key: process.env.CLOUDINARY_API_KEY
            }
        });

    } catch (error) {
        console.error('Error generating signature:', error);
        return res.status(500).json({
            success: false,
            message: 'Error generating signature',
            error: error.message
        });
    }
};