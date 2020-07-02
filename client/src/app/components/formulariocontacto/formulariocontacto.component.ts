import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';


@Component({
  selector: 'app-formulariocontacto',
  templateUrl: './formulariocontacto.component.html',
  styleUrls: ['./formulariocontacto.component.css']
})
export class FormulariocontactoComponent implements OnInit {

  constructor(public _MessageService : MessageService) { }

  ngOnInit(): void {
  }

  contactForm(form){
    this._MessageService.sendMessage(form).subscribe(()=>{
      alert("se envio el correo");
    })
  }

  volver(){
    localStorage.setItem("pagina", "usuario");
    window.location.reload();
   
  }

}
