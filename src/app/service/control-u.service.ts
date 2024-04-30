import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControlUService {

  user: any[]=[]

  url='https://gp-back-production.up.railway.app/controlu/'

  constructor(private http:HttpClient) { }

  public getUserData(): Observable <any>{
    return this.http.get<any>(`${this.url}all`)
  }

  public blokU(user:any): Observable <any>{
    return this.http.post<any>(`${this.url}`, user)
  }
}
