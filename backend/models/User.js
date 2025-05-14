import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  email: String,
  password: String
});

MediaSourceHandle.exports = model('User', UserSchema);