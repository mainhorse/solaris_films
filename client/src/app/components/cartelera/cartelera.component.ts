import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-cartelera',
  templateUrl: './cartelera.component.html',
  styleUrls: ['./cartelera.component.css']
})
export class CarteleraComponent implements OnInit {
  public card : String = 'card';
  public peliculas ;
  public url: String;

  constructor(private peliculaService : PeliculasService) { 
    this.url = peliculaService.url;
  }

  ngOnInit(): void {
    this.todasPeliculas()
  }

  todasPeliculas(){
    this.peliculaService.buscarTodasPeliculas().subscribe((response : any)=>{
      let respuesta = response.peliculas;
      let mensaje = response.message;
      if(respuesta){
        localStorage.setItem('peliculas', JSON.stringify(respuesta));
        this.peliculas = JSON.parse(localStorage.getItem('peliculas'))
      }
    })
  }


}
