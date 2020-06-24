const Pelicula = require('../modelo/pelicula');
const fs = require('fs');
const path = require('path');

function peliculaNueva(req,res){

  var parametros = req.body;
  var pelicula = new Pelicula();
  var titPelicula = parametros.titulo;

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
  pelicula.estado = parametros.estado;

  pelicula.save((err, nuevaPelicula)=>{
    if(err){
        res.status(500).send({message : "Error de servidor"});
    } else{
        if(!nuevaPelicula){
            res.status(200).send({message : "Los datos son incorrectos, porfavor vuelva a intentar"}); 
        } else {
            res.status(200).send({
                message : "Pelicula nueva, guarda en la base de datos",
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
                res.status(200).send({message : 'No se pudo actualizar la pelicula'});
            } else {
                res.status(200).send({
                    message : "La pelicula ha sido actualizada",
                    pelicula : encontrarPelicula
                })
            }
        }
    })

}

function subirDocumento(req,res){
    var idPelicula = req.params.id;
    var campo = req.body.tipo;
    var nombreArchivo = "no has subido un archivo";

    if(req.file){
        var rutaArchivo = req.files.canciones.path;     
        var partirArchivo = rutaArchivo.split('\\');
        var nombreArchivo = partirArchivo[2];
        var extencionMu = nombreArchivo.split('\.');
        var extencionArchivo = extencionMu[1];
        if(campo == 'caratula'){
            if(extencionArchivo == 'png' || extencionArchivo == 'jpg' || extencionArchivo == 'jpeg'){
                Pelicula.findByIdAndUpdate(idPelicula, {caratula : nombreArchivo},(err,caratulaNueva)=>{
                    if(err){
                        res.status(500).send({message : 'Error en el servidor'});
                    }else {
                        if(!caratulaNueva){
                            res.status(200).send({message : 'No se pudo cargar la caratula'});
                        } else {
                            res.status(200).send({
                                message : 'ya tienes una caratula',
                                pelicula : caratulaNueva
                            })
                        }
                    }
                })
        }
        } else if(campo = 'trailer'){
            if(extencionArchivo == 'mp4' || extencionArchivo == 'mkv' || extencionArchivo == 'avi'){
                Pelicula.findByIdAndUpdate(idPelicula, {linkTrailer : nombreArchivo},(err, trailer)=>{
                    if(err){
                        res.status(500).send({message : 'Error en el servidor'});
                    } else {
                        if(!trailer){
                            res.status(200).send({message : 'No se pudo cargar el trailer'});
                        } else{
                            res.status(200).send({
                                message : 'Se guardo el trailer',
                                pelicula : trailer
                            })
                        }
                    }
                })
            }
        } else if(campo == 'pelicula'){
            Pelicula.findByIdAndUpdate(idPelicula, {linkPelicula : nombreArchivo},(err, pelicula)=>{
                if(err){
                    res.status(500).send({message : 'Error en el servidor'});
                } else {
                    if(!pelicula){
                        res.status(200).send({message : 'No se pudo cargar el trailer'});
                    } else{
                        res.status(200).send({
                            message : 'Se guardo el trailer',
                            pelicula : pelicula
                        })
                    }
                }
            })

        } else{
            res.status(200).send({message : 'no se encontraon concidencias en el documento'});
        }

    }

}

function buscarPelicula(){

}

module.exports = {
    peliculaNueva,
    actualizarPelicula,
    subirDocumento
}