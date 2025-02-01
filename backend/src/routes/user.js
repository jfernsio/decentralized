import express from "express";
import jwt from "jsonwebtoken";
const userRouter = express.Router();
import { v2 as cloudinary } from 'cloudinary';
import { authMiddleware } from "../../authMiddelweare";
const JWT_PASS = "1234567890";
//signin with a wallet
//signing a message
const User = [
    {
        id:3298,
        wallet: "0x1234567890",
        name: "John Doe",
        email: "john@doe.com",
        password: "1234567890",
  },
  {
    id:7238,
    wallet: "0x1234567891",
    name: "Jane Doe",
    email: "jane@doe.com",
    password: "1234567891",
  },
  {
    id:2383,
    wallet: "0x1234567892",
    name: "John Smith",
    email: "johnsmith@doe.com",
    password: "1234567892",
  },
];
userRouter.post("/sigin", async (req, res) => {
  //todo add a sign verification logic

  const hardCodedWallet = "0x1234567890";
  const existingUser = User.find((user) => user.wallet === hardCodedWallet);
  console.log(existingUser)
  if (!existingUser) {
    const newUser = new User({ wallet: hardCodedWallet });
    await newUser.save();
  }
  const token = jwt.sign({
    id: existingUser.id,
  }, JWT_PASS);
  res.json({ token });
});


userRouter.get('/presigned',authMiddleware,async(req,res) => {
    const userId = req.userId
    const timestamp = Math.round(new Date().getTime() / 1000); // Current timestamp in seconds
const params = {
  timestamp: timestamp,
  folder: `fiver/${userId}/${Math.random()}/image.jpg`, // Optional: Organize files into folders
};

const signature = cloudinary.utils.api_sign_request(params, process.env.CLOUDINARY_API_SECRET);

console.log('Signature:', signature);
console.log('Timestamp:', timestamp);
})


userRouter.get('/upload',async(req,res) => {
 

(async function() {

    // Configuration
    cloudinary.config({ 
        cloud_name: 'dy9bfgpi5', 
        
    });
    
    // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
           './images/one.jpg'
       )
       .catch((error) => {
           console.log(error);
       });
    
    console.log(uploadResult);    
})();
})

export default userRouter;
