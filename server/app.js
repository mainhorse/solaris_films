const express = require('express');
const app = express();
const cors = require('cors');

const usuarioRutas = require('./rutas/UsuarioRutas');

app.use(express.json());
app.use(cors());

app.use('/api',usuarioRutas);







module.exports = app;