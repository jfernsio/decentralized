import {signinController,tasksPostController,tasksGetController ,getAllTasks} from '../../controllers/userContoller.js';
import express from 'express';
import {authMiddleware} from '../../authMiddelweare.js';
const userrouter = express.Router();

userrouter.post('/signin',signinController);
userrouter.post('/tasks',authMiddleware,tasksPostController);
userrouter.get('/tasks',authMiddleware,tasksGetController);
userrouter.get('/all/tasks',getAllTasks)

export default userrouter;