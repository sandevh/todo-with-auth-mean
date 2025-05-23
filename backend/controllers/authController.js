import User from "../models/User.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const signup = async (req, res) => {
  try {
    const {email, password, userName} = req.body;
    const user = await User.findOne({email});
    if (user) {
      res.status(400).json({message: "User already exists", success: false});
    }
    const hashed = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashed, userName });
    res.status(201).json({ message: "User registered successfully", success: true });
  } catch (error) {
    res.status(500).json({message: "Error while signup"});
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials", success: false });
    }

    const token = jwt.sign(
      { userId: user._id, userName: user.userName },
      JWT_SECRET
    );
    res.send({ token, success: true });
  } catch (error) {
    res.status(500).json("Error while login");
  }
}