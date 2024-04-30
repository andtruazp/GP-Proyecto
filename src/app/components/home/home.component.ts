import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Typed from 'typed.js';
import { SessionService } from '../../service/session.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  usuario: any;
  Datosusuario: any;
  Datos: any;
  id_u: any;
  estaLogueado: boolean = false;
  @ViewChild('inputSearch') inputSearch!: ElementRef<HTMLInputElement>;

  constructor(
    private router: Router,
    private sessionService: SessionService
  ) {
  }
  
  ngOnInit() {

    const options = {
      strings: ["Crear.", "Organizar.", "Gestionar."],
      typeSpeed: 30,
      startDelay: 1200,
      backSpeed: 20,
      backDelay: 500,
      loop: true,
      loopCount: 5,
      showCursor: false,
      cursorChar: "|",
      contentType: 'html',
      callback: () => {},
      preStringTyped: () => {},
      onStringTyped: () => {},
      resetCallback: () => {}
  };  
    const typed = new Typed('.typed', options);

    this.Datosusuario = sessionStorage.getItem('userData');
    this.Datos = JSON.parse(this.Datosusuario);
    if(this.Datos){
      console.log(this.Datos)
      const user1 = this.Datos[0];
      this.id_u=user1.id_u
    }

    this.ocultarSeccion();
    this.actualizarTextoEnlace();

    
    this.sessionService.resetTimer();
    this.sessionService.startActivityMonitor();
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
    if(this.id_u == 1){
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

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  searchAndNavigate() {
    const searchTerm = this.inputSearch.nativeElement.value.toLowerCase();
    if (searchTerm === 'acerca de nosotros' || searchTerm === 'nosotros' || searchTerm ==='informacion') {
      this.scrollToSection('about');
    } else if (searchTerm === 'enfoque' || searchTerm ==='vision' || searchTerm ==='mision') {
      this.scrollToSection('enfoque');
    } else if (searchTerm === 'servicios' || searchTerm ==='ofrece' || searchTerm ==='para que es') {
      this.scrollToSection('servicios');
    } else if (searchTerm === 'ayuda') {
      this.scrollToSection('ayuda');
    } else if(searchTerm === 'actividad'){
      this.router.navigate(['/homeuser']);
    } else if(searchTerm === 'proyecto' || searchTerm === 'nuevo' || searchTerm === 'crear' ){
      this.router.navigate(['/proyecto']);
    }
  }

  
}