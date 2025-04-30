const express = require('express');
const session = require('express-session');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const cidadesRoutes = require('./routes/cidadeRoutes');
const { SESSION_SECRET, FRONTEND_URL, PORT } = require('./config/config');

const app = express();


app.use(cors({ origin: FRONTEND_URL, credentials: true }));


app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, 
  }
}));


app.get('/', (req, res) => {
  res.send(`babado mxm`);
});


app.use(authRoutes);
app.use(cidadesRoutes);


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
