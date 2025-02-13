import { Task, Option, Worker, Submission } from '../models/taskModel.js';
import mongoose, { startSession } from "mongoose";
import { createTasks } from "../utils/zod.js";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();



const signinController = async(req,res) => {
    // Route for user sign-in with wallet
    // Mock wallet address (TODO: implement actual wallet verification)
    const walletAddress = "0x1234567899990";
  
    // Check if user exists, if not create new user
    const existingUser = await Worker.findOne({
         address: walletAddress,
         pending_amount: 0,
         locked_amount: 0
        });
    if (!existingUser) {
      const newUser = new Worker({ address: walletAddress });
      await newUser.save();
    }
  
    // Generate JWT token for authentication
    const token = jwt.sign(
      {
        id: existingUser,
      },
      process.env.JWT_WORKER_SCRERT,
    );
    res.json({ token });
};

const nextTaskController = async(req,res)=>{
    const workerId = req.userId;

try {
    // Find first task that's not done and has no submissions from this worker
    // yet to do 
    const task = await Task.findOne({
        done: true,
        submissions: {
            $not: {
                $elemMatch: {
                    workerId: workerId
                }
            }
        }
    }).populate('options');

    if (!task) {
        return res.status(404).json({ message: "No available tasks" });
    }

    res.json({ task });
} catch (error) {
    res.status(500).json({ error: error.message });
}
}

export {signinController, nextTaskController}