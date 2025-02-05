import express from "express";
import jwt from "jsonwebtoken";
const userRouter = express.Router();
import { v2 as cloudinary } from "cloudinary";
import { authMiddleware } from "../../authMiddelweare.js";

import { Task, Option, User, Submission } from "../../models/taskModel.js";

// JWT secret for token signing
const JWT_PASS = "1234567890"; 

// Configure cloudinary for image upload
cloudinary.config({
  cloud_name: "dy9bfgpi5",
});



// Route to get presigned URL for cloudinary upload
userRouter.get("/presigned", async (req, res) => {
  const userId = req.userId;
  // Generate timestamp for signature
  const timestamp = Math.round(new Date().getTime() / 1000);
  const params = {
    timestamp: timestamp,
    folder: `fiver`,
  };

  // Generate cloudinary signature
  const signature = cloudinary.utils.api_sign_request(
    params,
    process.env.CLOUDINARY_API_SECRET
  );

  return res.json({
    signature: signature,
    timestamp: timestamp,
    folder: params.folder,
  });
});

// Test route for direct image upload to cloudinary
userRouter.get("/upload", async (req, res) => {
  (async function () {
    cloudinary.config({
      cloud_name: "dy9bfgpi5",
    });

    // Upload test image
    const uploadResult = await cloudinary.uploader
      .upload("./images/one.jpg")
      .catch((error) => {
        console.log(error);
      });

    console.log(uploadResult);
  })();
});


// Route to create new task with options
userRouter.post("/tasks", authMiddleware, async (req, res) => {
 

  // Usage
  
});

// Usage in route handler
// userRouter.post('/create-task', authMiddleware, async (req, res) => {
//   try {
//     const result = await createTaskWithOptions(req.body, req.userId);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

//delete all users and tasks

userRouter.delete("/delete", async (req, res) => {
  try {
    await User.deleteMany();
    await Task.deleteMany();
    await Option.deleteMany();
    res.json({ msg: "All users and tasks deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete users and tasks" });
  }
});

export default userRouter;
