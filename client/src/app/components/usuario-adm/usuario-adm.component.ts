import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../modelo/usuario';
import {UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuario-adm',
  templateUrl: './usuario-adm.component.html',
  styleUrls: ['./usuario-adm.component.css']
})
export class UsuarioAdmComponent implements OnInit {
  public usuario : Usuario; 
  public busquedaUsuario : Usuario;
  public url : String
  constructor(private usuarioService : UsuarioService) { 
    this.usuario = new Usuario("","","","","","","",[],"",0,"",true);
    this.url = usuarioService.url;
  }

  ngOnInit(): void {
    
  }

  buscarUsuario(){
    this.usuarioService.buscarUsuario(this.usuario).subscribe(
      (response : any)=>{
        let usuarioE = response.usuario;
        let mensaje = response.message;
        console.log(usuarioE)
        if(usuarioE){  
          alert(mensaje)       
          localStorage.setItem('usuarioEncontrado', JSON.stringify(response.usuario));
          this.usuario = {_id : usuarioE.id, imagen : usuarioE.imagen, nombre: usuarioE.nombre,
          apellido: usuarioE.apellido, correo: usuarioE.correo, contrasena : usuarioE.contrasena,
          rol : usuarioE.rol, compras : usuarioE.compras, direccion : usuarioE.direccion,
           celular: usuarioE.celular,suscripcion : usuarioE.suscripcion, estado : usuarioE.estado }
            
        }else{
          alert("no se encontraron concidencias");           
        }
      })
  }

  actualizar(){
    let usuarioId = JSON.parse(localStorage.getItem('usuarioEncontrado'));
    this.usuarioService.actualizar(usuarioId._id,this.usuario).subscribe(
      (response : any)=>{
        let respuesta = response.usario;
        let mensaje = response.message;
        if(respuesta){
          alert(mensaje)
        }else{
          alert(mensaje)
        }
      })
  }

}
