const mongoose = require('mongoose');
const { Schema } = mongoose; //=const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: String
});

// mongoose.model('users', userSchema);
module.exports = User = mongoose.model('users', userSchema);
