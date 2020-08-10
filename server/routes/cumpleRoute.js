const express = require('express');

const cumpleRoutes = express.Router();
const {
  hola,
  traerCumples,
  traerUnCumple,
  crearCumple,
  modificarCumple,
  desactivarCumple,
} = require('../controller/cumpleController');

const {auth} = require('../auth/auth');

cumpleRoutes
  .get('/', auth, traerCumples)
  .get('/:cumpleId', auth, traerUnCumple)
  .post('/crear', auth, crearCumple)
  .put('/modificar/:cumpleId', auth, modificarCumple)
  .put('/eliminar/:cumpleId', auth, desactivarCumple);

module.exports = cumpleRoutes;
