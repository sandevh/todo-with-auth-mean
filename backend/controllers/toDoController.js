import ToDo from "../models/ToDo.js"

export const getToDos = async (req, res) => {
  try {
    const todos = await ToDo.find({userId: req.user.userId}).populate("userId");
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({message: "Error while retrieving todos"});
  }
}

export const createToDo = async (req, res) => {
  try {
    const todo = await ToDo.create({
      userId: req.user.userId,
      task: req.body.task,
    });
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({message: "Error while creating todo"});
  }
}

export const updateToDo = async (req, res) => {
  try {
    const { done } = req.body;
    const updated = await ToDo.findOneAndUpdate(
      {_id: req.params.id, userId: req.user.userId
      }, 
      { done }, 
      { new: true }
    );
    if (!updated) {
      res.status(404).json({message: "ToDo not found"});
    }
  } catch (error) {
    res.status(500).json({message: "Error while updating todo"});
  }
}

export const deleteToDo = async (req, res) => {
  try {
    const deleted = await ToDo.deleteOne({_id: req.params.id, userId: req.user.userId});
    res.status(204).send();
  } catch (error) {
    res.status(500).json({message: "Error while deleting todo"});
  }
}