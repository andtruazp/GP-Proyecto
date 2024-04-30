import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


interface Pagina {
  titulo: string;
  url: string;
  subpaginas?: { [subpagina: string]: Pagina };
}


@Component({
  selector: 'app-sitemap',
  templateUrl: './sitemap.component.html',
  styleUrls: ['./sitemap.component.css']
})
export class SitemapComponent implements OnInit{
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
      this.estaLogueado = true
    }
    
  }

  gestionarSesion(): void {
    if (this.estaLogueado == false) {
      
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/homeuser']);
    }
  }

  proyecto(): void {
    if (this.estaLogueado == false) {
      
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/proyecto']);
    }
  }

}