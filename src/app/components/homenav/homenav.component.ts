import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homenav',
  templateUrl: './homenav.component.html',
  styleUrls: ['./homenav.component.css']
})
export class HomenavComponent implements OnInit{
  id: any;
  Datosusuario: any;
  Datos: any;
  nombreUsuario: any;
  estaLogueado: boolean = false;

  constructor(private router: Router){}

  
  ngOnInit(): void {
    this.Datosusuario = sessionStorage.getItem('userData');
    this.Datos = JSON.parse(this.Datosusuario);
    if(this.Datos){
      const primerUsuario = this.Datos[0];
    console.log(this.Datos)
    this.id = primerUsuario.id_u;
    this.nombreUsuario = primerUsuario.usuario;
    console.log(this.nombreUsuario)
    }
    this.ocultarSeccion();
    this.actualizarTextoEnlace();
    
  }

  ocultarSeccion(): void {
    if (this.Datos) {
      const heroSection = document.getElementById('registrate');
      if (heroSection) {
        heroSection.style.display = 'none';
      }
    }
  }

  rol(){
    if(this.id == 1){
      this.router.navigate(['/equipo']);
    }else if(!this.Datos){
      this.router.navigate(['/login']);
    }else{
      this.router.navigate(['/homeuser']);
    }

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
  cerrarSesion(){
    sessionStorage.removeItem('userData');
    console.log('Sesion finalizada')
    window.location.reload();
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


