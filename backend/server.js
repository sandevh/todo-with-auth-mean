import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRouter from './routes/auth.js';
import todoRouter from './routes/todo.js';

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/auth', authRouter);
app.use('/api/todo', todoRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    })
  })
  .catch((err) => {
    console.error(err);
  });