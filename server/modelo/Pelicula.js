const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var PeliculaSchema = new Schema({
    titulo : String,
    director : String,
    linkTrailer : String,
    linkPelicula : String,
    sinopsis : String,
    clasificacion : String,
    fechaEstreno : String,
    hora : String,
    salas : Array,
    estado : Boolean
});

module.exports = mongoose.model('Pelicula', PeliculaSchema);