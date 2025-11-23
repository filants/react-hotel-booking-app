import jwt from 'jsonwebtoken';

export const generate = (data) =>
  jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '30d' });

export const verify = (token) => jwt.verify(token, process.env.JWT_SECRET);
