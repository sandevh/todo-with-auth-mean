import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  email: String,
  password: String,
  userName: String
});

const User = model('User', UserSchema);
export default User;