import mongoose from "mongoose";


const { Schema } = mongoose;

// Enum for transaction status
const TxnStatus = {
  Processing: 'Processing',
  Success: 'Success',
  Failure: 'Failure'
};

// User Schema
const userSchema = new Schema({
  address: {
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: true });

// Worker Schema
const workerSchema = new Schema({
  address: {
    type: String,
    required: true,
    unique: true
  },
  pending_amount: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  locked_amount: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  }
}, { timestamps: true });

// Task Schema
const taskSchema = new Schema({
  title: {
    type: String,
    default: "Select the most clickable thumbnail"
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  signature: {
    type: String,
    required: true
  },
  amount: {
    type: Number, 
    required: true
  },
  done: {
    type: Boolean,
    default: false
  },
  options: [{
    type: Schema.Types.ObjectId,
    ref: 'Option'
  }],
  submissions: [{ 
    worker_id: { type: Schema.Types.ObjectId, ref: 'Worker' }
  }] 
}, { timestamps: true });

// Option Schema
const optionSchema = new Schema({
  image_url: {
    type: String,
    required: true
  },
  task_id: {
    type: Schema.Types.ObjectId,
    ref: 'Task',
    required: true
  },
  submissions: {
    type: Number,
    default: 0,
    min: 0
  }
}, { timestamps: true });

// Submission Schema
const submissionSchema = new Schema({
  worker_id: {
    type: Schema.Types.ObjectId,
    ref: 'Worker',
    // required: true
  },
  option_id: {
    type: Schema.Types.ObjectId,
    ref: 'Option',
    required: true
  },
  task_id: {
    type: Schema.Types.ObjectId,
    ref: 'Task',
    required: true
  },
  amount: {
    type: Number,
    // required: true
  }
}, { timestamps: true });

// Compound index to prevent duplicate submissions
submissionSchema.index({ worker_id: 1, task_id: 1 }, { unique: true });

// Payouts Schema
const payoutSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  signature: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: Object.values(TxnStatus),
    required: true
  }
}, { timestamps: true });



// Create models
const User = mongoose.model('User', userSchema);
const Worker = mongoose.model('Worker', workerSchema);
const Task = mongoose.model('Task', taskSchema);
const Option = mongoose.model('Option', optionSchema);
const Submission = mongoose.model('Submission', submissionSchema);
const Payout = mongoose.model('Payout', payoutSchema);

// pre-save middleware to ensure options exist
//taskSchema.pre('save', async function(next) {
//   try {
//     if (this.options && this.options.length > 0) {
//       const optionsExist = await Option.find({
//         '_id': { $in: this.options }
//       });
//       if (optionsExist.length !== this.options.length) {
//         throw new Error('Some options do not exist');
//       }
//     }
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

export {
  User,
  Worker,
  Task,
  Option,
  Submission,
  Payout,
  TxnStatus
};