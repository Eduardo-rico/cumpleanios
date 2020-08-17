const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

const PORT = process.env.PORT_CUMPLE || 5256;

//importar rutas a usar
const userRoutes = require('./routes/userRoute');
const cumpleRoutes = require('./routes/cumpleRoute');
const URLMONGO = require('../utils/secretos');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan('dev'));
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
      console.log(
        `Se está escuchando en http://localhost:${PORT} o bien http://10.0.2.2:${PORT}`,
      );
    });
    if (err) {
      console.log(err);
    }
  },
);
