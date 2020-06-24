const express = require('express');
const app = express();
const cors = require('cors');

const usuarioRutas = require('./rutas/UsuarioRutas');
const peliculasRutas = require('./rutas/PeliculasRutas');

app.use(express.json());
app.use(cors());

app.use('/api',usuarioRutas);
app.use('/api',peliculasRutas);







module.exports = app;