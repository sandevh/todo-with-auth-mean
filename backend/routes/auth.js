import express from 'express';
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const authRouter = Router();

authRouter.post('signup', async (req, res) => {
  const {email, password} = req.body;
  const hashed = await bcrypt.hash(password, 10);
  await User.create({email, password: hashed});
  res.send({message: "User regisdtered successfully"});
});

authRouter.post('login', async (req, res) => {
  const {email, password} = req.body;
  const user  = await User.findOne({email});
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send({message: "Invalid credentials"});
  }

  const token = jwt.sign({id: user._id}, JWT_SECRET);
  res.send({token});
});  

export default authRouter;