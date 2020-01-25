const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);
// mongoose
//   .connect(keys.mongoURI, () => {}, { useNewUrlParser: true })
//   .catch(err => {
//     // console.log(err);
//   });

const app = express();

// app.use wires up middlewares, which comes between the app and handlers
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
    keys: [keys.cookieKey] // to encrypt the cookie
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets like our main.js file, or main.css file
  app.use(express.static('client/build'));

  // Express will serve up the index.html file if it doesn't recognize the route (if not in authRoutes, not in billingRoutes, not in build directory, then move on to ReactRouter)
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000; // provided by Heroku, or 5000 in development
app.listen(PORT);
