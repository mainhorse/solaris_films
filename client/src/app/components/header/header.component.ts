import { Component, OnInit } from '@angular/core';

import { CargarScriptService } from "../../services/cargarScript.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor( private _CargaScripts: CargarScriptService) {
 _CargaScripts.Carga(["header"]);
  }

  ngOnInit(): void {
  }
  cerrar(){
    localStorage.clear();
    window.location.reload();
  }
}
