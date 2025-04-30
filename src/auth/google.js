const { OAuth2Client } = require('google-auth-library');
require('dotenv').config();

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:3000/auth/google/callback'
);

module.exports = client;
