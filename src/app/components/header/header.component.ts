import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  id: any;
  Datosusuario: any;
  Datos: any;
  nombreUsuario: any;
  estaLogueado: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.Datosusuario = sessionStorage.getItem('userData');
    this.Datos = JSON.parse(this.Datosusuario);
    if(this.Datos){
      const primerUsuario = this.Datos[0];
    console.log(this.Datos)
    this.id = primerUsuario.id_u;
    this.nombreUsuario = primerUsuario.usuario;
    console.log(this.nombreUsuario)
    }else{
      this.id = 1
    }
    

    console.log(this.id)

    
    this.actualizarTextoEnlace();
  }
  
  
  cerrarSesion(){
    sessionStorage.removeItem('userData');
    this.router.navigate(['/']);
  }
  

  

  actualizarTextoEnlace(): void {
    const enlace = document.getElementById('iniciarCerrarSesion');
    if (enlace) {
      if (this.Datos) {
        enlace.textContent = 'Cerrar Sesión';
        this.estaLogueado = true;
      } else {
        enlace.textContent = 'Iniciar Sesión';
        this.estaLogueado = false;
      }
    }
  }

  gestionarSesion(): void {
    if (this.estaLogueado) {
      this.cerrarSesion();
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}