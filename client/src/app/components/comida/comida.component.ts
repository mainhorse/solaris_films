import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comida',
  templateUrl: './comida.component.html',
  styleUrls: ['./comida.component.css']
})
export class ComidaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  carrito() {
    localStorage.setItem("pagina", "carrito");
    window.location.reload()
  }
}
