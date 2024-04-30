import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actividad } from '../models/actividad'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  actividad: Actividad | undefined
  url ='https://gp-back-production.up.railway.app/actividad/'


  constructor(private http:HttpClient) { }

  public getAct(id:any): Observable <any>{
    return this.http.get<any>(`${this.url}${id}`)
  }

  public getMisActividades(id:any): Observable <any>{
    return this.http.get<any>(`${this.url}all/${id}`)  
  }

  public getProyectAct(id:any): Observable <any>{
    return this.http.get<any>(`${this.url}proyecto/${id}`)
  }

  public crearAct(actividad: Actividad): Observable <any>{
    return this.http.post(`${this.url}`,actividad)
  }

  public updateAct(id:any, actividad:Actividad): Observable <any>{
    return this.http.put(`${this.url}${id}`, actividad)
  }

  public eliminar(id:any): Observable <any>{
    return this.http.delete(`${this.url}${id}`)
  }

  
}