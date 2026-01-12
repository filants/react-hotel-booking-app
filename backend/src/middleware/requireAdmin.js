import { roles } from '../constants/index.js';

export const requireAdmin = async (req, res, next) => {
  if (req.user.role !== roles.ADMIN)
    return res.status(403).json({ error: 'Admin access required' });

  next();
};
