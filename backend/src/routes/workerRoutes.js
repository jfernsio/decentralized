import express from 'express';
import {signinController,nextTaskController} from '../../controllers/workerController.js'
import {authWorkerMiddleware} from '../../authMiddelweare.js';
const  workerRouter= express.Router();

workerRouter.post('/signin',signinController);
workerRouter.post('/tasks',authWorkerMiddleware);
workerRouter.get('/tasks',nextTaskController);

export default workerRouter;