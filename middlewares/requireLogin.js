module.exports = (req, res, next) => {
  if (!req.user) {
    // if not logged in
    return res.status(401).send({ error: 'You must log in' }); // http status code that engineers can refer to
  }

  next(); // if logged in, everything's good, let's proceed
};
