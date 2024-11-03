import User from '../dao/models/user.mongo.models.js';
import jwt from 'jsonwebtoken';

export const registerUser = async (userData) => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error('User already exists');
  }
  const user = new User(userData);
  await user.save();
  return user;
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !(await user.isValidPassword(password))) {
    throw new Error('Invalid email or password');
  }
  const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

export const updateUser = async (email, updateData) => {
  const user = await User.findOneAndUpdate({ email }, updateData, { new: true, runValidators: true });
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

export const deleteUser = async (email) => {
  const user = await User.findOneAndDelete({ email });
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

export const getUserProfile = async (email) => {
  const user = await User.findOne({ email }).select('-password');
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};