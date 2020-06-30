import { Component, OnInit } from '@angular/core';
import { PeliculasService} from '../../services/peliculas.service';
import { Pelicula} from '../../modelo/pelicula';
import { CargarScriptService } from "../../services/cargarScript.service";
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-sala',
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.css']
})
export class SalaComponent implements OnInit {

public url : String;
public pelicula : Pelicula ;

  constructor( private _CargaScripts: CargarScriptService,
    private peliculaService: PeliculasService
    ) {
 _CargaScripts.Carga(["controles"]);
 this.url =  peliculaService.url;
 this.pelicula = JSON.parse(localStorage.getItem("pelicula"));
  }

  ngOnInit(): void {
  this.reproducir();
  }

reproducir(){
let repVid = this.url + "pelicula/" + this.pelicula.linkPelicula;
document.getElementById("video").setAttribute("src", repVid);

}

}

