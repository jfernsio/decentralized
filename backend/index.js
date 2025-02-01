import express from "express";

import userRouter from "./src/routes/user.js";
import workerRouter from "./src/routes/worker.js";
import { authMiddleware }from './authMiddelweare.js'
const app = express();

app.use("/api/user", userRouter);
app.use("/api/worker", workerRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
