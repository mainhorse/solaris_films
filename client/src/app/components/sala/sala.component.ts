import { Component, OnInit } from '@angular/core';

import { CargarScriptService } from "../../services/cargarScript.service";

import { PeliculasService} from '../../services/peliculas.service';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { Pelicula} from '../../modelo/pelicula';

@Component({
  selector: 'app-sala',
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.css']
})
export class SalaComponent implements OnInit {

public url : String;
public pelicula : Pelicula ;

  constructor( private _CargaScripts: CargarScriptService,
    private peliculaService: PeliculasService) {
 _CargaScripts.Carga(["controles"]);

 this.pelicula = JSON.parse(localStorage.getItem("pelicula"));

 this.url =  peliculaService.url;
  }

  ngOnInit(): void {
this.reproducir();

  }

reproducir(){
let repVid = this.url + "pelicula/" + this.pelicula.linkPelicula;
document.getElementById("video").setAttribute("src", repVid);

}

}

