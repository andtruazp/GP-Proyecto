import { Component, OnInit} from '@angular/core';
import { Actividad } from './../../models/actividad';
import { ActividadService } from './../../service/actividad.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { EstadosService } from 'src/app/service/estados.service';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css']
})
export class TareaComponent implements OnInit{
  act: Actividad[] = [];
  actForm: FormGroup;
  id_u: any;
  id_p:any;
  id: number| null
  Datosusuario: any;
  Datos: any;
  estados: any[]=[];

    constructor(
    private actividadService: ActividadService,
    private fb: FormBuilder,
    private aRoute: ActivatedRoute,
    private router: Router,
    private estadosService: EstadosService
  ){
    this.actForm = this.fb.group({
      id: [''],
      id_p: [''],
      id_u:[''],
      nom_a: [''],
      des_a: [''],
      estado: [3, Validators.required],
      fecha_fin: ['',[Validators.required, this.fechaValidaValidator()]],
      notas: [''], 
    });
    this.id = null
  }

  ngOnInit(): void {
    this.aRoute.params.subscribe(params => {
      this.id_p = params['id_p'];
      console.log('Valor de id_p en actividades:', this.id_p);
    });
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
    if (this.id) {
      this.getAct(this.id);
    }

       
    this.Datosusuario = sessionStorage.getItem('userData');
    this.Datos = JSON.parse(this.Datosusuario);
    const primerUsuario = this.Datos[0];
    console.log(this.Datos)
    this.Datosusuario = sessionStorage.getItem('userData');
    this.id_u = primerUsuario.id_u;
    console.log(this.id_u)

    this.getEstados();


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

  getAct(id: number): void {
    this.actividadService.getAct(id).subscribe(
      (act) => {
        if(act && act.length > 0){ // Verifica si act es un array y tiene al menos un elemento
          const actd = act[0]; // Accede al primer elemento del array
          this.act = act;
          console.log(actd);
          const fechaFin = new Date(actd.fecha_fin);
          const fechaFinFormateada = fechaFin.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/').reverse().join('-');
          this.actForm.patchValue({
            id_u: actd.id_u,
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

terminar(){
  const actData = this.actForm.value;
  this.actividadService.updateAct(this.id, actData).subscribe( act => {
    console.log('Actividad Creado:');
    alert('Se actualizo la actividad');
  },
  (error) => {
    console.error('Error al crear el Proyecto:', error);
    alert('¡Hubo un error!');
  }
);
}
getEstados(){
  try{
    this.estadosService.getEstados().subscribe(estados => {
      this.estados = estados;
      console.log('los valores son',this.estados)
    },
    error => {
      console.error('Error al obtener datos:', error);
    } )
  }catch{
    console.log('no existe');
  }
}




}