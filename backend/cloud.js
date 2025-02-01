import { v2 as cloudinary } from "cloudinary";
import dotenv from 'dotenv';
dotenv.config();
cloudinary.config({
  cloud_name: "dy9bfgpi5",
  
});

// const url = cloudinary.url('minion_oa83g8')


// console.log(url)

// (async function () {
//     const uploadResult = await cloudinary.uploader
// .upload(
//     './images/one.jpg'
// )
// .catch((error) => {
//     console.log(error);
// });

// console.log(uploadResult);
// Generate timestamp and signature
const timestamp = Math.round(new Date().getTime() / 1000); // Current timestamp in seconds
const params = {
  timestamp: timestamp,
  folder: 'test', // Optional: Organize files into folders
};

const signature = cloudinary.utils.api_sign_request(params, process.env.CLOUDINARY_API_SECRET);

console.log('Signature:', signature);
console.log('Timestamp:', timestamp);


    
