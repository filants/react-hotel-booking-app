import express from 'express';
import roomCategories from '../config/roomCategories.json' with { type: "json" };;

const router = express.Router();

router.get('/', (req, res) => {
    res.json(roomCategories)
});

export default router;
