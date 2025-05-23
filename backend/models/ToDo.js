import mongoose, { Schema, model } from "mongoose";

const ToDoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  task: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    default: false
  }
})

const ToDo = mongoose.model("ToDo", ToDoSchema);
export default ToDo;