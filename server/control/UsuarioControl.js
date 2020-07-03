const Usuario = require('../modelo/usuario');
const fs = require('fs');
const path = require('path');
const configMensaje = require('../configMensaje')
function NuevoUsuario(req,res){
    var usuario = new Usuario();
    var parametros = req.body;
    usuario.imagen = parametros.imagen;
    usuario.nombre = parametros.nombre;
    usuario.apellido = parametros.apellido;
    usuario.correo = parametros.correo;
    usuario.contrasena = parametros.contrasena;
    usuario.rol = parametros.rol;
    usuario.compras = parametros.compras;
    usuario.direccion = parametros.direccion;
    usuario.telefono = parametros.celular;
    usuario.subscripcion = parametros.subscripcion;
    usuario.estado = parametros.estado;
    if(usuario.correo != '' || usuario.contrasena != ''){
            Usuario.findOne({correo : usuario.correo}, (err, usuarioNuevo)=>{
                if(err){
                    res.status(500).send({message : "Error en el servidor"});
                } else {
                    if(usuarioNuevo){
                        res.status(200).send({message : "Datos inválidos"});
                    } else if(!usuarioNuevo){
                        usuario.save((err, registro)=>{
                            if(err){
                                res.status(500).send({message : "Error en el servidor"});
                            } else{
                                if(!registro){
                                    res.status(200).send({message : "Datos inválidos"});
                                } else{
                                    res.status(200).send({
                                        message : "Registro exitoso",
                                        usuario : registro
                                    });
                                }
                            }
                        })
                    }
                }
            },)
    } 
    else {
        res.status(200).send({message : "Hubo un error en tu ingreso, vuelve a intentar"});
    }
}

function Ingresar(req,res){
    var parametros = req.body;
    var correoB = parametros.correo;
    var contrasenaB = parametros.contrasena;

    Usuario.findOne({correo : correoB, contrasena : contrasenaB},(err,buscarUsuario)=>{
        if(err){
            res.status(500).send({message : "Error del servidor"});
        } else{
            if(!buscarUsuario){
                res.status(200).send({message: "No estás registrado"});
            } else{
                res.status(200).send({
                    message : "Ingreso",
                    usuario : buscarUsuario
                })
            }
        }
    })
}

function ModificarDatos(req,res){
    var idUsuario = req.params.id;
    var datos = req.body;
        Usuario.findByIdAndUpdate(idUsuario,datos, (err, usuarioActualizado)=>{
            if(err){
                res.status(500).send({message : "Error en el servidor"});
            } else {
                if(!usuarioActualizado){
                    res.status(200).send({message : "No se pudo actualizar tus datos"});
                } else {
                    Usuario.findById(idUsuario,(err, actualizacion)=>{
                        res.status(200).send({
                            message : "Datos actualizados",
                            usuario : actualizacion
                        })
                    })
                   
                }
            }
        })
       
  
}

function subirFoto(req,res){
    var idUsuario = req.params.id;
    if (req.files) {        
        var rutaArchivo = req.files.imagen.path;
        var partirArchivo = rutaArchivo.split('\\');
        var nombreArchivo = partirArchivo[2];
        var extensionImg = nombreArchivo.split('\.');
        var extensionArchivo = extensionImg[1];
        if(extensionArchivo == 'png' || extensionArchivo == 'jpg' || extensionArchivo == 'jpeg' ){
            Usuario.findByIdAndUpdate(idUsuario, {imagen : nombreArchivo}, (err, fotoActualizada)=>{
                if(err){
                    res.status(200).send({message : "Error en el servidor"})
                } else{
                    if(!fotoActualizada){
                        res.status(200).send({message : "No se pudo actualizar la foto de perfil"})
                    }else{
                        res.status(200).send({
                            message: "Foto actualizada",
                            usuario : fotoActualizada
                        })
                    }
                }
            })
        }
    } else {
        res.status(200).send({message : "No subiste una foto de perfil"});
    }
}

function mostrarArchivo(req, res) {
    // pedir el archivo que queremos mostrar

    var archivo = req.params.imageFile;
    // Ubicacion del archivo
    var ruta = './archivos/usuario/' + archivo;

    // validar si existe o no
    // fs.exists('la ruta del archivo'. (exiate)=>{})
    fs.exists(ruta, (exist) => {
        if (exist) {
            res.sendFile(path.resolve(ruta));
        } else {
            res.status(200).send({ message: "Imagen no encontrada" });
        }
    })
}

function buscarUsuario(req,res){
    correoUsuario = req.body.correo;
    console.log(correoUsuario);
    Usuario.findOne({correo : correoUsuario},(err, buscarUsuario)=>{
        if(err){
            res.status(500).send({message : "Error en el servidor"})
        } else {
            if(!buscarUsuario){
                res.status(200).send({message : "No tenemos registrado a ningún usuario con ese correo"})
            } else if(buscarUsuario){
                res.status(200).send({
                    message : "Se encontró un usuario con ese correo",
                    usuario  : buscarUsuario
                })
            }
        }
    })

}

function formulario(req,res){
    configMensaje(req.body);
    res.status(200).send();
}


module.exports = {
    NuevoUsuario,
    Ingresar,
    ModificarDatos,
    subirFoto,
    mostrarArchivo,
    buscarUsuario,
    formulario
}