import { Task, Option, Worker, Submission, Payout } from "../models/taskModel.js";
import mongoose, { startSession } from "mongoose";
import { createTasks, createSubmissionInput } from "../utils/zod.js";
import { getNextTask } from "../utils/nextTask.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const TOTAL_SUBMISSIONS = 100;

const signinController = async (req, res) => {
  // Route for user sign-in with wallet
  // Mock wallet address (TODO: implement actual wallet verification)
  const walletAddress = "0x1234567899990";

  // Check if user exists, if not create new user
  const existingUser = await Worker.findOne({
    address: walletAddress,
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
    process.env.JWT_WORKER_SCRERT
  );
  res.json({ token });
};

const nextTaskController = async (req, res) => {
  const workerId = req.userId;
  console.log(req.userId);

  try {
    // Find first task that's not done and has no submissions from this worker
    const task = await getNextTask(workerId);

    if (!task) {
      return res
        .status(411)
        .json({ message: "No more tasks left for you to review" });
    }

    res.json({ task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const submitTaskController = async (req, res) => {
  const workerId = req.userId;
  const body = req.body;
  const { taskId, selection } = req.body;
  if (!taskId || !selection) {
    return res
      .status(400)
      .json({ message: "taskId and selection are required" });
  }
  const parsedBody = createSubmissionInput.safeParse(body);
  console.log("parsedBody", parsedBody);
  if (parsedBody.success) {
    const task = await getNextTask(workerId);
    console.log("task", task._id);
    if (!task || !task._id.equals(parsedBody.data.taskId)) {
      return res.status(411).json({ message: "Incorrect task id" });
    }
    const amount = task.amount / TOTAL_SUBMISSIONS;

    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      const submission = await Submission.create(
        [
          {
            task_id: body.taskId,
            option_id: body.selection,
            worker_id: req.userId,
            amount: amount,
          },
        ],
        { session }
      );
      await Worker.findOneAndUpdate(
        { _id: workerId },
        { $inc: { pending_amount: amount } },
        { session }
      );
      await Task.findOneAndUpdate(
        { _id: body.taskId },
        { $push: { submissions: { worker_id: req.userId } } }, // Push worker_id into submissions
        { session }
      );
      const updateOption = await Option.findOneAndUpdate(
        { _id: selection, task_id: taskId },
        { $inc: { submissions: 1 } },
        { session, new: true }
      );
      if (!updateOption) {
        await session.abortTransaction();
        return res
          .status(400)
          .json({ message: "Invalid option for this task" });
      }
      await session.commitTransaction();
      // return res.status(201).json({ success: true, submission });
      return submission;
    } catch (error) {
      await session.abortTransaction();
      return res.status(500).json({ error: error.message });
    } finally {
      session.endSession();

      const nextTask = await getNextTask(workerId);
      if (nextTask) {
        // Send the next task to the worker
        res.status(200).json({ "next task is ": nextTask });
        console.log(`next task is : ${nextTask}`);
      }
    }
  } else {
    res.status(411).json({
      message: "Incorrect inputs",
    });
  }
};

const getBalance = async (req, res) => {
  const userId = req.userId;

  try {
    const balance = await Worker.findOne({ _id: userId });
    return res
      .status(200)
      .json({
       
          "pending_amount":balance.pending_amount,
          "locked_amount":balance.locked_amount,
      
      });
  } catch (e) {
    console.log(e);
  }
};

const payoutController = async(req, res) => {
  const workerId = req.userId;
  
  //check if there's already a processing payout for this worker
  const existingPayout = await Payout.findOne({
    user_id: workerId,
    status: "Processing"
  });
  
  if (existingPayout) {
    return res.status(409).json({
      message: "A payout is already being processed for this account",
      transactionId: existingPayout.signature
    });
  }
  
  const worker = await Worker.findOne({_id: workerId});
  if (!worker) return res.status(404).json({msg: "worker not found"});
  
  // Check if there's any pending amount to pay out
  if (worker.pending_amount <= 0) {
    return res.status(400).json({
      message: "No pending amount available for payout"
    });
  }
  
  const address = worker.address;
  const tsxId = "0cwb392323ne"; 
  const amountToPayOut = worker.pending_amount;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    
    //  filter  to ensure amount hasn't changed
    const updatedWorker = await Worker.findOneAndUpdate(
      { _id: workerId, pending_amount: { $gt: 0 } },
      {
        $inc: {
          pending_amount: -amountToPayOut,
          locked_amount: amountToPayOut
        }
      },
      { 
        session,
        new: true,
        runValidators: true
      }
    );
    
    
    if (!updatedWorker) {
      throw new Error("Worker data was modified by another request");
    }
    
    await Payout.create(
      [
        {
          user_id: workerId,
          amount: amountToPayOut,
          signature: tsxId,
          status: "Processing",
          created_at: new Date()
        }
      ], 
      { session }
    );
    
    await session.commitTransaction();
    return res.status(201).json({
      message: "Payout Processing",
      transactionId: tsxId,
      pending_amount: updatedWorker.pending_amount, 
      locked_amount: updatedWorker.locked_amount
    });
  } catch(e) {
    console.log(e);
    await session.abortTransaction();
    
    return res.status(500).json({
      message: "Payout processing failed",
      error: e.message
    });
  } finally {
    session.endSession();
  }
};

export {
  signinController,
  nextTaskController,
  submitTaskController,
  getBalance,
  payoutController
};
