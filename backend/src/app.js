import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.route.js';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

app.use(express.json());

app.use('/', userRoutes);

export default app;
