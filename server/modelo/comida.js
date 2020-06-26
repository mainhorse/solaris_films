const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ComidaSchema = new Schema({
    titulo : String,
    imagen : String,
    precio : String,
    ingredientes : String,
    estado : Boolean
});

module.exports = mongoose.model('Comida', ComidaSchema);