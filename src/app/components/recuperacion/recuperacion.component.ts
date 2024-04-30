import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-recuperacion',
  templateUrl: './recuperacion.component.html',
  styleUrls: ['./recuperacion.component.css']
})
export class RecuperacionComponent implements OnInit {
    Email: any;
    errorMessage: string = '';
    siteKey:string;
    captchaDatos: boolean = false;

    constructor(private http: HttpClient) { 
      this.siteKey = '6LdtOLwpAAAAABE8w6K_b5ynfzLr5VwsP73Qqyyb';
    }
  
    ngOnInit(): void {}
  
    recuperarContrasena() {
      if (!this.Email) {
        return;
      }
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(this.Email)) {
        this.errorMessage = 'Por favor, introduzca un correo electrónico válido.';
        return;
      }
    
      const body = { email: this.Email }; // Crear objeto con la propiedad 'email'
    
      this.http.post('https://gp-back-production.up.railway.app/recuperar-contrasena', body).subscribe(
        (response) => {
          Swal.fire({
            icon: "success",
            title: "El correo ha sido enviado con éxito. Por favor, verifica en tu bandeja de entrada.",
            showConfirmButton: false,
            timer: 1500
          });
        },
        (error) => {
          alert('Error al enviar el correo electrónico. Por favor, verifica tu conexión a internet e intenta nuevamente.');
        }
      );
    }    
    updateEmail(event: any) {
      this.Email = event.target?.value || '';
      console.log(this.Email)
    }
    handleCaptchaResponse(event: any){
      if(event){
        this.captchaDatos=true;
        console.log(this.captchaDatos)
    }
  
    }
  }