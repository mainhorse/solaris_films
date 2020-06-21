const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UsuarioSchema = new Schema({
    imagen : String,
    nombre : String,
    apellido : String,
    correo : String,
    contrasena : String,
    rol : String,
    compras : String,
    direccion : String,
    celular : Number,
    subscripcion : Date,    
    estado : Boolean
});

module.exports = moongose.model('Usuario', UsuarioSchema);

