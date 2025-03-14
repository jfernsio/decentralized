import { Task, Option, User, Submission } from '../models/taskModel.js';
import mongoose, { startSession } from "mongoose";
import { createTasks } from "../utils/zod.js";
import { Keypair, Connection, PublicKey, Transaction } from "@solana/web3.js";
import nacl from "tweetnacl";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const LAMPORTS_PER_SOL = 1_000_000_000; 


const connection = new Connection("https://solana-devnet.g.alchemy.com/v2/1tKF_pNATYcuDBQ9Gh9AiCBrL6ckiTO1");

const PARENT_WALLET_ADDRESS = "9AbMAYTcz7iSDNkDFSxWVzFa7YZuinPX5NsMcYx31BLz";
 // 1 SOL = 1,000,000,000 lamports

const signinController = async(req,res) => {
  console.log('user singin')
    // Route for user sign-in with wallet
    // Mock wallet address (TODO: implement actual wallet verification)
    const {signatureProp,publicKeyProp} = req.body;
    const base64signature = signatureProp;

    const decodedSignature = Buffer.from(base64signature,"base64")
    console.log(decodedSignature)
    // Check if user exists, if not create new user
   const message = new TextEncoder().encode("Sign into mechanical turks");
   const isVerified = nacl.sign.detached.verify(message,decodedSignature,new PublicKey(publicKeyProp).toBuffer())
   console.log("Signature Verified:", isVerified);

      try {
       // Find the user by address (ignore pending_amount and locked_amount)
let existingUser = await User.findOneAndUpdate(
  // Find the user by address
  { address: req.body.publicKeyProp }, 
  // If user doesn't exist, create a new user with the provided address
  { $setOnInsert: { address: req.body.publicKeyProp } }, 
  // Return the updated/new user document and upsert if not found
  { new: true, upsert: true } 
);
console.log(existingUser)
      const token = jwt.sign(
        { id: existingUser._id }, // Use worker._id
        process.env.JWT_PASS,
        { expiresIn: "7d" } // Optional: Token expiry
      );
  
      res.json({ token });
    } catch (error) {
      console.error("Signin Error:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  }

const tasksPostController = async(req,res) => {
    const userId = req.userId;
    // Validate userId
    // if (!mongoose.Types.ObjectId.isValid(userId)) {
    //     return res.status(400).json({ error: "Invalid user ID" });
    // }
    const body = req.body;
  
  //get user addres
  const userAddress = await User.findOne({_id:userId});

    
    const parseData = createTasks.safeParse(body);
    if (!parseData.success)
      return res.status(400).json({ error: parseData.error });
    if (!parseData.data)
      return res.status(411).json({ msg: "you have entered wrong inputs" });
    console.log(`parsedData  ${parseData.data}`)
  const transaction = await connection.getTransaction(parseData.data.signature, {
      maxSupportedTransactionVersion: 1
  });

  console.log(transaction);
  console.log("transcation keys",transaction.transaction.message.getAccountKeys().get(1).toString())
  console.log(PARENT_WALLET_ADDRESS)
  if ((transaction?.meta?.postBalances[1] ?? 0) - (transaction?.meta?.preBalances[1] ?? 0) !== 100000000) {
      return res.status(411).json({
          message: "Transaction signature/amount incorrect"
      })
  }

  if (transaction?.transaction.message.getAccountKeys().get(1)?.toString() !== PARENT_WALLET_ADDRESS) {
      return res.status(411).json({
          message: "Transaction sent to wrong address"
      })
  }

  if (transaction?.transaction.message.getAccountKeys().get(0)?.toString() !== userAddress?.address) {
      return res.status(411).json({
          message: "Transaction sent to wrong address"
      })
  }
  // was this money paid by this user address or a different address?

  // parse the signature here to ensure the person has paid 0.1 SOL
  // const transaction = Transaction.from(parseData.data.signature); 

    // function to create task and options in a transaction
    const createTaskWithOptions = async (userId, title, signature, options) => {
      const session = await mongoose.startSession();
      session.startTransaction();
  
      try {
        
        const task = await Task.create(
          [
            {
              title: title,
              user_id: userId,
              signature: signature,
              amount: 0.1*LAMPORTS_PER_SOL,
              options: [], 
            },
          ],
          { session }
        );
  
       
        const optionsToCreate = options.map((opt) => ({
          image_url: opt.imageUrl,
          task_id: task[0]._id,
          submissions: 0, 
        }));
  
        const createdOptions = await Option.insertMany(optionsToCreate, {
          session,
        });
  
        
        await Task.findByIdAndUpdate(
          task[0]._id,
          { options: createdOptions.map((opt) => opt._id) },
          { session }
        );
  
        await session.commitTransaction();
        return task[0];
      } catch (error) {
        await session.abortTransaction();
        throw error;
      } finally {
        session.endSession();
      }
    };
 
    (async () => {
        try {
          const task = await createTaskWithOptions(
            userId,
            parseData.data.title,
            parseData.data.signature,
            parseData.data.options
          );
          res.status(201).json({ message: `Task created successfully!`, task,success:true });
          console.log("Task created:", task);
        } catch (error) {
          console.error("Error creating task:", error);
        }
      })();
}


// Route to get task details and submission stats
const tasksGetController = async (req, res) => {
  try {
    const taskId = req.query.taskId;

    // Validate taskId
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ error: "Invalid task ID" });
    }
    const userId = req.userId;

    // Fetch the task
    const task = await Task.findOne({
      _id: taskId,
      user_id: userId,
    });

    if (!task) {
      return res.status(411).json({
        message: "You don't have access to this task",
      });
    }

    // Fetch options for the task
    const options = await Option.find({ task_id: taskId });

    // Fetch submission counts for each option
    const submissions = await Submission.aggregate([
      {
        $match: { task_id: task._id },
      },
      {
        $group: {
          _id: "$option_id",
          count: { $sum: 1 },
        },
      },
    ]);

    // Combine the data
    const submissionMap = new Map(
      submissions.map(sub => [sub._id.toString(), sub.count])
    );

    const result = {};

    options.forEach((option) => {
        result[option._id] = {
            count: submissionMap.get(option._id.toString()) || 0,
            option: {
                imageUrl: option.image_url
            }
        };
    });
    
    // Performance optimization with Map
    console.log("Submisision Map!",submissionMap);
    res.json({
        result,
        taskDetails: task
    })
  } catch (error) {
    console.error("Error in tasksGetController:", error);
    res.status(500).json({ error: "Internal server error" });
  }
 
};


const getAllTasksByUser = async(req,res) => {
console.log('get task by user')
  const userId = req.userId

  if(!userId)  return res.status(401).json({error: "Unauthorized"})
  
  try {
    const tasks = await Task.find({user_id:userId}).populate('options');
    return res.status(200).json({
      success: true,
      tasks})
  } catch (error) {
    console.log(`Error fetching all tasks ${error}`);
    return res.status(500).json({
      success: false,
      "msg":`Error fetching all tasks ${error}`
    })
  }

}

const getAllTasks = async (req,res) => {
  try {
      const tasks = await Task.find().populate('options');
      res.json(tasks);
      console.log(`all Tasks count ${tasks.length}`)
      
  } catch (error) {
    console.log(`Error fetching all tasks ${error}`);
    return res.status(500).json({
      success: false,
      "msg":`Error fetching all tasks ${error}`
    })
  }
}
export {signinController,tasksPostController,tasksGetController,getAllTasksByUser,getAllTasks};