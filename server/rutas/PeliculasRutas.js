const express = require('express');
const PeliculaControl = require('../control/PeliculaControl');

const multipart = require('connect-multiparty');

const subirArchivo = multipart({uploadDir : './archivos/peliculas'});

var api = express.Router();

api.post('/nuevaPelicula',PeliculaControl.peliculaNueva);
api.put('/actualizarPelicula/:id', PeliculaControl.actualizarPelicula);



module.exports = api;