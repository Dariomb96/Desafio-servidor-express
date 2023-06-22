import mongoose from 'mongoose';

const userCollection = "users";

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  age: Number,
  role: {
    type: String,
    default: "Consumer" 
  },
  lastLogin: {
    type: Date,
    default: null
  }
});

const userModel = mongoose.model(userCollection, userSchema);

export {
  userModel,
}
