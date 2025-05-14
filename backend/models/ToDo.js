import mongoose, { Schema, model } from "mongoose";

const ToDoSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  task: String
})

module.exports = mongoose.model('ToDo', ToDoSchema);