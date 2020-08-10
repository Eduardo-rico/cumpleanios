const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cumples: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Cumple',
    },
  ],
  activated: {
    type: Boolean,
    default: true,
  },
  lastLogin: {
    type: Date,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  badEmail: {
    type: String,
  },
});

module.exports = mongoose.model('Usuario', userSchema);
