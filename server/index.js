const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv').config();

const passport = require('passport');
require('../config/passport-setup');

const cookieSession = require('cookie-session');
const authRoutes = require('./auth-routes');
const readrRoutes = require('./readr-routes');
// const { BcRoutes } = require('./bookClub-routes');
// const filmReviews = require('./filmReviews.js');

const PORT = process.env.PORT || 3000;
const app = express();

// initialize cookie session
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000, // 1 day in ms
  keys: [process.env.cookieKey || 'cookieKey'],
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(bodyParser.json());
app.use(morgan('tiny'));

app.use('/auth', authRoutes);
app.use('/readr', readrRoutes);
// app.use('/bc', BcRoutes);
app.use('/filmReviews', require('./filmReviews.js'));

app.use('/api/audiobooks', require('./audiobook-routes'));

// catch all for refresh issues
app.get('/*', (req, res) => {
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`✨ Listening locally at http://localhost:${PORT}`);
});
