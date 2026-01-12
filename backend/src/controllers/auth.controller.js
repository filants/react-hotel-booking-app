import { createUser, loginUser, identifyUser } from '../services/index.js';
import { mapUser } from '../helpers/index.js';

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await createUser(email, password);

    return res
      .status(201)
      .cookie('token', token, { httpOnly: true })
      .json({ error: null, user: mapUser(user) });
  } catch (error) {
    if (error.code === 11000)
      return res.status(409).json({ error: 'User already exists' });

    if (error.message === 'Password is not strong enough')
      return res.status(400).json({
        error:
          'Password must be at least 8 characters with uppercase, lowercase, number, and symbol',
      });

    if (error.name === 'ValidationError') {
      const emailError = error.errors.email?.message;
      return res.status(400).json({ error: emailError });
    }

    res.status(500).json({ error: 'Internal server error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await loginUser(email, password);

    res
      .cookie('token', token, { httpOnly: true })
      .json({ error: null, user: mapUser(user) });
  } catch (error) {
    if (
      error.message === 'User not found' ||
      error.message === 'Password is wrong!'
    ) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const logout = async (req, res) =>
  res.cookie('token', '', { httpOnly: true }).json({});

export const me = async (req, res) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ error: 'Not authenticated' });

    const user = await identifyUser(token);

    res.json({ user: { id: user._id, email: user.email, role: user.role } });
  } catch {
    res.status(401).json({ error: 'Not authenticated' });
  }
};
