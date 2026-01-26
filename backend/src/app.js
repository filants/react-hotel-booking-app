import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoute from './routes/auth.route.js';
import roomRoute from './routes/room.route.js';
import roomCategoryRoute from './routes/roomCategory.route.js';

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsPath = path.resolve(__dirname, '../uploads');

app.use(cookieParser());
app.use(express.json());

app.use('/auth', authRoute);
app.use('/api/rooms', roomRoute);
app.use('/api/room-categories', roomCategoryRoute);
app.use('/uploads', express.static(uploadsPath));

export default app;
