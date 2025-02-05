import express from "express";
import connectDB from './config/connectDb.js'
import userRouter from "./src/routes/user.js";
import userrouter from "./src/routes/userRoutes.js";
import workerRouter from "./src/routes/worker.js";
import { Submission } from "./models/taskModel.js";
import { authMiddleware } from "./authMiddelweare.js";
const app = express();
app.use(express.json());

connectDB()
app.use("/api/user", userrouter);
app.use("/api/worker", workerRouter);
app.post("/submit", authMiddleware, async (req, res) => {
  try {
    const { taskId, optionId } = req.body;

    const submission = await Submission.create({
      task_id: taskId,
      option_id: optionId,
      // worker_id: '67a182ed99f3fb',
      user_id: req.userId,
    });

    res.json({ success: true, submission });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
