import { EstadosService } from './../../service/estados.service';
import { Username } from './../../models/integrante';
import { Usuario } from './../../models/usuario';
import { Actividad } from './../../models/actividad';
import { ActividadService } from './../../service/actividad.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { IntegrantesService } from 'src/app/service/integrantes.service';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {
  act: Actividad[] = [];
  integrantes: Usuario[]=[
    { id_u: 1, usuario: "Usuario1" },
    { id_u: 2, usuario: "Usuario2" },
    { id_u: 3, usuario: "Usuario3" }
  ];
  actForm: FormGroup;
  id_u: any;
  id_p:any;
  id: number| null
  Datosusuario: any;
  Datos: any;
  usuario: Username[]=[];
  

  constructor(
    private actividadService: ActividadService,
    private fb: FormBuilder,
    private aRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private integranteService: IntegrantesService
    
  ) {
    this.actForm = this.fb.group({
      id: [''],
      id_p: [''],
      id_u:[''],
      nom_a: ['', Validators.required],
      des_a: ['', Validators.required],
      estado: [3],
      fecha_fin: ['', [Validators.required, this.fechaValidaValidator]],
      notas: [''], 
    });
    this.id = null;
    this.id_u = null;
    this.id_p = null;
  }
  ngOnInit() :void{
    this.aRoute.params.subscribe(params => {
      this.id_p = params['id_p'];
      console.log('Valor de id_p en actividades:', this.id_p);
    });
    if(!this.id_p){
      this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
    if (this.id) {
      this.getAct(this.id);
      //this.get_idp(this.id);
      if(this.id_p){
        this.equipo()
      }
    }
    
    }

    console.log("id: ",this.id)
    console.log("id_p: ",this.id_p)
    console.log("id_u: ",this.id_u)
   
    this.Datosusuario = sessionStorage.getItem('userData');
    this.Datos = JSON.parse(this.Datosusuario);
    const primerUsuario = this.Datos[0];
    console.log(this.Datos)
    this.Datosusuario = sessionStorage.getItem('userData');
    this.id_u = primerUsuario.id_u;
    console.log(this.id_u)

    if (!this.Datos) {
      // Redirigir al usuario a la página de error
      this.router.navigate(['/login']);
    }

    this.equipo()
  }

  fechaValidaValidator() {
    return (control: { value: string | number | Date; }) => {
      const fechaIngresada = new Date(control.value);
      const fechaActual = new Date();
  
      if (fechaIngresada < fechaActual) {
        return { fechaInvalida: true };
      }
  
      return null; // La fecha es válida
    };
  }

  get_idp (id: number) {
    this.actividadService.getAct(id).subscribe(
      (act) => {
        
          const actd = act[0]; // Accede al primer elemento del array
          this.id_p = actd.id_p;
          console.log("act.id_p en metodo get_idp",this.id_p);  
          //this.equipoA(this.id_p)       
        
      },
      (error) => {
        console.error('Error al obtener la actividad:', error);
      }
    );
  }

  getAct(id: number): void {
    this.actividadService.getAct(id).subscribe(
      (act) => {
        if(act && act.length > 0){ // Verifica si act es un array y tiene al menos un elemento
          const actd = act[0]; // Accede al primer elemento del array
          this.act = act[0];
          console.log(actd);
          const fechaFin = new Date(actd.fecha_fin);
          const fechaFinFormateada = fechaFin.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('-');
          this.actForm.patchValue({
            id_p: actd.id_p,
            id_u: actd.usuario,
            nom_a: actd.nom_a,
            des_a: actd.des_a,
            estado: actd.estado,
            fecha_fin: fechaFinFormateada,
            notas: actd.notas,
          });
        }
      },
      (error) => {
        console.error('Error al obtener la actividad:', error);
      }
    );
}


  getMisAct(){
    try{
      console.log('el id de la actividad es:',this.id)
      this.actividadService.getMisActividades(this.id).subscribe(act => {
        this.act = act;
        console.log('los valores son',act)
      },
      error => {
        console.error('Error al obtener datos:', error);
      } )
    }catch{
      this.id = 0
      console.log('no existe');
    }
    
  }
 

  /*crearAct(){
    const actData = this.actForm.value;
    
    if(this.id !== null && this.id !== 0){
      console.log("id del metodo: ", this.id)
      this.actividadService.updateAct(this.id, actData).subscribe( act => {
          console.log('Actividad Creado:');
          alert('Se actualizo la actividad');
        },
        (error) => {
          console.error('Error al crear el Proyecto:', error);
          alert('¡Hubo un error!');
        }
    );
    }else{
      if (this.actForm.valid){
        const estadoControl = this.actForm.get('estado');
        if (estadoControl) {
            const estadoValue = estadoControl.value ? 1 : 0;
            actData.estado = estadoValue;
        }
        actData.id_p = this.id_p;
        this.actividadService.crearAct(actData).subscribe(
          (response) => {
            console.log('Solicitud POST exitosa', response);
            alert('¡Se creo la actividad!');
          },
          (error) => {
            console.error('Error en la solicitud POST', error);
            alert('¡Hubo un error!');
          }
        );
      } 
    } 
    this.location.back();
  }*/
  crearAct() {
    const actData = this.actForm.value;
    console.log(actData)
    // Obtener el usuario seleccionado del formulario
    const selectedUser = this.usuario.find(user => user.usuario === actData.id_u);
    console.log(selectedUser)
  
    // Verificar si se encontró un usuario seleccionado
    
      // Obtener el id del usuario seleccionado
      const userId = selectedUser?.id_u;
  
      if (this.id !== null && this.id !== 0) {
        // Actualizar la actividad
        //actData.id_p = this.id_p;
        this.actividadService.updateAct(this.id, { ...actData, id_u: userId }).subscribe(
          act => {
            console.log('Actividad Actualizada:', act);
            alert('Se actualizó la actividad');
          },
          error => {
            console.error('Error al actualizar la actividad:', error);
            alert('¡Hubo un error al actualizar la actividad!');
          }
        );
      } else {
        if (this.actForm.valid) {
          // Asignar el id del usuario seleccionado al campo id_u de actData
          actData.id_u = userId;
          actData.id_p = this.id_p;
          // Crear la actividad
          this.actividadService.crearAct(actData).subscribe(
            response => {
              console.log('Actividad Creada:', response);
              alert('¡Se creó la actividad exitosamente!');
            },
            error => {
              console.error('Error al crear la actividad:', error);
              alert('¡Hubo un error al crear la actividad!');
            }
          );
        }
      } //this.router.navigate(['/proyecto/',this.id_p]);
    
  
    // Regresar a la página anterior después de crear o actualizar la actividad
    
  }
  

  eliminar(id: any) {
    this.actividadService.eliminar(id).subscribe(
      (response) => {
        console.log('Actividad eliminado:', response);
        alert('¡Se a eliminado la actividad!');
      },
      (error) => {
        console.error('Error al eliminar el Proyecto:', error);
        alert('¡Hubo un error!');
      }
    );
  }

  irAtras(): void {
    //this.location.back();
    this.router.navigate(['/proyecto/',this.id_p]);
  }

  equipo(): any[]{
    if (this.id_p) {
      try {
        this.integranteService.getIntegrantes(this.id_p).subscribe(usuario => {
          this.usuario = usuario;
          console.log(this.usuario)
        })
      } catch (error) {
        console.error('Error', error);
      }
    }
    return this.usuario;
  }

  equipoA(id: number): any[]{
    if (id) {
      try {
        this.integranteService.getIntegrantes(this.id).subscribe(usuario => {
          this.usuario = usuario;
          console.log(this.usuario)
        })
      } catch (error) {
        console.error('Error', error);
      }
    }
    return this.usuario;
  }

  

}