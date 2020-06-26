import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../modelo/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { Router, ActivatedRoute, Params, RouterLink } from '@angular/router';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  
  public usuarioRegistro : Usuario;
  public identidad;

  constructor(
    private usuarioServicio : UsuarioService,
    private _router : Router
  ) { 
    this.usuarioRegistro = new Usuario('','','','','','','',[],'', 312000000,'',true); 
  }

  ngOnInit(): void {
  }

  registrarUsuario(){
    this.usuarioServicio.Registro(this.usuarioRegistro).subscribe(
        (response : any)=>{
            let usuario = response.usuario;
            let mensaje = response.message;
            this.usuarioRegistro = usuario;
            if(!this.usuarioRegistro){
               alert(mensaje);
                this.usuarioRegistro = new Usuario('','','','','','','',[],'', 312000000,'',true); 
            }else {
               alert(mensaje);
                this.usuarioRegistro = new Usuario('','','','','','','',[],'', 312000000,'',true); 
                this._router.navigate(['/'])
            }
        },
        error =>{
            var errorMensaje = <any>error;
            if(errorMensaje != null){
               console.log(errorMensaje);
            }
        }
    )

}

}
