import express from 'express';
import {signinController,nextTaskController,submitTaskController} from '../../controllers/workerController.js'
import {authWorkerMiddleware} from '../../authMiddelweare.js';
const  workerRouter= express.Router();

workerRouter.post('/signin',signinController);
workerRouter.post('/tasks',authWorkerMiddleware);
workerRouter.get('/tasks',authWorkerMiddleware,nextTaskController);
workerRouter.post('/submit',authWorkerMiddleware,submitTaskController);
export default workerRouter;