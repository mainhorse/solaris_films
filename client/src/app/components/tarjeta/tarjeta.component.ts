import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css']
})
export class TarjetaComponent implements OnInit {

  public peliculas;
  public url : String;
  constructor( private peliculasService : PeliculasService) {
    this.url = peliculasService.url;
   }

  ngOnInit(): void {
    this.visualizacion()
  }

  visualizacion(){
    this.peliculasService.buscarTodasPeliculas().subscribe((response : any)=>{
      let respuesta = response.peliculas;
      let mensaje = response.message;
      if(!respuesta){
        alert(mensaje)
      }else{
        localStorage.setItem('peliculas',JSON.stringify(respuesta));
        this.peliculas = JSON.parse(localStorage.getItem('peliculas'));
      }
    })
  }
}
