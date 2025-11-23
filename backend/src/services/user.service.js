import bcrypt from 'bcrypt';
import User from '../models/user.js';
import { generate } from '../helpers/index.js';

export const createUser = async (login, password) => {
  if (!password) {
    throw new Error('Password is empty!');
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({ login, password: passwordHash });
  const token = generate({ id: user._id });

  return { user, token };
};

export const loginUser = async (login, password) => {
  const user = await User.findOne({ login });

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
