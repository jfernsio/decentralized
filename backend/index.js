import express from "express";
import connectDB from './config/connectDb.js'
import cors from "cors";
import userRouter from "./src/routes/user.js";
import userrouter from "./src/routes/userRoutes.js";
import workerRouter from "./src/routes/workerRoutes.js";
import cookieParser from "cookie-parser";
import { Option, Submission ,Task } from "./models/taskModel.js";
import { authWorkerMiddleware ,authMiddleware } from "./authMiddelweare.js";
import { generateSignature } from "./controllers/cloudinaryController.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB()
app.use(cors());
app.use("/api/user", userrouter);
app.use("/api/worker", workerRouter);
app.get('/api/get/signature',authMiddleware,generateSignature)
app.post("/submit", authWorkerMiddleware, async (req, res) => {
  try {
    const { taskId, optionId } = req.body;

    const submission = await Submission.create({
      task_id: taskId,
      option_id: optionId,
      worker_id: req.userId,
    });

    const updateOption = await Option.findOneAndUpdate({
      _id: optionId,
      task_id: taskId,
    }, {
      $inc: { submissions: 1 }
    });
    const updateTask = await Task.findOneAndUpdate({
      _id: taskId,
    }, {
     done:true
    });
  

    res.json({ success: true, submission, updateOption, updateTask });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.delete("/api/delete/all/tasks",async(req,res)=>{
  try {
   const deleted =  await Task.deleteMany();
    res.json({ success: true, count: deleted.deletedCount });
    console.log(deleted.deletedCount);

  } catch(e) {
    return res.status(500).json({ message: e.message });
  }    

})
app.get('/get/tasks',async(req,res)=>{
  try {
    const tasks = await Task.find()
    res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
      }
      })
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
