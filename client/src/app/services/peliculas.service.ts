import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { stringify } from 'querystring';

@Injectable()
export class PeliculasService {
url = 'http://localhost:3000/api/';

  constructor(
    private _http : HttpClient
  ) {}

  PeliculaNueva(nuevaPelicula){
    let params = JSON.stringify(nuevaPelicula);
    let options ={
      headers : new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this._http.post(
      this.url + 'nuevaPelicula',
      params,
      options
    ).pipe(map(res => res))
  }

  ActualizarPelicula(id,DatosNuevos){
    console.log(id);
    console.log(DatosNuevos);
    let params = JSON.stringify(DatosNuevos);
    let options = {
      headers : new HttpHeaders({'Content-Type' : 'application/json'})
    }
    return this._http.put(
      this.url + 'actualizarPelicula/' + id,
      params,
      options
    ).pipe(map(res => res));
  }
}
