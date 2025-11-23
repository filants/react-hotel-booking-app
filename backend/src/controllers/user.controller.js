import { createUser, loginUser } from '../services/index.js';
import { mapUser } from '../helpers/index.js';

export const register = async (req, res) => {
  try {
    const { login, password } = req.body;

    const { user, token } = await createUser(login, password);

    res
      .status(201)
      .cookie('token', token, { httpOnly: true })
      .send({ error: null, user: mapUser(user) });
  } catch (error) {
    res.status(400).send({ error: error.message || 'Uknown error' });
  }
};

export const login = async (req, res) => {
  try {
    const { login, password } = req.body;

    const { user, token } = await loginUser(login, password);

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
