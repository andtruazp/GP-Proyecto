import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.component.html',
  styleUrls: ['./restablecer.component.css']
})
export class RestablecerComponent implements OnInit {
  token!: string;
  newPassword!: string;
  errorMessage: string = '';
  confirmPassword: string = '';

  constructor(private route: ActivatedRoute, private router: Router,private http: HttpClient) { }
  
  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params: any) => {
      this.token = params.get('token');
      console.log(this.token)
    });
  }

  cambiarContrasena() {
    // Validar la nueva contraseña antes de enviar la solicitud
    if (this.newPassword.length < 6) {
      this.errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }
    if (this.newPassword !== this.confirmPassword) { // Verificar si las contraseñas coinciden
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }
    const uppercasePattern = /[A-Z]/;
    const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;
    if (!uppercasePattern.test(this.newPassword) || !specialCharPattern.test(this.newPassword)) {
    this.errorMessage = 'La contraseña debe contener al menos una mayúscula y un carácter especial.';
    return;
    }

    const body = { newPassword: this.newPassword, 
      token: this.token
    };

    this.http.post('https://gp-back-production.up.railway.app/cambiar-contrasena', body).subscribe(
      (response)=> {
        alert("Contraseña restablecida exitosamente")
        this.router.navigate(['/login']);
      },
      (error) => {
        alert('Error al enviar la contraseña. Por favor, verifica tu conexión a internet e intenta nuevamente.');
      });
  }


  updatePassword(event: any) {
    this.newPassword = event.target?.value || '';
    console.log(this.newPassword)
  }
  updateConfirmPassword(event: any) { 
    this.confirmPassword = event.target?.value || '';
  }

}
