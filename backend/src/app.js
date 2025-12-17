import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoute from './routes/auth.route.js';
import roomRoute from './routes/room.route.js';
import roomCategoryRoute from './routes/roomCategory.route.js';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use('/auth', authRoute);
app.use('/api/rooms', roomRoute);
app.use('/api/room-categories', roomCategoryRoute);

export default app;
