import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IdUsuarioService {

  constructor(private http: HttpClient) { }

  obtenerIdUsuario() {
    return this.http.get('https://gp-back-production.up.railway.app/id');
  }
}