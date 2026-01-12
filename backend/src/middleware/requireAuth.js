import { identifyUser } from '../services/index.js';

export const requireAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ error: 'Not authenticated' });

    const user = await identifyUser(token);

    req.user = { id: user._id, email: user.email, role: user.role };

    next();
  } catch (error) {
    res.status(401).json({ error: 'Not authenticated' });
  }
};
