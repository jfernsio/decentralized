import mongoose from "mongoose";
import { Task } from "../models/taskModel.js";

export const getNextTask = async (workerId) => {
    if (!workerId) {
        console.error("Error: workerId is undefined or null");
        return null;
    }
    console.log(   `worker id is : ${workerId._id}`)
    // Convert workerId to ObjectId (since it's stored as an ObjectId)
    const workerObjectId = new mongoose.Types.ObjectId(workerId._id);

    try {
        const task = await Task.findOne({
            done: false,
            $or: [
                { submissions: { $size: 0 } }, // Get tasks with no submissions
                { submissions: { $not: { $elemMatch: { worker_id: workerObjectId } } } } // Exclude tasks the worker has submitted
            ],
        })
        .populate("options")
        .sort({ createdAt: 1 });

        return task;
    } catch (error) {
        console.error("Error fetching next task:", error);
        return null;
    }
};
