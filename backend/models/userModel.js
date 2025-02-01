import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id : {type : String, required : true},
    address : {type : String, required : true},
    tasks : {type : Array},
    payouts : {type : Array},
}, {timestamps : true})

const User = mongoose.model("User", userSchema);

export default User;