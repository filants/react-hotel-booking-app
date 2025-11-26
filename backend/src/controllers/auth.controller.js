import { createUser, loginUser, identifyUser } from '../services/index.js';
import { mapUser } from '../helpers/index.js';

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await createUser(email, password);

    return res
      .status(201)
      .cookie('token', token, { httpOnly: true })
      .send({ error: null, user: mapUser(user) });
  } catch (error) {
    if (error.code === 11000)
      return res.status(409).send({ error: 'User already exists' });

    if (error.message === 'Password is not strong enough')
      return res.status(400).send({
        error:
          'Password must be at least 8 characters with uppercase, lowercase, number, and symbol',
      });

    if (error.name === 'ValidationError') {
      const emailError = error.errors.email?.message;
      return res.status(400).send({ error: emailError });
    }

    res.status(400).send({ error: error.message || 'Uknown error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await loginUser(email, password);

    res
      .status(200)
      .cookie('token', token, { httpOnly: true })
      .send({ error: null, user: mapUser(user) });
  } catch (error) {
    res.status(400).send({ error: error.message || 'Uknown error' });
  }
};

export const logout = async (req, res) =>
  res.cookie('token', '', { httpOnly: true }).send({});

export const me = async (req, res) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).send({ error: 'Not authenticated' });

    const user = await identifyUser(token);

    res.send({ user: { id: user._id, email: user.email } });
  } catch {
    res.status(401).send({ error: 'Not authenticated' });
  }
};
