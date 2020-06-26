const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var PeliculaSchema = new Schema({
    titulo : String,
    director : String,
    linkTrailer : String,
    linkPelicula : String,
    cartelera : String,
    sinopsis : String,
    clasificacion : String,
    fechaEstreno : String,
    puntuacion : Number,
    tiempo : String,
    calidad : String,
    tipo : String,
    estado : Boolean    
});
module.exports = mongoose.model('Pelicula', PeliculaSchema);