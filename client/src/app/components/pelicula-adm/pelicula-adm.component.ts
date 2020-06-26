import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../../modelo/pelicula';
import { PeliculasService} from '../../services/peliculas.service';
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
  caratula = 'caratula/'; 
  constructor(
    private peliculaService : PeliculasService,
  ) { 
    this.pelicula = new Pelicula("","","","","","","","","",0,"","","",true);
    this.url =  peliculaService.url; 
    
  }

  ngOnInit(): void {
    this.pelicula = JSON.parse(localStorage.getItem('pelicula'));

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
         alert('pelicula guardada');
         window.location.reload();
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
  this.peliculaService.ArchivoNuevo(this.archivoSubir, this.pelicula._id, this.pelicula.tipo).subscribe(
    (response : any)=>{
      let respuesta = response.pelicula;
      let mensaje = response.message;
      if(!respuesta){
        alert(mensaje);
      } else {
        console.log(response.cartelera); 
        this.pelicula = respuesta; 
        localStorage.setItem('pelicula',JSON.stringify(respuesta));
        alert(mensaje);
      
        //window.location.reload();
        let rutaImg = this.url + 'caratula/' + this.pelicula.cartelera;
        //document.getElementById('cartelera').setAttribute('src',rutaImg);
        document.getElementById('fondoCartelera').setAttribute("style", "background-image: url('" + this.url + 'caratula/' + this.pelicula.cartelera + "'); width: 100%; height: 100%");
    
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
    this.peliculaService.ActualizarPelicula(this.pelicula._id,this.pelicula).subscribe((response : any)=>{
      let respuesta = response.pelicula;
      let mensaje = response.message;
    if(!respuesta){
      alert(mensaje);
    } else{
      localStorage.setItem('pelicula',JSON.stringify(respuesta));
      alert(mensaje);
    }
    }, error =>{
      let errorMensaje = <any>error;
      if(errorMensaje != null){
        console.log(errorMensaje);
      }
    })
}

reproducirVideo(){

}
}
