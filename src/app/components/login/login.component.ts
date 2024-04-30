import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { SessionService } from '../../service/session.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  siteKey: string;
  captchaDatos: boolean = false;
  errorMessage: string = '';
  showOtpModal: boolean = false;
  otp: any;
  optU:any;

  constructor(private http: HttpClient, private router: Router, private sessionService: SessionService) {
    this.siteKey = '6LdtOLwpAAAAABE8w6K_b5ynfzLr5VwsP73Qqyyb';
  }

  ngOnInit() {}

  login() {
    this.errorMessage = '';
  
    if (!this.username || !this.password) {
      this.errorMessage = 'Por favor, complete todos los campos.';
      return;
    }
  
    if (this.password.length < 6) {
      this.errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }
  
    const params = new HttpParams()
      .set('usuario', this.username)
      .set('contrasena', this.password);
  

      
    // Realizar la solicitud GET al servidor con los datos en la URL
    this.http.get('https://gp-back-production.up.railway.app/login', { params }).subscribe(
      (response: any) => {
        if (response.message === 'Inicio de sesión exitoso') {
          const userData = response.userData;
           this.otp =response.otp
          sessionStorage.setItem(
            'userData',
            JSON.stringify(userData)
          );
          console.log(userData);
          console.log(this.otp);
        } else {
          console.error('Inicio de sesión fallido:', response.message);
          this.errorMessage = response.message; // Mostrar mensaje de error desde el servidor
        }
      },
      (error) => {
        console.error('Error en la solicitud: ', error);
        this.errorMessage = 'Error en la solicitud. Por favor, inténtelo de nuevo más tarde.'; // Mensaje de error genérico
      }
    );
  }
  
  verifyOtp() {
    // Verificar si el OTP ingresado por el usuario coincide con el OTP recibido del servidor
    if (this.otp == this.optU) {
      // Si los OTP coinciden, puedes realizar alguna acción, como cerrar el modal o continuar con el proceso de inicio de sesión
      console.log('El OTP ingresado es correcto');
      this.router.navigate(['/']);
      // Aquí puedes agregar la lógica adicional que necesites después de verificar el OTP
    } else {
      // Si los OTP no coinciden, puedes mostrar un mensaje de error al usuario
      console.log('El OTP ingresado es incorrecto');
      // Aquí puedes agregar la lógica adicional que necesites para manejar el caso de OTP incorrecto
    }
  }
  

  updateUsername(event: any) {
    this.username = event.target?.value || '';
  }

  updatePassword(event: any) {
    this.password = event.target?.value || '';
  }

  handleCaptchaResponse(event: any) {
    if (event) {
      this.captchaDatos = true;
      console.log(this.captchaDatos);
    }
  }
  closeModal() {
    this.showOtpModal = false;
  }
  openModal() {
    this.showOtpModal = true;
  }

  updateOpt(event: any) {
    this.optU = event.target?.value || '';
  }


}
