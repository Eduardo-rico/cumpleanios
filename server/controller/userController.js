//librerias
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//modelos
const Usuario = require('../models/usuarioModel');

const hola = (req, res) => {
  console.log(req.usuarioId);
  res.json({hola: 'mundo'});
};

const loggearUsuario = async (req, res) => {
  //si existe el usuario
  const {email, password} = req.body;
  try {
    if (!email || !password) {
      res.status(501).json({mensaje: 'Email y password son requeridos'});
    } else {
      const usuarioBuscado = await Usuario.findOne({email});
      if (!usuarioBuscado) {
        res.status(404).json({mensaje: 'Usuario no encontrado'});
      } else {
        //evitar que salga otra mmda
        const activado = usuarioBuscado.activated;
        if (activado === false) {
          const badEmail = usuarioBuscado.email;
          await Usuario.findOneAndUpdate(
            {email, activated: false},
            {badEmail: badEmail, email: usuarioBuscado._id},
          );
          res
            .status(200)
            .json({mensaje: 'Se ha eliminado el usuario permanentemente'});
        }
        //fin de la mmmda

        const buenPassword = await bcrypt.compare(
          password,
          usuarioBuscado.password,
        );
        if (!buenPassword) {
          res.status(404).json({mensaje: 'Password no correcto'});
        }
        delete usuarioBuscado.password;
        const token = jwt.sign(
          {usuarioConToken: usuarioBuscado},
          'secreto,guardar,enun .env',
          {
            expiresIn: '365d',
          },
        );
        res
          .status(200)
          .json({mensaje: 'Usuario loggeado correctamente', token});
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      mensaje: 'Error del servidor, una disculpa',
      error: error.toString(),
    });
  }
  //comparar la contraseña
  //enviar un success o un failure dependiendo si la contraseña lo amerita.
};

const crearUsuario = async (req, res) => {
  const {email, password} = req.body;
  try {
    if (!email || !password) {
      res.status(501).json({mensaje: 'Email y password son requeridos'});
    } else {
      const passwordEncriptado = await bcrypt.hash(password, 10);

      const nuevoUsuario = await Usuario.create({
        email,
        password: passwordEncriptado,
      });
      if (nuevoUsuario) {
        res.status(200).json({
          mensaje: 'Usuario creado',
        });
      } else {
        res.status(500).json({mensaje: 'Error al crear el usuario'});
      }
    }
  } catch (error) {
    console.log('Error con código: ' + error.code);
    console.log('Fecha del error: ' + Date.now());
    if (error.code === 11000) {
      res.status(500).json({
        mensaje: 'Email ya utilizado',
      });
    } else {
      res.status(500).json({
        mensaje: 'Error interno del servidor, lo lamentamos',
      });
    }
  }
};

module.exports = {
  hola,
  crearUsuario,
  loggearUsuario,
};
