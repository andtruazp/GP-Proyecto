import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proyecto } from '../models/proyecto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  proyecto: Proyecto | undefined
  url ='https://gp-back-production.up.railway.app/proyecto/'

  constructor(private http:HttpClient) { }

  public getAll(): Observable <any>{
    return this.http.get<any>(`${this.url}`)
  }

  public getProyecto(id:any): Observable <any>{
    return this.http.get<any>(`${this.url}${id}`)  
  }

  public createProyecto(proyecto: Proyecto): Observable <any>{
    return this.http.post(`${this.url}`,proyecto)
  }

  public updateProyeto(id:any, proyecto: Proyecto): Observable <any>{
    return this.http.put(`${this.url}${id}`, proyecto)
  }

  public deleteProyecto(id:any): Observable <any>{
    return this.http.delete(`${this.url}${id}`)
  }
  
}