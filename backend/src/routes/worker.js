import express from "express";

const workerRouter = express.Router();

workerRouter.post("/sigin", (req, res) => {
  res.send("Hello World");
});

export default workerRouter;
