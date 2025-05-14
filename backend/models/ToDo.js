import mongoose, { Schema, model } from "mongoose";

const ToDoSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  task: String
})

const ToDo = mongoose.model("ToDo", ToDoSchema);
export default ToDo;