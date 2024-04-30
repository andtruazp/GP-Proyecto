import { ControlUService } from './../../service/control-u.service';
import { ProyectoService } from './../../service/proyecto.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent implements OnInit {
  proyectos: any[] = [];
  usuarios: any[]=[];
  usuarioA: any[]=[];

  constructor(private router: Router,
      private proyectoService : ProyectoService,
      private controluSesrvice : ControlUService
    ){}

  ngOnInit(): void {
    this.getProyectos()
    this.getUsuarios()
  }

  getProyectos(){
    try{
      
      this.proyectoService.getAll().subscribe(proyectos => {
        this.proyectos = proyectos;
        console.log('los valores son',proyectos)
      },
      error => {
        console.error('Error al obtener datos:', error);
      } )
    }catch{
      
      console.log('no existe');
    }
  }

  getUsuarios(){
    try{
      
      this.controluSesrvice.getUserData().subscribe(usuarios => {
        this.usuarios = usuarios;
        console.log('los valores son',usuarios)
      },
      error => {
        console.error('Error al obtener datos:', error);
      } )
    }catch{
      
      console.log('no existe');
    }
  }

  actiDesacU(id_u: number, est: number){
    const user = { id_u: id_u, estado_u: est };
    this.controluSesrvice.blokU(user).subscribe((response) => {
      console.log('Solicitud POST exitosa', response);
      if(est == 1){
        alert('¡El usuario esta Activo!');
      }else{
        alert('¡El usuario esta inactivo!');
      }
      
    },
    (error) => {
      console.error('Error en la solicitud', error);
      alert('¡Hubo un error!');
    }
  );
  }

}