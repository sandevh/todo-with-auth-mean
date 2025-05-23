import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const authRouter = Router();

authRouter.post('/signup', async (req, res) => {
  const {email, password, userName} = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).send({message: "User already exists", success: false});
  }
  const hashed = await bcrypt.hash(password, 10);
  await User.create({email, password: hashed, userName});
  res.status(201).send({message: "User registered successfully", success: true});
});

authRouter.post('/login', async (req, res) => {
  const {email, password} = req.body;
  const user  = await User.findOne({email});
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send({message: "Invalid credentials", success: false});
  }

  const token = jwt.sign({userId: user._id, userName: user.userName}, JWT_SECRET);
  res.send({token, success: true});
});  

export default authRouter;