const Pelicula = require('../modelo/pelicula');
const fs = require('fs');
const path = require('path');

function peliculaNueva(req,res){

  var parametros = req.body;
  var pelicula = new Pelicula();
  var titPelicula = parametros.titulo;
  
  pelicula.numPelicula = parametros.numPelicula;
  pelicula.titulo = titPelicula.toLowerCase();
  pelicula.director = parametros.director;
  pelicula.linkTrailer = parametros.linkTrailer;
  pelicula.linkPelicula = parametros.linkPelicula;
  pelicula.cartelera = parametros.cartelera;
  pelicula.sinopsis = parametros.sinopsis;
  pelicula.clasificacion = parametros.clasificacion;
  pelicula.fechaEstreno = parametros.fechaEstreno;
  pelicula.puntuacion = parametros.puntuacion;
  pelicula.tiempo = parametros.tiempo;
  pelicula.calidad = parametros.calidad;
  pelicula.tipo = parametros.tipo;
  pelicula.busqueda = parametros.busqueda;
  pelicula.estado = parametros.estado;

  pelicula.save((err, nuevaPelicula)=>{
    if(err){
        res.status(500).send({message : "Error de servidor"});
    } else{
        if(!nuevaPelicula){
            res.status(200).send({message : "Los datos son incorrectos, porfavor vuelva a intentar"}); 
        } else {
            res.status(200).send({
                message : "Película nueva, guarda en la base de datos",
                pelicula : nuevaPelicula
            });
        }
    }
  });
}

function actualizarPelicula(req,res){
    id = req.params.id;
    datos = req.body;

    Pelicula.findByIdAndUpdate(id, datos , (err, encontrarPelicula)=>{
        if(err){
            res.status(500).send({message : 'Error en el servidor'});
        } else{
            if(!encontrarPelicula){
                res.status(200).send({message : 'No se pudo actualizar la película'});
            } else {
                res.status(200).send({
                    message : "La película ha sido actualizada",
                    pelicula : encontrarPelicula
                })
            }
        }
    })

}

function subirArchivo(req,res){
    var idPelicula = req.params.id;
    var campo = req.body.tipo;
    var nombreArchivo = "No has subido un archivo";

    if(req.files){
        var rutaArchivo = req.files.archivos.path;    
        var partirArchivo = rutaArchivo.split('\\');
        var nombreArchivo = partirArchivo[2];
        var extencionMu = nombreArchivo.split('\.');
        var extencionArchivo = extencionMu[1];
        if(campo == 'cartelera'){
            if(extencionArchivo == 'png' || extencionArchivo == 'jpg' || extencionArchivo == 'jpeg'){
                Pelicula.findByIdAndUpdate(idPelicula, {cartelera : nombreArchivo},(err,caratulaNueva)=>{
                    if(err){
                        res.status(500).send({message : 'Error en el servidor'});
                    }else {
                        if(!caratulaNueva){
                            res.status(200).send({message : 'No se pudo cargar la cartelera'});
                        } else {
                            res.status(200).send({
                                message : 'Ya tienes una cartelera',
                                pelicula : caratulaNueva
                            })
                        }
                    }
                })
        }
        } else if(campo == 'trailer'){
            if(extencionArchivo == 'mp4' || extencionArchivo == 'mov' || extencionArchivo == 'avi'){
                Pelicula.findByIdAndUpdate(idPelicula, {linkTrailer : nombreArchivo},(err, trailer)=>{
                    if(err){
                        res.status(500).send({message : 'Error en el servidor'});
                    } else {
                        if(!trailer){
                            res.status(200).send({message : 'No se pudo cargar el tráiler'});
                        } else{
                            res.status(200).send({
                                message : 'Se guardó el tráiler',
                                pelicula : trailer
                            })
                        }
                    }
                })
            }
        } else if(campo == 'pelicula'){
            if(extencionArchivo == 'mp4' || extencionArchivo == 'mov' || extencionArchivo == 'avi'){
            Pelicula.findByIdAndUpdate(idPelicula, {linkPelicula : nombreArchivo},(err, pelicula)=>{
                if(err){
                    res.status(500).send({message : 'Error en el servidor'});
                } else {
                    if(!pelicula){
                        res.status(200).send({message : 'No se pudo cargar el tráiler'});
                    } else{
                        res.status(200).send({
                            message : 'Se guardó la película',
                            pelicula : pelicula
                        })
                    }
                }
            })
        }

        } else{
            res.status(200).send({message : 'No se encontraron concidencias en el documento'});
        }

    }

}

