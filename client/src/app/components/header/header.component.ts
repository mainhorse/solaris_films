import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { CargarScriptService } from "../../services/cargarScript.service";
import { Usuario } from '../../modelo/usuario';
import { Pelicula } from '../../modelo/pelicula';
import { PeliculasService } from '../../services/peliculas.service';

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
  public urlDos: String;

  constructor(private usuarioService: UsuarioService,
    private _CargaScripts: CargarScriptService,
    private peliculaService: PeliculasService) {

    _CargaScripts.Carga(["header"]);
    this.url = usuarioService.url;
    this.urlDos = peliculaService.url;

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
          alert(mensaje)
        } else {
          alert(mensaje);
          localStorage.setItem('sesion', JSON.stringify(respuesta));
        }
      });
    if (!this.archivoSubir) {
      alert("No has subido una imagen");
    } else {
      this.usuarioService.cargarImagenUsuario(this.archivoSubir, this.usuario._id).subscribe(
        (response: any) => {
          let respuesta = response.usuario;
          let mensaje = response.message;
          if (!respuesta) {
            alert(mensaje);
          } else {
            alert(mensaje);
            let img = this.url + 'mostrarFoto/' + this.usuario.imagen;
            document.getElementById('fotoUsu').setAttribute('src', img);
          }
        })
    }

  }

  buscarPeliculas() {
    alert("xd")
    this.peliculaService.buscarPeliculasAdm(this.pelicula).subscribe(
      (response: any) => {
        let respuesta = response.pelicula;
        let mensaje = response.message;
        if (respuesta && respuesta.length != 0) {
          localStorage.setItem('pelicula', JSON.stringify(respuesta));
          this.pelicula = {
            _id: respuesta.id, titulo: respuesta.titulo, director: respuesta.director,
            linkTrailer: respuesta.linkTrailer, linkPelicula: respuesta.linkPelicula, cartelera: respuesta.cartelera,
            sinopsis: respuesta.sinopsis, clasificacion: respuesta.clasificacion, fechaEstreno: respuesta.fechaEstreno,
            puntuacion: respuesta.puntuacion, tiempo: respuesta.tiempo, calidad: respuesta.calidad, tipo: respuesta.tipo,
            busqueda: respuesta.busqueda, estado: respuesta.estado
          }
          alert(mensaje);
        } else {
          alert(mensaje)
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
}


