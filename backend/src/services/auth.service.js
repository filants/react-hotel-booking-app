import bcrypt from 'bcrypt';
import validator from 'validator';
import User from '../models/user.js';
import { generate, verify } from '../helpers/index.js';

export const createUser = async (email, password) => {
  if (!password) {
    throw new Error('Password is empty!');
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error('Password is not strong enough');
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({ email, password: passwordHash });
  const token = generate({ id: user._id });

  return { user, token };
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error('Password is wrong!');
  }

  const token = generate({ id: user._id });

  return { user, token };
};

export const identifyUser = async (token) => {
  const decodedToken = verify(token);
  const user = await User.findById(decodedToken.id);

  if (!user) {
    throw new Error('Not authenticated');
  }

  return user;
};
