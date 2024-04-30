import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private activityTimeout: any;
  private inactivityTimeout: any;
  private Datosusuario: string | null;
  private Datos: any;
  public id_u: any;

  constructor(private router: Router) { 
    this.Datosusuario = sessionStorage.getItem('userData');
    if (this.Datosusuario) {
      this.Datos = JSON.parse(this.Datosusuario);
      const user1 = this.Datos[0];
      this.id_u = user1.id_u;
      this.startActivityMonitor();
    }
  }

  // Función para mostrar el mensaje de advertencia de sesión próxima a expirar
  showSessionExpiryWarning(): void {
    const confirmation = window.confirm(
      '¡Tu sesión está a punto de expirar! ¿Deseas extenderla?'
    );

    if (confirmation) {
      clearTimeout(this.activityTimeout);
      clearTimeout(this.inactivityTimeout);
      this.resetTimer();
    } else {
      this.logout();
    }
  }

  // Función para cerrar sesión
  logout(): void {
    sessionStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }

  // Establecer temporizador para caducar en 1 minuto
  resetTimer(): void {
    clearTimeout(this.activityTimeout);
    this.activityTimeout = setTimeout(() => {
      this.showSessionExpiryWarning();
    }, 30000); // 50 segundos en milisegundos

    clearTimeout(this.inactivityTimeout);
    this.inactivityTimeout = setTimeout(() => {
      this.logout();
    }, 60000); // 1 minuto en milisegundos
  }

  // Función para iniciar el monitor de actividad del usuario
  startActivityMonitor(): void {
    const resetActivityTimer = () => {
      clearTimeout(this.activityTimeout);
      this.resetTimer(); // Reiniciar el temporizador al detectar actividad
    };

    const logActivity = () => {
      resetActivityTimer(); // Reinicia el temporizador de actividad
    };

    document.addEventListener('mousemove', logActivity);
    document.addEventListener('keypress', logActivity);

    // Inicia el temporizador de actividad al cargar la página
    resetActivityTimer();
  }
}
