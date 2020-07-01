const express = require('express');
const app = express();
const bodyParser =require('body-parser');
const configMensaje = require('./configMensaje');

//Servidor http
//const servidor = require('http').Server(app);

//conexión y configuración principal de socket.io
//const io = require('socket.io')(servidor);
const cors = require('cors');

const usuarioRutas = require('./rutas/UsuarioRutas');
const peliculasRutas = require('./rutas/PeliculasRutas');
//const { Server } = require('http');


app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use('/api',usuarioRutas);
app.use('/api',peliculasRutas);

//const misMensajes = [];
/*
io.on('connection', function(socket){
    socket.on('enviar-mensaje', function(data){
        misMensajes.push(data);
        socket.emit('text-event', misMensajes);
        socket.broadcast.emit('text-event', misMensajes);
    })
});
*/


module.exports = app;