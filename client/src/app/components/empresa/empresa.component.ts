import { Component, OnInit } from '@angular/core';
import { CargarScriptService } from "../../services/cargarScript.service";

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {

  constructor( private _CargaScripts: CargarScriptService) {
    _CargaScripts.Carga(["empresa1"]);
     }
 
  ngOnInit(): void {
  }
  cerrar(){
    localStorage.clear();
    window.location.reload();
  }
}
