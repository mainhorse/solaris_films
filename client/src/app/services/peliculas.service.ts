import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


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

  ArchivoNuevo(file: File, id, tipoArchivo){
    // instanciamos el objeto FormData que nos permitira enviar la img
    let formData = new FormData();
    formData.append('archivos', file);
    formData.append('tipo', tipoArchivo);
    return this._http.put(
      this.url + 'archivoNuevo/' + id ,
      formData,
      ).pipe(map(res => res));
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

  cargarCaratula(file: File, id){
    // instanciamos el objeto FormData que nos permitira enviar la img
    let formData = new FormData();
    formData.append('caratula', file);
    return this._http.put(
      this.url + 'caratula/' + id,
      formData
    ).pipe(map(res => res));
  }

  buscarPeliculasAdm(objeto){
    let params = JSON.stringify(objeto);
    let options = {
      headers : new HttpHeaders({'Content-Type' : 'application/json'})
    };
    return this._http.post(
      this.url + 'buscarPeliculas',
      params,
      options
    ).pipe(map(res => res))

  }

  buscarTodasPeliculas(){
    let option = {
      headers : new HttpHeaders({'Content-Type' : 'application/json'})
    }
    return this._http.post(
      this.url + 'todasPeliculas',
      option
    ).pipe(map(res => res))
  }
  eliminarPelicula(peliculaId){
    return this._http.delete(
      this.url + 'eliminarPelicula/' + peliculaId
    ).pipe(map(res => res))
  }
}
