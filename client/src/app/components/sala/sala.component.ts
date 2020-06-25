import { Component, OnInit } from '@angular/core';

import { CargarScriptService } from "../../services/cargarScript.service";

@Component({
  selector: 'app-sala',
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.css']
})
export class SalaComponent implements OnInit {

  constructor( private _CargaScripts: CargarScriptService) {
 _CargaScripts.Carga(["controles"]);
  }

  ngOnInit(): void {
  }
}