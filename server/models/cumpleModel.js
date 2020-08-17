const mongoose = require('mongoose');

const cumpleSchema = mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  fechaCumple: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  apellido: {
    type: String,
    required: true,
    trim: true,
  },
  activated: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('Cumple', cumpleSchema);
