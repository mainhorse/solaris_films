import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { CargarScriptService } from "../../services/cargarScript.service";
import { Usuario } from '../../modelo/usuario';
import { Pelicula } from '../../modelo/pelicula';
import { PeliculasService } from '../../services/peliculas.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  public usuario: Usuario;
  public archivoSubir: File;
  public url: String;
  public pelicula: Pelicula;
  
  constructor(private usuarioService: UsuarioService,
    private _CargaScripts: CargarScriptService,
    private peliculaService: PeliculasService) {

    _CargaScripts.Carga(["header"]);
    this.url = usuarioService.url;
    this.pelicula = new Pelicula("",0,"","","","","","","","",0,"","","","",true);
  }

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('sesion'));
  }

  subirArchivo(fileInput: any) {
    this.archivoSubir = <File>fileInput.target.files[0];
  }
  actualizarDatos() {

    this.usuarioService.actualizar(this.usuario._id, this.usuario).subscribe(
      (response: any) => {
        let respuesta = response.usuario;
        let mensaje = response.message;
        if (!respuesta) {
          Swal.fire({
            title: 'No se pudo actualizar tus datos',
            text: `Intenta más tarde`,
            imageUrl: '../../assets/universoColores.jpg',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image', 
            confirmButtonColor: '#F76363',
            backdrop: ` rgba(0,0,0,0.5) left top no-repeat`
          }).finally;;
        } else {
          Swal.fire({
            title: 'Datos actualizados!',
            text: `Revisa tu perfil`,
            imageUrl: '../../assets/universoColores.jpg',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image', 
            confirmButtonColor: '#F76363',
            backdrop: ` rgba(0,0,0,0.5) left top no-repeat`
          }).finally;;
          localStorage.setItem('sesion', JSON.stringify(respuesta));
        }
      });
    if (!this.archivoSubir) {
      Swal.fire({
        title: 'No Subiste una imagen',
        text: `Intenta más tarde`,
        imageUrl: '../../assets/universoColores.jpg',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image', 
        confirmButtonColor: '#F76363',
        backdrop: ` rgba(0,0,0,0.5) left top no-repeat`
      }).finally;;
    } else {
      this.usuarioService.cargarImagenUsuario(this.archivoSubir, this.usuario._id).subscribe(
        (response: any) => {
          let respuesta = response.usuario;
          let mensaje = response.message;
          if (!respuesta) {
            Swal.fire({
              title: 'Error, no se pudo cambiar la imagen',
              text: `Intenta más tarde`,
              imageUrl: '../../assets/universoColores.jpg',
              imageWidth: 400,
              imageHeight: 200,
              imageAlt: 'Custom image', 
              confirmButtonColor: '#F76363',
              backdrop: ` rgba(0,0,0,0.5) left top no-repeat`
            }).finally;;
          } else {
            Swal.fire({
              title: 'Se ha modificado la imagen',
              text: `Reinicia tu sesión`,
              imageUrl: '../../assets/universoColores.jpg',
              imageWidth: 400,
              imageHeight: 200,
              imageAlt: 'Custom image', 
              confirmButtonColor: '#F76363',
              backdrop: ` rgba(0,0,0,0.5) left top no-repeat`
            }).finally;;
            let img = this.url + 'mostrarFoto/' + this.usuario.imagen;
            document.getElementById('fotoUsu').setAttribute('src', img);
          }
        })
    }

  }

  buscarPeliculas() {
    this.peliculaService.buscarPeliculasAdm(this.pelicula).subscribe(
      (response: any) => {
        let respuesta = response.pelicula;
        let mensaje = response.message;
        let pelicula = JSON.parse(localStorage.getItem('pelicula'))
        let usuario = JSON.parse(localStorage.getItem('sesion'));
        if(usuario.rol == 'depredador' && pelicula.estado == true){
          if (respuesta && respuesta.length != 0) {
            localStorage.setItem('pelicula', JSON.stringify(respuesta));
            this.pelicula = {
              _id: respuesta.id, numPelicula : respuesta.numPelicula , titulo: respuesta.titulo, director: respuesta.director,
              linkTrailer: respuesta.linkTrailer, linkPelicula: respuesta.linkPelicula, cartelera: respuesta.cartelera,
              sinopsis: respuesta.sinopsis, clasificacion: respuesta.clasificacion, fechaEstreno: respuesta.fechaEstreno,
              puntuacion: respuesta.puntuacion, tiempo: respuesta.tiempo, calidad: respuesta.calidad, tipo: respuesta.tipo,
              busqueda: respuesta.busqueda, estado: respuesta.estado
            }
            Swal.fire({
              title: 'Película encontrada',
              text: `Disfruta la película, ¿Qué tal probar un nuevo combo depralien?`,
              imageUrl: '../../assets/universoColores.jpg',
              imageWidth: 400,
              imageHeight: 200,
              imageAlt: 'Custom image', 
              confirmButtonColor: '#F76363',
              backdrop: ` rgba(0,0,0,0.5) left top no-repeat`
            })
            this.intervalo();
          } 
        }
       else {
        Swal.fire({
          title: 'Revisa tu subscripción',
          text: `Parece que tu cuenta no puede ver películas`,
          imageUrl: '../../assets/universoColores.jpg',
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image', 
          confirmButtonColor: '#F76363',
          backdrop: ` rgba(0,0,0,0.5) left top no-repeat`
        }).finally;;
        }
      })
  }

  cerrar() {
    localStorage.clear();
    window.location.reload();
  }

  home() {
    localStorage.setItem("pagina", "usuario");
    window.location.reload();
  }

  
  comida() {
    localStorage.setItem("pagina", "comida");
    window.location.reload();
  }

  contacto() {
    localStorage.setItem("pagina", "nosotros");
    window.location.reload()
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
        window.location.reload()
        alert(mensaje);
      }
      }, error =>{
        let errorMensaje = <any>error;
        if(errorMensaje != null){
          console.log(errorMensaje);
        }
      })
  }


  intervalo(){
    setTimeout(this.recarga,6000);
  }

  recarga(){
    window.location.reload()
  }
}


