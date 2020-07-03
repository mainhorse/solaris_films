import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../modelo/usuario';
import {UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
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
          Swal.fire({
            title: `Excelente `,
            text: `Se ha encontrado el usuario`,
            imageUrl: '../../assets/universoColores.jpg',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image', 
            confirmButtonColor: '#F76363',
            backdrop: ` rgba(0,0,0,0.5) left top no-repeat`
          }).finally;;     
          localStorage.setItem('usuarioEncontrado', JSON.stringify(response.usuario));
          this.usuario = {_id : usuarioE.id, imagen : usuarioE.imagen, nombre: usuarioE.nombre,
          apellido: usuarioE.apellido, correo: usuarioE.correo, contrasena : usuarioE.contrasena,
          rol : usuarioE.rol, compras : usuarioE.compras, direccion : usuarioE.direccion,
           celular: usuarioE.celular,suscripcion : usuarioE.suscripcion, estado : usuarioE.estado }
            
        }else{
          Swal.fire({
            title: `Error`,
            text: `No se ha encontrado el usuario`,
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

  actualizar(){
    let usuarioId = JSON.parse(localStorage.getItem('usuarioEncontrado'));
    this.usuarioService.actualizar(usuarioId._id,this.usuario).subscribe(
      (response : any)=>{
        let respuesta = response.usario;
        let mensaje = response.message;
        if(respuesta){
          Swal.fire({
            title: `Error!`,
            text: `${mensaje}`,
            imageUrl: '../../assets/universoColores.jpg',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image', 
            confirmButtonColor: '#F76363',
            backdrop: ` rgba(0,0,0,0.5) left top no-repeat`
          }).finally;;
        }else{
          Swal.fire({
            title: `Genial!`,
            text: `${mensaje}`,
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

}
