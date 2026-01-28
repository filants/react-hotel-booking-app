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
  // Generate unique filenames to avoid collisions when creating rooms and uploading images in the same request
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const base = path.basename(file.originalname, ext).replace(/\s+/g, '-');
    cb(null, `${Date.now()}-${base}${ext}`);
  },
});

export const uploadRoomPictures = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ok = ['image/jpeg', 'image/png', 'image/webp'].includes(
      file.mimetype,
    );
    cb(ok ? null : new Error('Only image files are allowed'), ok);
  },
});
