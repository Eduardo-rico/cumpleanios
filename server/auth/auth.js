const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  //si no exite token
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    res.status(420).json({mensaje: 'Vuelva a iniciar sesión'});
  }
  try {
    const payload = jwt.verify(token, 'secreto,guardar,enun .env');
    if (!payload) {
      res.status(420).json({mensaje: 'Vuelva a iniciar sesión'});
    } else {
      if (payload.usuarioConToken.activated === true) {
        req.usuarioId = payload.usuarioConToken._id;
        next();
      } else {
        res
          .status(403)
          .json({mensaje: 'Vuelva a iniciar sesión, no se encontró usuario'});
      }
    }
  } catch (error) {
    res
      .status(420)
      .json({mensaje: 'Vuelva a iniciar sesión, problema de autenticación'});
  }
  //si si existe token

  //si el token está expirado
};

const authAdmin = (req, res, next) => {
  //si no exite token
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    res.status(420).json({mensaje: 'Vuelva a iniciar sesión'});
  }
  try {
    const payload = jwt.verify(token, 'secreto,guardar,enun .env');
    if (!payload) {
      res.status(420).json({mensaje: 'Vuelva a iniciar sesión'});
    } else {
      if (payload.usuarioConToken.admin === true) {
        req.usuarioId = payload.usuarioConToken._id;
        next();
      } else {
        res.status(403).json({mensaje: 'Vuelva a iniciar sesión, admin'});
      }
    }
  } catch (error) {
    res
      .status(420)
      .json({mensaje: 'Vuelva a iniciar sesión, problema de auth admin'});
  }
  //si si existe token

  //si el token está expirado
};

module.exports = {auth, authAdmin};
