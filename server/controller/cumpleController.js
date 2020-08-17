const moment = require('moment');

//modelos
const Cumple = require('../models/cumpleModel');
const Usuario = require('../models/usuarioModel');

const hola = (req, res) => {
  res.json({hola: 'mundini'});
};

const traerUnCumple = async (req, res) => {
  const {usuarioId} = req;
  const {cumpleId} = req.params;
  try {
    if (!usuarioId) {
      res.status(403).json({mensaje: 'Vuelve a iniciar sesión'});
    } else {
      const unCumple = await Cumple.findOne(
        {
          _id: cumpleId,
          activated: true,
        },
        ['-activated'],
      );
      if (!unCumple) {
        throw new Error('El cumpleaños no existe');
      } else {
        res.status(200).json(unCumple);
      }
    }
  } catch (error) {
    // console.log({error});
    res.status(500).json({mensaje: error.toString()});
  }
};

const traerCumples = async (req, res) => {
  const {usuarioId} = req;
  try {
    if (!usuarioId) {
      res.status(403).json({mensaje: 'Vuelve a iniciar sesión'});
    } else {
      const todosLosCumples = await Cumple.find(
        {
          createdBy: usuarioId,
          activated: true,
        },
        ['-activated'],
        {sort: {diasAlCumple: 1}},
      );
      if (!todosLosCumples) {
        throw new Error('Error Al traer los cumpleaños, throw');
      } else {
        res.status(200).json(todosLosCumples);
      }
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({mensaje: 'Error Al traer los cumpleaños'});
  }
};
const crearCumple = async (req, res) => {
  const {usuarioId} = req;
  const {fechaCumple, nombre, apellido} = req.body;
  const {edad, diasAlCumple} = actualizarCumple(fechaCumple);
  try {
    if (!usuarioId) {
      res.status(403).json({mensaje: 'Vuelve a iniciar sesión'});
    } else {
      const nuevoCumple = await Cumple.create({
        createdBy: usuarioId,
        createdAt: Date.now(),
        fechaCumple,
        nombre,
        apellido,
        edad,
        diasAlCumple,
      });
      if (!nuevoCumple) {
        throw new Error('Error Al crear el usuario, throw');
      } else {
        await Usuario.findByIdAndUpdate(
          {_id: usuarioId},
          {$push: {cumples: nuevoCumple._id}},
        );
        res.status(201).json({mensaje: 'Cumpleaños creado correctamente'});
      }
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({mensaje: 'Error al crear el cumpleaños'});
  }
};
const modificarCumple = async (req, res) => {
  const {usuarioId} = req;
  const {cumpleId} = req.params;
  try {
    if (!usuarioId) {
      res.status(403).json({mensaje: 'Vuelve a iniciar sesión'});
    } else {
      const cumpleModificado = await Cumple.findOneAndUpdate(
        {
          _id: cumpleId,
          activated: true,
        },
        {
          ...req.body,
        },
        {new: true},
      );
      if (!cumpleModificado) {
        throw new Error('Error Al modificar el cumpleaños, throw');
      } else {
        res.status(200).json({mensaje: 'Se ha modificado el cumpleaños'});
      }
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({mensaje: 'Error Al modificar el cumpleaños'});
  }
};
const desactivarCumple = async (req, res) => {
  const {usuarioId} = req;
  const {cumpleId} = req.params;
  try {
    if (!usuarioId) {
      res.status(403).json({mensaje: 'Vuelve a iniciar sesión'});
    } else {
      const cumpleDesactivado = await Cumple.findOneAndUpdate(
        {
          _id: cumpleId,
          activated: true,
        },
        {
          activated: false,
        },
        {new: true},
      );
      if (!cumpleDesactivado) {
        throw new Error('Error Al eliminar el cumpleaños, throw');
      } else {
        res.status(200).json({mensaeje: 'Cumpleaños eliminado'});
      }
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({mensaje: 'Error Al eliminar el cumpleaños'});
  }
};

const actualizarCumple = (fechaCumple) => {
  const hoy = moment(Date.now()).format('YYYY-MM-DD');
  const edad = moment(hoy).diff(fechaCumple, 'years');

  let siguienteCumple = moment(fechaCumple).add(edad, 'years');
  moment(siguienteCumple).format('YYYY-MM-DD');

  siguienteCumple = moment(fechaCumple).add(edad + 1, 'years');
  const diasAlCumple = siguienteCumple.diff(hoy, 'days');
  return {edad, diasAlCumple};
};

module.exports = {
  hola,
  traerUnCumple,
  traerCumples,
  crearCumple,
  modificarCumple,
  desactivarCumple,
};
