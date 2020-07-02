import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  imagenbogota = ['assets/img/logo_alcaldia.png'];

  constructor() { }

  ngOnInit(): void {
  }
  
  empresa() {
    localStorage.setItem("pagina", "empresa");
    window.location.reload()
  }
}
