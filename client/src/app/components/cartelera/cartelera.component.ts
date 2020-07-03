import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cartelera',
  templateUrl: './cartelera.component.html',
  styleUrls: ['./cartelera.component.css']
})
export class CarteleraComponent implements OnInit {
  public card : String = 'card';
  public peliculas ;
  public url: String;
  public cont = 0;
  public video = 'video';

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

  mostrar(posicion){
    let pos = posicion.numPelicula;
    let video="video";
    let container = video + pos;
    if(this.cont == 0){
      document.getElementById(container).style.display = "block";
      this.cont ++;
    } else{
      document.getElementById(container).style.display = "none";
      this.cont = 0;
    }
    
  }

  comprar(datos){
    Swal.fire({
      title: `La película ${datos.titulo} tiene un valor de $15.000 pesos y tiene una duración de ${datos.tiempo}`,
      text: `Comuniquese al 3123451231 para mayor información`,
      imageUrl: '../../assets/pases.jpg',
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image', 
      confirmButtonColor: '#F76363',
      backdrop: ` rgba(0,0,0,0.5) left top no-repeat`
    }).finally;;  
    
  }

}
