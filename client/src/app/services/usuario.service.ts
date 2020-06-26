import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { stringify } from 'querystring';


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

}
