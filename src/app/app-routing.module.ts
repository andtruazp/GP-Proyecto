import { HomenavComponent } from './components/homenav/homenav.component';
import { HomeuserComponent } from './components/homeuser/homeuser.component';
import { SitemapComponent } from './components/sitemap/sitemap.component';
import { Error403Component } from './error/error403/error403.component';
import { Error404Component } from './error/error404/error404.component';
import { TareaComponent } from './components/tarea/tarea.component';
import { ProyectoComponent } from './components/proyecto/proyecto.component';
import { EquipoComponent } from './components/equipo/equipo.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ActividadesComponent } from './components/actividades/actividades.component';
import {RegisterComponent} from './components/register/register.component';
import { rolGuard } from './guards/admin.guards';
import {RecuperacionComponent} from './components/recuperacion/recuperacion.component';
import {RestablecerComponent} from './components/restablecer/restablecer.component';


const routes: Routes = [
  {path:'',component: HomeComponent},
  {path:'login', component: LoginComponent},
  {path:'homeuser', component: HomeuserComponent},
  {path: 'nav', component: HomenavComponent},
  {path:'register', component: RegisterComponent},
  {path:'equipo', component: EquipoComponent},
  {path:'proyecto', component: ProyectoComponent},
  {path:'proyecto/:id', component: ProyectoComponent},
  {path: 'proyecto/:id/actividad', component: ActividadesComponent },
  {path:'actividades', component: ActividadesComponent},
  {path:'actividades/:id', component: ActividadesComponent},
  {path:'tarea/:id', component: TareaComponent},
  {path:'error404', component: Error404Component},
  {path:'error403', component: Error403Component},
  {path:'sitemap', component: SitemapComponent},
  {path:'recuperacion', component: RecuperacionComponent},
  { path:'restablecer', component: RestablecerComponent },
  {path:'**', redirectTo: 'error404', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
