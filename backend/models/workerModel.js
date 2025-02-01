import mongoose from "mongoose";

const workerSchema = new mongoose.Schema({
    id : {type : String, required : true},
    address : {type : String, required : true},
    submissions : {type : Array},
    pending_amount : {type : Number},
    locked_amount : {type : Number},
}, {timestamps : true})

const Worker = mongoose.model("Worker", workerSchema);

export default Worker;