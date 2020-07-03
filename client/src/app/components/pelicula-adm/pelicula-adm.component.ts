import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../../modelo/pelicula';
import { PeliculasService} from '../../services/peliculas.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-pelicula-adm',
  templateUrl: './pelicula-adm.component.html',
  styleUrls: ['./pelicula-adm.component.css']
})
export class PeliculaAdmComponent implements OnInit {
  public pelicula : Pelicula;
  public archivoSubir : File;
  public url : String;
  constructor(
    private peliculaService : PeliculasService,
  ) { 
    this.url =  peliculaService.url;  
    this.pelicula = new Pelicula("",0,"","","","","","","","",0,"","","","",true);
  }

ngOnInit(): void {
  
}

nuevaPelicula(){
    this.peliculaService.PeliculaNueva(this.pelicula).subscribe(
      (response : any)=> {
        let resultado = response.pelicula;
        let mensaje = response.message;
       if(!resultado){
         alert(mensaje);
       } else{
         localStorage.setItem('pelicula',JSON.stringify(resultado));
         this.pelicula = JSON.parse(localStorage.getItem('pelicula'));
         Swal.fire({
          title: 'Excelente, tu nueva película ha sido agregada',
          text: `Continua subiendo los archivos`,
          imageUrl: '../../assets/universoColores.jpg',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image', 
          confirmButtonColor: '#F76363',
          backdrop: ` rgba(0,0,0,0.5) left top no-repeat`
        }).finally;;
         
       }
      },error =>{
        var errorMensaje = <any>error;
        if(errorMensaje != null){
          console.log(errorMensaje);
        }
      }
      )
}

subirArchivo(fileInput : any){
  this.archivoSubir = <File>fileInput.target.files[0];
}    

subirPelicula(){
  let peliculaId = JSON.parse(localStorage.getItem('pelicula'));
  this.pelicula._id = peliculaId._id;
  this.peliculaService.ArchivoNuevo(this.archivoSubir, this.pelicula._id, this.pelicula.tipo).subscribe(
    (response : any)=>{
      let respuesta = response.pelicula;
      let mensaje = response.message;
      if(!respuesta){
        Swal.fire({
          title: `Lo sentimos ,${mensaje}`,
          text: `Intenta más tarde`,
          imageUrl: '../../assets/universoColores.jpg',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image', 
          confirmButtonColor: '#F76363',
          backdrop: ` rgba(0,0,0,0.5) left top no-repeat`
        }).finally;;
      } else {
        this.pelicula = JSON.parse(localStorage.getItem('pelicula'));
        this.pelicula = respuesta; 
        localStorage.setItem('pelicula',JSON.stringify(respuesta));
        Swal.fire({
          title: `Excelente, ${mensaje}`,
          text: `¿Qué más sigue? !`,
          imageUrl: '../../assets/universoColores.jpg',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image', 
          confirmButtonColor: '#F76363',
          backdrop: ` rgba(0,0,0,0.5) left top no-repeat`
        }).finally;;
        let rutaImg = this.url + 'caratula/' + this.pelicula.cartelera;
        document.getElementById('fondoCartelera').setAttribute("style", "background-image: url('" + this.url + 'caratula/' + this.pelicula.cartelera + "'); width: 100%; height: 100%");
        document.getElementById('cartelera').setAttribute('src', rutaImg);
      }

    }, error =>{
      let errormensaje = <any>error;
      if(errormensaje != null){
        console.log(errormensaje);
      }
    }
    )

}

actualizarPelicula(){
  let peliculaId = JSON.parse(localStorage.getItem('pelicula'));
  this.pelicula._id = peliculaId._id;
    this.peliculaService.ActualizarPelicula(this.pelicula._id,this.pelicula).subscribe((response : any)=>{
      let respuesta = response.pelicula;
      let mensaje = response.message;
    if(!respuesta){
      alert(mensaje);
    } else{
      localStorage.setItem('pelicula',JSON.stringify(respuesta));
      Swal.fire({
        title: `Excelente `,
        text: `Se han actualizado los datos de tu película`,
        imageUrl: '../../assets/universoColores.jpg',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image', 
        confirmButtonColor: '#F76363',
        backdrop: ` rgba(0,0,0,0.5) left top no-repeat`
      }).finally;;
    }
    }, error =>{
      let errorMensaje = <any>error;
      if(errorMensaje != null){
        console.log(errorMensaje);
      }
    })
}

buscarPeliculas(){
  this.peliculaService.buscarPeliculasAdm(this.pelicula).subscribe(
    (response : any)=>{
      let respuesta = response.pelicula;
      let mensaje = response.message;
      if(respuesta && respuesta.length != 0){ 
        localStorage.setItem('pelicula',JSON.stringify(respuesta));
        this.pelicula = {_id : respuesta.id , numPelicula : respuesta.numPelicula , titulo : respuesta.titulo , director : respuesta.director,
        linkTrailer : respuesta.linkTrailer, linkPelicula : respuesta.linkPelicula , cartelera : respuesta.cartelera,
        sinopsis : respuesta.sinopsis, clasificacion : respuesta.clasificacion , fechaEstreno : respuesta.fechaEstreno,
        puntuacion : respuesta.puntuacion, tiempo:respuesta.tiempo, calidad : respuesta.calidad, tipo : respuesta.tipo,
        busqueda: respuesta.busqueda , estado : respuesta.estado}
        Swal.fire({
          title: `Excelente `,
          text: `Se ha encontrado la película`,
          imageUrl: '../../assets/universoColores.jpg',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image', 
          confirmButtonColor: '#F76363',
          backdrop: ` rgba(0,0,0,0.5) left top no-repeat`
        }).finally;;
      } else {        
        alert(mensaje)
      }
    })
}

eliminarPelicula(){
  let peliculaId = JSON.parse(localStorage.getItem('pelicula'));
  this.pelicula._id = peliculaId._id;
  this.peliculaService.eliminarPelicula(this.pelicula._id).subscribe((response : any)=>{
    let eliPelicula = response.pelicula;
    let mensaje = response.message;
    if(!eliPelicula){
      alert(mensaje)
    } else {
      Swal.fire({
        title: `Adiós película! `,
        text: `Se ha eliminado la película de nuestra base de datos`,
        imageUrl: '../../assets/universoColores.jpg',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image', 
        confirmButtonColor: '#F76363',
        backdrop: ` rgba(0,0,0,0.5) left top no-repeat`
      }).finally;;
    }
  }, error =>{
    let errorMensaje = <any>error;
    if(errorMensaje =! null){
      console.log(errorMensaje);
    }
  }

    )
}
}
