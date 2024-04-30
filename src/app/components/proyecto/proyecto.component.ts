import { Username, Integrante } from './../../models/integrante';
import { IntegrantesService } from './../../service/integrantes.service';
import { Proyecto } from './../../models/proyecto';
import { ProyectoService } from './../../service/proyecto.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Actividad } from 'src/app/models/actividad';
import { ActividadService } from 'src/app/service/actividad.service';
import { Location } from '@angular/common';
import { debounceTime, distinct, filter, map, switchMap, tap, Subscription, fromEvent } from 'rxjs';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit, OnDestroy {
  @ViewChild('userSearch', {static : true}) userSearch!: ElementRef
  proyecto: Proyecto[] = [];
  proyectod: any[]=[];
  proyectoForm: FormGroup;
  act: any[] = [];
  actForm: FormGroup;
  usuario: any[]=[];
  id_u: number| null
  id_p: number| null
  Datosusuario: any;
  Datos: any;
  disableInputs: boolean = false;
  integrantes: Username[]=[]
  nuevoIntegrante: Integrante = {
    id_p: 0, 
    id_u: 0   
  };
  usuariosAdd: any []=[]
  searchSubscription!: Subscription
  searchTerm: string = '';

  constructor(
    private proyectoService: ProyectoService,
    private fb: FormBuilder,
    private actividadService: ActividadService,
    private fba: FormBuilder,
    private aRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private integranteService: IntegrantesService
  ) {
    this.proyectoForm = this.fb.group({
      nom_p: ['', Validators.required],
      des_p: ['', Validators.required],
      fecha_i: ['',[Validators.required, this.fechaValidaValidator()]],
      fecha_f: ['',[Validators.required, this.fechaValidaValidator()]], 
    });
    this.actForm = this.fba.group({
      id: [''],
      id_p: [''],
      id_u:[''],
      nom_a: [''],
      des_a: [''],
      estado: [''],
      fecha_fin: [''],
      notas: [''],
      usuario:[''], 
    });
    this.id_u = null;
    this.id_p = null;
  }

  ngOnInit() :void{
    this.Datosusuario = sessionStorage.getItem('userData');
    this.Datos = JSON.parse(this.Datosusuario);
    const primerUsuario = this.Datos[0];
    console.log(this.Datos)
    this.Datosusuario = sessionStorage.getItem('userData');
    this.id_u = primerUsuario.id_u;

    this.disableInputs = this.esUsuarioUno();
  

  if (!this.Datos) {
    // Redirigir al usuario a la página de error
    this.router.navigate(['/error403']);
  }

    this.id_p = Number(this.aRoute.snapshot.paramMap.get('id'));
    if (this.id_p) {
      this.getProyectoId(this.id_p);
      this.getMisAct(this.id_p);
    } 

    this.searchSubscription=fromEvent<Event>(this.userSearch.nativeElement, 'keyup').pipe(
      map((event: Event) =>{
        const searchTerm = (event.target as HTMLInputElement).value;
        return searchTerm
      }),
      filter((searchTerm: string) => searchTerm.length > 3),
      debounceTime(500),
      distinct(),
      switchMap((searchTerm: string)=> this.integranteService.getUsers(searchTerm))
    ).subscribe((integrantes: Username[])=> {
      this.integrantes = integrantes !== undefined ? integrantes : [];
      //this.participantes= this.integrantes[0];
      console.log(this.integrantes)
    })
    this.equipo()
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe()
    
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
 
  getProyectoId(id: number): void {
    this.proyectoService.getProyecto(id).subscribe(
      (proyecto) => {
        if(proyecto && proyecto.length > 0){ // Verifica si proyecto es un array y tiene al menos un elemento
          const primerProyecto = proyecto[0]; // Accede al primer elemento del array
          this.proyecto = proyecto;
          console.log(primerProyecto);
          const fechaInicio = new Date(primerProyecto.fecha_i);
          const fechaFin = new Date(primerProyecto.fecha_f);
          const fechaInicioFormateada = fechaInicio.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('-');
          const fechaFinFormateada = fechaFin.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('-');
          this.proyectoForm.patchValue({
            nom_p: primerProyecto.nom_p,
            des_p: primerProyecto.des_p,
            fecha_i: fechaInicioFormateada,
            fecha_f: fechaFinFormateada,
          });
        }
      },
      (error) => {
        console.error('Error al obtener el proyecto:', error);
      }
    );
  }
  createProyecto() {
    const proyectoData = this.proyectoForm.value;
    proyectoData.id_u = this.id_u;
    console.log('create',this.id_u)
    if(this.id_p !== null && this.id_p !== 0){
      const pryectoData=this.proyectoForm.value
      this.proyectoService.updateProyeto(this.id_p, proyectoData).subscribe( proyecto => {
          console.log('Proyecto Actualizado');
          alert('¡El proyecto se ha actualizado correctamente!');
        },
        (error) => {
          console.error('Error al actualizar el Proyecto:', error);
          alert('¡Hubo un error al actualizar el proyecto!');
        }
    );
    }else{
      if (this.proyectoForm.valid){
        this.proyectoService.createProyecto(proyectoData).subscribe(
          (response) => {
            console.log('Solicitud POST exitosa', response);
            alert('¡El proyecto se ha creado correctamente!');
            this.id_p = response;
          },
          (error) => {
            console.error('Error en la solicitud POST', error);
            alert('¡Hubo un error al crear el proyecto!');
          }
        );
      } 
    } 
  }

  
  deleteProyecto(id: any) {
    this.proyectoService.deleteProyecto(id).subscribe(
      (response) => {
        console.log('Proyecto eliminado:', response);
        alert('El Proyecto se ha eliminado');
      },
      (error) => {
        console.error('Error al eliminar el Proyecto:', error);
        alert('El proyecto no se pudo eliminar');
      }
    );
  }

  getMisAct(idp:any){
    try{
      console.log('el id de la actividad es:',idp)
      this.actividadService.getProyectAct(idp).subscribe(act => {
        this.act = act;
        console.log('los valores son',act)
      },
      error => {
        console.error('Error al obtener datos:', error);
      } )
    }catch{
      //this.id_p = 0
      console.log('no existe');
    }
    
  }
  eliminar(id: any) {
    this.actividadService.eliminar(id).subscribe(
      (response) => {
        console.log('Proyecto eliminado:', response);
        alert('Se elimino el proyecto');
        this.getMisAct(this.id_p);
      },
      (error) => {
        console.error('Error al eliminar el Proyecto:', error);
        alert('¡Hubo un error al eliminar el proyecto!');
      }
    );
  }
  openForEdit(act: any) {
    this.router.navigate(['/actividades', act.id_a], { state: { act } });
  }

  irAtras(): void {
    //this.location.back();
    if (this.id_u === 1) {
      this.router.navigate(['/equipo']); // Si id_u es igual a 1, navega a '/equipo'
    } else {
      this.router.navigate(['/homeuser']); // Si id_u es diferente de 1, navega a '/homeuser'
    }
  
  }

  esUsuarioUno(): boolean {
    return this.id_u === 1;
  }

  equipo(): any[]{
    try{
      this.integranteService.getIntegrantes(this.id_p).subscribe(usuario =>{
        this.usuario=usuario;
        console.log(this.usuario)
      })
    }catch (error){
      console.error('Error', error);
    }
    return this.usuario
  }

  
  addUser(id: number) {
    this.nuevoIntegrante.id_u = id;
    this.nuevoIntegrante.id_p = this.id_p!; 

    console.log(this.nuevoIntegrante);
    const equipoCompleto = this.equipo();
    
    // Verificar si el nuevo integrante ya existe en el equipo
    const integranteExistente = equipoCompleto.some(integrante => 
        integrante.id_u === this.nuevoIntegrante.id_u 
    );

    if (integranteExistente) {
        alert('El integrante ya existe en el equipo.');
        return;
    }

    // Si el integrante no existe, proceder con la solicitud POST
    this.integranteService.addIntegrantes(this.nuevoIntegrante).subscribe(
        (response) => {
            console.log('Solicitud POST exitosa', response);
            alert('¡Se agregó un nuevo colaborador!');
            this.equipo()
        },
        (error) => {
            console.error('Error en la solicitud POST', error);
            alert('¡Hubo un error al agregar al usuario!');
        }
    );

    this.searchTerm = '';
    this.integrantes = [];
    this.equipo()
    
}

eliminarI(id_u: number) {
  this.integranteService.eliminarI(this.id_p!, id_u).subscribe(
    (response) => {
      console.log('Integrante eliminado:', response);
      alert('Se eliminó al colaborador');
      this.equipo();
    },
    (error) => {
      console.error('Error al eliminar al colaborador:', error);
      alert('¡Hubo un error al eliminar al colaborador!');
    }
  );
}

  

  
}