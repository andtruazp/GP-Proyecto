import { Integrante } from './../models/integrante';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IntegrantesService {

  integrante: Integrante | undefined
  url ='https://gp-back-production.up.railway.app/integrantes/'

  constructor(private http:HttpClient) { }

  public getUsers(buscar:any): Observable <any>{
    return this.http.get<any>(`${this.url}${buscar}`).pipe(
      map(response =>{
        return response;
      })
    )
  }

  public addIntegrantes(integrantes: any): Observable <any>{
    return this.http.post(`${this.url}`,integrantes)
  }

  public getIntegrantes(id:any): Observable <any>{
    return this.http.get<any>(`${this.url}e/${id}`)
  }

  public eliminarI(id_p: number, id_u: number): Observable<any> {
    return this.http.delete(`${this.url}?id_p=${id_p}&id_u=${id_u}`);
  }
}
