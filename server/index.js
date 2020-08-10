const express = require('express');
const mongoose = require('mongoose');

const app = express();

const PORT = process.env.PORT_CUMPLE || 8081;

//importar rutas a usar
const userRoutes = require('./routes/userRoute');
const cumpleRoutes = require('./routes/cumpleRoute');
const {default: URL} = require('../utils/secretos');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
//rutas
app.use('/', userRoutes);
app.use('/cumple', cumpleRoutes);

mongoose.connect(
  URL,
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