function buscarPelicula(req,res){
    // pedir el archivo que queremos mostrar
    var archivo = req.params.archivos;
    // Ubicacion del archivo
    var ruta = './archivos/peliculas/' + archivo;
    // validar si existe o no
    // fs.exists('la ruta del archivo'. (existe)=>{})
    fs.exists(ruta,(exist)=>{
        if(exist){
            res.sendFile(path.resolve(ruta));
        } else{
            res.status(200).send({message: "Película no encontrada"});
        }
    })
}

function mostrarArchivo(req, res){
    // pedir el archivo que queremos mostrar

    var archivo = req.params.imageFile;
    console.log(`La caratula es : ${archivo}`);
    // Ubicacion del archivo
    var ruta = './archivos/peliculas/' + archivo;

    // validar si existe o no
    // fs.exists('la ruta del archivo'. (existe)=>{})
    fs.exists(ruta,(exist)=>{
        if(exist){
            res.sendFile(path.resolve(ruta));
        } else{
            res.status(200).send({message: "Cartelera no encontrada"});
        }
    })
}

function buscarPeliculas(req, res){
    let parametros = req.body;
    let busquedaPelicula = parametros.busqueda.toLowerCase();
    if(busquedaPelicula != undefined || busquedaPelicula != null){
        Pelicula.findOne({ titulo : { $regex: '.*' + busquedaPelicula + '.*'}}, (err, peliculaEncontrada)=>{
            if(err){
                res.status(500).send({message : "Error en el servidor"});
            } else{
                if(!peliculaEncontrada){
                    res.status(200).send({message : "No se encontraron concidencias"});
                } else{
                    if(peliculaEncontrada.length == 0){
                        res.status(200).send({message : 'No se encontraron resultados'})
                    } else if(peliculaEncontrada.length != 0){
                        res.status(200).send({
                            message : "Se encontró una película",
                            pelicula : peliculaEncontrada
                        
                    });
                    }
                }
            }
        })
    } 
   
}

function buscarTodasPeliculas(req, res){
    Pelicula.find((err, todasPeliculas)=>{
        if(err){
            res.status(500).send({message : "Error en el servidor"});
        } else {
            if(!todasPeliculas){
                res.status(200).send({message : "no se encontraron peliculas"})
            } else{
                res.status(200).send({
                    message : "todas las peliculas",
                    peliculas : todasPeliculas
                })
            }
        }
    })
}

function eliminarPelicula(req,res){
    let id = req.params.id;
    Pelicula.findByIdAndDelete(id,(err, peliculaEliminada)=>{
        if(err){
            res.status(500).send({ message : 'Error en el servidor'});
        }else {
            if(!peliculaEliminada){
                res.status(200).send({message: "No se pudo eliminar la película"});
            } else{
                res.status(200).send({
                    message : 'Película eliminada',
                    pelicula : peliculaEliminada
                })
            }
        }
    }, err =>{
        let errorMensaje = err
            if(errorMensaje != null){
                console.log(errorMensaje)
            }
    })
}

module.exports = {
    peliculaNueva,
    actualizarPelicula,
    subirArchivo,
    mostrarArchivo,
    buscarPelicula,
    buscarPeliculas, 
    eliminarPelicula,
    buscarTodasPeliculas
}