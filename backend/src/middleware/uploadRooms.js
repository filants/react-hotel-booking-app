import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const roomsUploadDir = path.resolve(__dirname, '../../uploads/rooms');
fs.mkdirSync(roomsUploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, roomsUploadDir),
  filename: (req, file, cb) => {
    const safeName = file.originalname
      .toLowerCase()
      .replace(/[^a-z0-9.\-_]/g, '-');
    cb(null, safeName);
  },
});

export const uploadRoomPictures = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ok = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(
      file.mimetype
    );
    cb(ok ? null : new Error('Only image files are allowed'), ok);
  },
});
