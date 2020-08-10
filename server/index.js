const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT_CUMPLE || 5256;

//importar rutas a usar
const userRoutes = require('./routes/userRoute');
const cumpleRoutes = require('./routes/cumpleRoute');
const URLMONGO = require('../utils/secretos');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
//rutas
app.use('/', userRoutes);
app.use('/cumple', cumpleRoutes);

mongoose.connect(
  URLMONGO,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (err) => {
    app.listen(PORT, () => {
      console.log(`Se está escuchando en http://localhost:${PORT}`);
    });
    if (err) {
      console.log(err);
    }
  },
);
