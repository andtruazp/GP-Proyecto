import { Component } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  correo: string = '';
  siteKey:string;
  captchaDatos: boolean = false;
  errorMessage: string = '';
  confirmPassword: string = '';
  showOtpModal: boolean = false;
  otp: any;
  optU:any;
  
  constructor(private http: HttpClient, private router: Router) {
    this.siteKey = '6LdtOLwpAAAAABE8w6K_b5ynfzLr5VwsP73Qqyyb';
   }

   registrar() {
    this.errorMessage = '';
  
    if (!this.username || !this.password || !this.correo) {
      this.errorMessage = 'Por favor, complete todos los campos.';
      return;
    }
    if (this.password.length < 6) {
      this.errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }
    if (this.password !== this.confirmPassword) { // Verificar si las contraseñas coinciden
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }
    const uppercasePattern = /[A-Z]/;
    const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;
    if (!uppercasePattern.test(this.password) || !specialCharPattern.test(this.password)) {
      this.errorMessage = 'La contraseña debe contener al menos una mayúscula y un carácter especial.';
      return;
    }
    
    // Validar el formato del correo electrónico
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(this.correo)) {
      this.errorMessage = 'Por favor, introduzca un correo electrónico válido.';
      return;
    }

    // Realiza la solicitud POST al endpoint /checkuser para verificar la existencia del usuario
    const params = new HttpParams()
    .set('usuario', this.username)
    .set('correo', this.correo);

  // Realiza la solicitud GET al endpoint /checkuser para verificar la existencia del usuario
  this.http.get('https://gp-back-production.up.railway.app/checkuser', { params: params })
  .subscribe(
    (response: any) => {
      this.otp =response.otp
      console.log(this.otp);
      if (response.user.length > 0 ) {
        console.log(response.user)
        this.errorMessage = 'El nombre de usuario o correo electrónico ya está registrado.';
        if (this.errorMessage == 'El nombre de usuario o correo electrónico ya está registrado.'){
          this.showOtpModal = false;
        }
      } 
    },
    (error) => {
      console.error('Error en la solicitud de verificación de usuario: ', error);
    }
  );
  }
  
  verifyOtp() {
    // Verificar si el OTP ingresado por el usuario coincide con el OTP recibido del servidor
    if (this.otp == this.optU) {

      const registerData = {
        usuario: this.username,
        contrasena: this.password,
        correo: this.correo
      };
  
      this.http.post('https://gp-back-production.up.railway.app/register', registerData).subscribe(
        (response: any) => {
          // Redirige al usuario a la página de inicio de sesión después de registrar
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error en la solicitud de registro: ', error);
        }
      );
    } else {
      // Si los OTP no coinciden, puedes mostrar un mensaje de error al usuario
      console.log('El OTP ingresado es incorrecto');
      // Aquí puedes agregar la lógica adicional que necesites para manejar el caso de OTP incorrecto
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

  updateUsername(event: any) {
    this.username = event.target?.value || '';
    console.log(this.username)
  }

  updatePassword(event: any) {
    this.password = event.target?.value || '';
    console.log(this.password)
  }
  updateConfirmPassword(event: any) { 
    this.confirmPassword = event.target?.value || '';
  }

  updateCorreo(event: any) {
    this.correo = event.target?.value || '';
    console.log(this.correo)
  }
  handleCaptchaResponse(event: any){
    if(event){
      this.captchaDatos=true;
      console.log(this.captchaDatos)
  }

  }

}
