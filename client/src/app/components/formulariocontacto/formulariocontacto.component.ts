import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Formulario } from '../../modelo/formulario';


@Component({
  selector: 'app-formulariocontacto',
  templateUrl: './formulariocontacto.component.html',
  styleUrls: ['./formulariocontacto.component.css']
})
export class FormulariocontactoComponent implements OnInit {
  public formulario : Formulario;

  constructor(public _MessageService : MessageService) { }

  ngOnInit(): void {
  }

  contactForm(form){
    this.formulario = { nombre : form.nombre , correoRecibe : 'HiWorldSolutions@gmail.com', 
    correoEnvia : form.correoEnvia, asunto : form.asunto, mensaje : form.mensaje}
  
    this._MessageService.sendMessage(this.formulario).subscribe(()=>{
      alert("se envio el correo");
    })
  }

  volver(){
    localStorage.setItem("pagina", "usuario");
    window.location.reload();
   
  }

}
