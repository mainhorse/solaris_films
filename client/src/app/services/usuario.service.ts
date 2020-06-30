import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class UsuarioService {
  url = 'http://localhost:3000/api/';
  constructor(
    private _http : HttpClient
  ) { }

  Registro(usuarioNuevo){
    let params = JSON.stringify(usuarioNuevo);
    let options = {
      headers : new HttpHeaders({'Content-Type' : 'application/json'})
    };
    return this._http.post(
      this.url + 'registro',
      params,
      options
    ).pipe(map(res => res));
  }

  ingreso(validar){
    let params = JSON.stringify(validar);
    let options ={
      headers : new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this._http.post(
      this.url + 'ingreso',
      params,
      options
    ).pipe(map(res => res))
  }

  actualizar(id,datosNuevos){
    let params = JSON.stringify(datosNuevos);
    let options = {
      headers : new HttpHeaders({'Content-type' : 'application/json'})
    }
    return this._http.put(
      this.url + 'actualizar/' + id,
      params,
      options
    )
  }

  cargarImagenUsuario(file: File, id){
    // instanciamos el objeto FormData que nos permitira enviar la img
    let formData = new FormData();
    formData.append('imagen', file);
    return this._http.put(
      this.url + 'fotoUsuario/' + id,
      formData
    ).pipe(map(res => res));
  }

  buscarUsuario(datos){
    console.log(datos)
    let params = JSON.stringify(datos);
    let options = {
      headers : new HttpHeaders({'Content-Type' : 'application/json'})
    }
    return this._http.post(
      this.url + 'buscarUsuario',
      params,
      options
    ).pipe(map(res => res))
  }

}
