import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { CargarScriptService } from "../../services/cargarScript.service";
import { Usuario } from '../../modelo/usuario';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  public usuario : Usuario;
  public archivoSubir : File;
  public url : String;
  constructor( private usuarioService : UsuarioService ,
               private _CargaScripts: CargarScriptService) {
               _CargaScripts.Carga(["header"]);
               this.url = usuarioService.url;
  }

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('sesion'));  
  }

  subirArchivo(fileInput : any){
    this.archivoSubir = <File>fileInput.target.files[0];
   }
  actualizarDatos(){
    
    this.usuarioService.actualizar(this.usuario._id, this.usuario).subscribe(
      (response : any)=>{
        let respuesta = response.usuario;
        let mensaje = response.message;
        if(!respuesta){
          alert(mensaje)
        } else{
          alert(mensaje);
          localStorage.setItem('sesion', JSON.stringify(respuesta));        
        }
      });
      if(!this.archivoSubir){
        alert("No has subido una imagen");
      } else{
        this.usuarioService.cargarImagenUsuario(this.archivoSubir, this.usuario._id).subscribe(
          (response : any)=>{
            let respuesta = response.usuario;
            let mensaje = response.message;
            if(!respuesta){
              alert(mensaje);
            } else{
              alert(mensaje);
              let img = this.url + 'mostrarFoto/' + this.usuario.imagen;
              document.getElementById('fotoUsu').setAttribute('src', img);
            }
          })
      }
    
  }

  cerrar(){
    localStorage.clear();
    window.location.reload();
  }

  home(){
    localStorage.setItem("pagina","home");
    window.location.reload();
  }
  
  comida(){
    localStorage.setItem("pagina","comida");
    window.location.reload();
  }

  contacto(){
    localStorage.setItem("pagina","nosotros");
    window.location.reload()
  }

}
