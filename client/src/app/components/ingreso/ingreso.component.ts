import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../modelo/usuario';
import { Pelicula } from '../../modelo/pelicula';
import { UsuarioService } from '../../services/usuario.service';
import { Router, ActivatedRoute, Params, RouterLink } from '@angular/router';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})
export class IngresoComponent implements OnInit {

  public usuarioIngreso : Usuario;
  public pelicula : Pelicula;
  public identidad;

  constructor(
    private usuarioServicio : UsuarioService,
    private _router : Router
  ) {
    this.usuarioIngreso = new Usuario('','','','','','','usuario',[],'', 312000000,'',true); 
    this.pelicula = new Pelicula("","","","","","","","","",0,"","","",true);
   }

  ngOnInit(): void {
      
  }

  ingresoUsuario(){
    this.usuarioServicio.ingreso(this.usuarioIngreso).subscribe((response : any)=>{
        let validar = response.usuario;
        let mensaje = response.message; 
        this.usuarioIngreso = validar;
        if(!this.usuarioIngreso){
           alert(mensaje);
            this.usuarioIngreso = new Usuario('','','','','','','usuario',[],'', 312000000,'',true); 
        } else{
                let datosUsuario = new Usuario(
                    this.usuarioIngreso._id,
                    this.usuarioIngreso.imagen,
                    this.usuarioIngreso.nombre,
                    this.usuarioIngreso.apellido,
                    this.usuarioIngreso.correo,
                    this.usuarioIngreso.contrasena,
                    this.usuarioIngreso.rol,
                    this.usuarioIngreso.compras,
                    this.usuarioIngreso.direccion,
                    this.usuarioIngreso.celular,
                    this.usuarioIngreso.subcripcion,
                    this.usuarioIngreso.estado
                   
                );
                    // creamos el objeto localStorage  
                    localStorage.setItem('sesion',JSON.stringify(datosUsuario));
                    localStorage.setItem('pelicula', JSON.stringify(this.pelicula));
                    let usuario = JSON.parse(localStorage.getItem('sesion'));

                    if(usuario.rol == "administrador"){
                        localStorage.setItem('pagina','administrador'); 
                        this._router.navigate(['/'])
                    } else {
                        localStorage.setItem('pagina','usuario'); 
                        this.usuarioIngreso = new Usuario('','','','','','','usuario',[],'', 312000000,'',true); 
                        this._router.navigate(['/']);
                    }                                               
                    //this.identidad = this.usuarioServicio.obtenerNombreUsuario();                    
                     window.location.reload();    
        }
    },
    error =>{
        var errorMensaje = <any>error;
        if(errorMensaje != null){
            alert('Datos Incorrectos');
        }
    }
    )
}

}
