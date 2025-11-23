export const mapUser = (user) => ({
  id: user._id,
  login: user.login,
  role: user.role,
});
