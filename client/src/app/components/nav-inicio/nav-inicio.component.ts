import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-inicio',
  templateUrl: './nav-inicio.component.html',
  styleUrls: ['./nav-inicio.component.css']
})
export class NavInicioComponent implements OnInit {
 

  constructor() { }

  ngOnInit(): void {
  }

home(){
  localStorage.setItem("pagina","home");
  window.location.reload();
}

comida(){
  localStorage.setItem("pagina","comida");
  window.location.reload();
}

}
