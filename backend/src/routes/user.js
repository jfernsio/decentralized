import express from "express";
import jwt from "jsonwebtoken";
import { createTasks } from "../../utils/zod.js";
const userRouter = express.Router();
import { v2 as cloudinary } from "cloudinary";
import { authMiddleware } from "../../authMiddelweare.js";
import mongoose, { startSession } from "mongoose";
import { Task, Option, User, Submission } from "../../models/taskModel.js";

// JWT secret for token signing
const JWT_PASS = "1234567890";

// Configure cloudinary for image upload
cloudinary.config({
  cloud_name: "dy9bfgpi5",
});

// Route for user sign-in with wallet
userRouter.post("/sigin", async (req, res) => {
  // Mock wallet address (TODO: implement actual wallet verification)
  const walletAddress = "0x1234567890";

  // Check if user exists, if not create new user
  const existingUser = await User.findOne({ address: walletAddress });
  if (!existingUser) {
    const newUser = new User({ address: walletAddress });
    await newUser.save();
  }

  // Generate JWT token for authentication
  const token = jwt.sign(
    {
      id: existingUser,
    },
    JWT_PASS
  );
  res.json({ token });
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

// Route to get task details and submission statistics
userRouter.get("/tasks", authMiddleware, async (req, res) => {
  const taskId = req.query.taskId;
  const userId = req.userId;

  // Fetch the task
  const task = await Task.findOne({
    _id: taskId,
    user_id: userId,
  });

  if (!task) {
    return res.status(411).json({
      message: "You don't have access to this task",
    });
  }

  // Fetch options for the task
  const options = await Option.find({ task_id: taskId });

  // Fetch submission counts for each option
  const submissions = await Submission.aggregate([
    {
      $match: { task_id: task._id },
    },
    {
      $group: {
        _id: "$option_id",
        count: { $sum: 1 },
      },
    },
  ]);

  // Combine the data
  const result = {
    task,
    options: options.map((option) => ({
      ...option.toObject(),
      submissionCount:
        submissions.find((sub) => sub._id.equals(option._id))?.count || 0,
    })),
  };

  res.json(result);
});

// Route to create new task with options
userRouter.post("/tasks", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const body = req.body;

  // Validate request body using Zod schema
  const parseData = createTasks.safeParse(body);
  if (!parseData.success)
    return res.status(400).json({ error: parseData.error });
  if (!parseData.data)
    return res.status(411).json({ msg: "you have entered wrong inputs" });

  // Helper function to create task and options in a transaction
  const createTaskWithOptions = async (userId, title, signature, options) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Create task first
      const task = await Task.create(
        [
          {
            title: title,
            user_id: userId,
            signature: signature,
            amount: 0.1,
            options: [], // Initialize empty options array
          },
        ],
        { session }
      );

      // Bulk create options
      const optionsToCreate = options.map((opt) => ({
        image_url: opt.imageUrl,
        task_id: task[0]._id,
        submissions: 0, // Initialize submission count
      }));

      const createdOptions = await Option.insertMany(optionsToCreate, {
        session,
      });

      // Update task with option references
      await Task.findByIdAndUpdate(
        task[0]._id,
        { options: createdOptions.map((opt) => opt._id) },
        { session }
      );

      await session.commitTransaction();
      return task[0];
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  };
 

  // Usage
  (async () => {
    try {
      const task = await createTaskWithOptions(
        userId,
        parseData.data.title,
        parseData.data.signature,
        parseData.data.options
      );

      console.log("Task created:", task);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  })();
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
