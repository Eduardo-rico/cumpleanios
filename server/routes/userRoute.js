const express = require('express');

const userRoutes = express.Router();

const {
  hola,
  crearUsuario,
  loggearUsuario,
} = require('../controller/userController');

const {auth, authAdmin} = require('../auth/auth');

userRoutes
  .get('/', auth, authAdmin, hola)
  .post('/signup', crearUsuario)
  .post('/login', loggearUsuario);
//.get("/", pagina-de-inicio)
//.get("/all", auth, mostrarTodosLosUsuarios)

module.exports = userRoutes;
