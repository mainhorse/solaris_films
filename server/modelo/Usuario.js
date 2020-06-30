const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var UsuarioSchema = new Schema({
    imagen : String,
    nombre : String,
    apellido : String,
    correo : String,
    contrasena : String,
    rol : String,
    compras : Array,
    direccion : String,
    celular : Number,
    suscripcion : Date,    
    estado : Boolean
});

module.exports = mongoose.model('Usuario', UsuarioSchema);