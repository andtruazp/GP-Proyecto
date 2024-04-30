

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importa HttpClient para hacer solicitudes HTTP
import { Router } from '@angular/router';
import { Actividad } from './../../models/actividad';
import { ActividadService } from './../../service/actividad.service';

@Component({
  selector: 'app-homeuser',
  templateUrl: './homeuser.component.html',
  styleUrls: ['./homeuser.component.css']
})
export class HomeuserComponent implements OnInit {
  id: any;
  Datosusuario: any;
  Datos: any;
  proyectos: any[] = []; // Arreglo para almacenar los proyectos
  act: Actividad[]=[];

  constructor(private http: HttpClient, 
    private router: Router,
    private actividadService: ActividadService,
    ) { } // Inyecta HttpClient

  ngOnInit(): void {
    this.Datosusuario = sessionStorage.getItem('userData');
    this.Datos = JSON.parse(this.Datosusuario);
    const primerUsuario = this.Datos[0];
    console.log(this.Datos)
    this.id = primerUsuario.id_u;
    console.log(this.id)

    if (!this.Datos) {
      // Redirigir al usuario a la página de error
      this.router.navigate(['/error403']);
    }

    this.getAllProyectos();
    this.getMisAct();
  }

  getAllProyectos() {
    // Realiza una solicitud HTTP GET para obtener todos los proyectos del usuario
    this.http.get<any[]>(`https://gp-back-production.up.railway.app/proyecto/all/${this.id}`).subscribe(
      proyectos => {
        this.proyectos = proyectos;
        console.log('Proyectos obtenidos:', proyectos);
      },
      error => {
        console.error('Error al obtener proyectos:', error);
      }
    );
  }

  getMisAct(){
    try{
      console.log('el id de la actividad es:',this.id)
      this.actividadService.getMisActividades(this.id).subscribe(act => {
        this.act = act;
        console.log('los valores son',act)
      },
      error => {
        console.error('Error al obtener datos:', error);
      } )
    }catch{
      this.id = 0
      console.log('no existe');
    }
    
  }

}
