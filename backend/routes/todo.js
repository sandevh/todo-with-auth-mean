import { Router } from "express";
import auth from "../middleware/authMiddleware.js";
import {
  getToDos,
  createToDo,
  updateToDo,
  deleteToDo,
} from "../controllers/toDoController.js";

const toDoRouter = Router();

toDoRouter.get("/", auth, getToDos);
toDoRouter.post("/", auth, createToDo);
toDoRouter.put("/:id", auth, updateToDo);
toDoRouter.delete("/:id", auth, deleteToDo);

export default toDoRouter;