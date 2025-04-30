const client = require('../auth/google');

const login = (req, res) => {
  const url = client.generateAuthUrl({
    access_type: 'offline',
    scope: ['profile', 'email'],
  });
  res.redirect(url);
};


const callback = async (req, res) => {
  const { code } = req.query;

  const { tokens } = await client.getToken(code);
  client.setCredentials(tokens);

  const ticket = await client.verifyIdToken({
    idToken: tokens.id_token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  req.session.user = payload;

  res.redirect('http://localhost:5173');
};

const profile = (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Não autorizado' });
  }
  
  res.json({ user: req.session.user });
  return
};

const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};

module.exports = {
  login,
  callback,
  profile,
  logout,
};
