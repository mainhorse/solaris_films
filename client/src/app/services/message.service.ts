import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class MessageService {

  constructor(private _http: HttpClient) { }

  sendMessage(body){
    
    return this._http.post(
      'http://localhost:3000/api/formulario', body)
  }
}
