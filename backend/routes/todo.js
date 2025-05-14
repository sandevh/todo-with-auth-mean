import express from 'express';
import { Router } from 'express';
import ToDo from '../models/ToDo.js';
import auth from '../middleware/authMiddleware.js';

const toDoRouter = Router();

toDoRouter.get("/", auth, async (req, res) => {
  const todos = await ToDo.find({ userId: req.user.userId }).populate("userId");
  res.send(todos);
});

toDoRouter.post("/", auth, async (req, res) => {
  const todo = await ToDo.create({
    userId: req.user.userId,
    task: req.body.task,
  });
  res.send(todo);
});

toDoRouter.delete("/:id", auth, async (req, res) => {
  await ToDo.deleteOne({ _id: req.params.id, userId: req.user.userId });
  res.status(204).send();
});

export default toDoRouter;