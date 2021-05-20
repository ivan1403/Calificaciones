import { Component, Injectable, OnInit } from '@angular/core';
import { NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators ,ReactiveFormsModule} from '@angular/forms';
import {ModalSelRefCondComponent} from '../../modals/modal-sel-ref-cond/modal-sel-ref-cond.component';
import { DatePipe } from '@angular/common';
import {NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { templateJitUrl } from '@angular/compiler';
import { RefCondDataService } from '../../../../services/ref-cond-data.service';
import { ProcesoService } from '../../../../services/proceso.service';
import {Proceso} from '../../../../models/proceso'
import {ProcesoSemanal} from '../../../../models/procesoSemanal'
import { ApiResult } from '../../../../models/common/apiResult';
import {ProcesosComponent} from '../../../procesos/pages/procesos/procesos.component'
import { ToastrService } from 'ngx-toastr';
import { EMPTY } from 'rxjs';
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day : parseInt(date[0], 10),
        month : parseInt(date[1], 10),
        year : parseInt(date[2], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
  }
}

@Component({
  selector: 'app-modal-tareas',
  templateUrl: './modal-tareas.component.html',
  styleUrls: ['./modal-tareas.component.css'],
  providers: [
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class ModalTareasComponent implements OnInit {

  constructor(private modalService: NgbModal,public modalActive: NgbActiveModal, private refcondData:RefCondDataService,
    private procesoService:ProcesoService, private toastr: ToastrService) { }

  procesoNuevo:any= new Proceso;
  procesoSemana:any= new ProcesoSemanal;

  DiasSemana: Array<any> = [
    { name: 'Lunes', value: 'Lunes',checked:false },
    { name: 'Martes', value: 'Martes' ,checked:false },
    { name: 'Miercoles', value: 'Miercoles' ,checked:false },
    { name: 'Jueves', value: 'Jueves' ,checked:false },
    { name: 'Viernes', value: 'Viernes',checked:false  },
    { name: 'Sábado', value: 'Sábado',checked:false  },
    { name: 'Domingo', value: 'Domingo',checked:false  }
];

  InputselRefCond:string;
  reglarefCondSelected:any;
  reglarefCondSelectedLocal:any

  btnAbrirModalSelRefCond:boolean=true;
  inputAbrirModalSelRefCond:boolean=true;

  SelHoraInicio = {hour: 0, minute: 0};
  SelHoraFin = {hour: 0, minute: 0};
  HoraInicio:any;
  HoraFin:any;
  checkboxHoraFin:boolean=false;

  FrecuenciaSelected:string;
  SelectFrecuencia:any
  
  InputHoraInicio:boolean=false;
  InputFechaInicio:boolean=false;
  inputHoraFin:boolean=false;
  InputCheckboxHoraFin=false;
  FrecuenciaHora:boolean=false;
  FrecuenciaDiario:boolean=false;
  FrecuenciaSemanal:boolean=false;
  FrecuenciaMensual:boolean=false;
  FrecuenciaManual:boolean=false;
  RepetirDiasSemana:string;
  RepetirHora:string;
  RepetirDia:string;
  RepetirMes:string;

  FechaInicio: any;
  Comentarios:any;
  
  FormValido=false;

  ngOnInit(): void {
   this.reglarefCondSelected=null;  
  }

  abrirModalSelRefCond() {
    this.refcondData.SelectTipo("Nueva");
    const modalSelRefCondComponent = this.modalService.open(ModalSelRefCondComponent, {ariaLabelledBy: 'modal-basic-title',size: 'md' , backdrop: 'static'});
    
    modalSelRefCondComponent.result.then((result) => {

    }, (reason) => {
       this.CargarRefCondSelected();          
    });
  }

  onTimeChangeSelectHoraInicio(value:{hour:string,minute:string})
  {
    let formattedDate=Date.parse('01-01-00'+value.hour+':'+value.minute+':00'); 
    const datepipe: DatePipe = new DatePipe('en-US')
    this.HoraInicio= datepipe.transform(formattedDate, 'HH:mm');   
  }

  onTimeChangeSelectHoraFin(value:{hour:string,minute:string})
  {
    let formattedDate=Date.parse('01-01-00'+value.hour+':'+value.minute+':00'); 
    const datepipe: DatePipe = new DatePipe('en-US')
    this.HoraFin= datepipe.transform(formattedDate, 'HH:mm');   
  }

  HoraFinDeshabilitado()
  {
     this.HoraFin=undefined
     this.SelHoraFin = {hour: 0, minute: 0};
  }
  
  onChangeCheckboxDiaSemana(e) {
    let DiasSemanaSeleccionado = [];
    this.DiasSemana.forEach((d) => {
      if(d.name==e.target.value)
      {
        d.checked=!(d.checked);   
      }
    });
    this.DiasSemana.filter(d =>d.checked===true).forEach((d) => {
      DiasSemanaSeleccionado.push(d.name); 
    });
    this.RepetirDiasSemana=DiasSemanaSeleccionado.join(', ');
  }  

  onChangeFrecuenciaSelect(e){
    this.FrecuenciaSelected=e.target.value;
    switch (e.target.value) {
      case 'Hora':
        this.FrecuenciaHora =true;
        this.FrecuenciaDiario=false;
        this.FrecuenciaSemanal=false;
        this.FrecuenciaMensual=false;

        this.InputFechaInicio=true;
        this.InputHoraInicio=true;
        this.InputCheckboxHoraFin=true;        

        this.RepetirDia='';
        this.RepetirDiasSemana='';
        this.RepetirMes='';     
        this.DiasSemana.forEach((d) => {{d.checked=false;}});        
        break;
      case 'Diario':
        this.FrecuenciaDiario=true;
        this.FrecuenciaHora =false;
        this.FrecuenciaSemanal=false;
        this.FrecuenciaMensual=false;

        this.InputFechaInicio=true;
        this.InputHoraInicio=true;
        this.InputCheckboxHoraFin=true;

        this.RepetirHora='';
        this.RepetirDiasSemana='';
        this.RepetirMes='';
        this.DiasSemana.forEach((d) => {{d.checked=false;}});
        break;
      case 'Semanal':
        this.FrecuenciaSemanal=true;
        this.FrecuenciaHora =false;
        this.FrecuenciaDiario=false;
        this.FrecuenciaMensual=false;

        this.InputFechaInicio=true;
        this.InputHoraInicio=true;
        this.InputCheckboxHoraFin=true;

        this.RepetirHora='';
        this.RepetirDia='';
        this.RepetirMes='';
        break;
      case 'Mensual':
        this.FrecuenciaMensual=true;
        this.FrecuenciaHora =false;
        this.FrecuenciaDiario=false;
        this.FrecuenciaSemanal=false;
        
        this.InputFechaInicio=true;
        this.InputHoraInicio=true;
        this.InputCheckboxHoraFin=true;

        this.RepetirHora='';
        this.RepetirDia='';
        this.RepetirDiasSemana='';
        this.DiasSemana.forEach((d) => {{d.checked=false;}});
        break;     
        case 'Manual':
        this.FrecuenciaMensual=false;
        this.FrecuenciaHora =false;
        this.FrecuenciaDiario=false;
        this.FrecuenciaSemanal=false;
        
        this.InputFechaInicio=false;
        this.InputHoraInicio=false;
        this.inputHoraFin=false;
        this.InputCheckboxHoraFin=false;
        this.checkboxHoraFin=false;
        this.HoraInicio=undefined;
        this.HoraFin=undefined;
        this.FechaInicio='';
        this.SelHoraInicio = {hour: 0, minute: 0};
        this.SelHoraFin = {hour: 0, minute: 0};
        
        this.RepetirHora='';
        this.RepetirDia='';
        this.RepetirDiasSemana='';
        this.RepetirMes='';
        this.DiasSemana.forEach((d) => {{d.checked=false;}});
        break;
    }
  }

  CargarRefCondSelected(){

    this.refcondData.reglaRefCondNueva.subscribe(reglarefCondSelected=>this.reglarefCondSelected=reglarefCondSelected)
    this.reglarefCondSelectedLocal=this.reglarefCondSelected
    if(this.reglarefCondSelected.nombreCondicion!=undefined)
    this.InputselRefCond=this.reglarefCondSelectedLocal.nombreCondicion+ ' / ' +this.reglarefCondSelectedLocal.referenciaCondicion
    this.refcondData.ClearReglaRefCond();    

  }

  LimpiarForm(){

    this.FrecuenciaMensual=false;
    this.FrecuenciaHora =false;
    this.FrecuenciaDiario=false;
    this.FrecuenciaSemanal=false;
    
    this.InputselRefCond=undefined;
    this.reglarefCondSelectedLocal=undefined;
   // this.refcondData.ClearReglaRefCond();
    this.FrecuenciaSelected=undefined   
    this.SelectFrecuencia=undefined
    this.InputFechaInicio=false;
    this.InputHoraInicio=false;
    this.inputHoraFin=false;
    this.InputCheckboxHoraFin=false;
    this.checkboxHoraFin=false;
    this.HoraInicio=undefined;
    this.HoraFin=undefined;
    this.FechaInicio='';
    this.SelHoraInicio = {hour: 0, minute: 0};
    this.SelHoraFin = {hour: 0, minute: 0};
    
    this.Comentarios=''
    this.RepetirHora='';
    this.RepetirDia='';
    this.RepetirDiasSemana='';
    this.RepetirMes='';
    this.DiasSemana.forEach((d) => {{d.checked=false;}});
  }

  AgregarNuevoProceso(){
    //validar
    this.ValidarForm()

    //Preparar datos
    if(this.FormValido){
      let DiasSemana:any=undefined;
      if(this.RepetirDiasSemana.length!=0){
        DiasSemana=this.RepetirDiasSemana.replace(/\s/g, '').split(",");
      }
    let RefCond=this.reglarefCondSelectedLocal.idCondicion

     let Comentarios=this.Comentarios
     if(this.Comentarios==undefined)
     {
       Comentarios='';
     }
    let Frecuencia= this.FrecuenciaSelected
    const datepipe: DatePipe = new DatePipe('en-US')    

    let FechaInicio:any; 

    if(this.FechaInicio!=undefined ||this.FechaInicio!='' )
    {
      let UnformatedFechaInicio=    Date.parse(this.FechaInicio.year+'-'+this.FechaInicio.month +'-'+this.FechaInicio.day)
      FechaInicio= datepipe.transform(UnformatedFechaInicio, 'yyyy-MM-dd'); 
    }else{FechaInicio=null}

    let HoraInicio:any
    if(this.HoraInicio!=undefined){
      HoraInicio='2001-01-01T'+this.HoraInicio
    }else{HoraInicio=null}

    let HoraFin:any
    if(this.HoraFin!=undefined )
    {
      HoraFin='2001-01-01T'+this.HoraFin 
    }else{HoraFin=null}

    let RepetirDia:any;
    if(this.RepetirDia!=''){
      RepetirDia=this.RepetirDia;
    }
    let RepetirHora:any;
    if(this.RepetirHora!=''){
      RepetirHora=this.RepetirHora;
    }
    let RepetirMes:any;
    if(this.RepetirMes!=''){
      RepetirMes=this.RepetirMes;
    }

    this.procesoNuevo.idCondicion=RefCond
    this.procesoNuevo.comentario=Comentarios
    this.procesoNuevo.frecuencia=Frecuencia
    this.procesoNuevo.fechaInicio=FechaInicio
    this.procesoNuevo.horaInicio=HoraInicio
    this.procesoNuevo.horaFin=HoraFin
    this.procesoNuevo.repetirHora=RepetirHora
    this.procesoNuevo.repetirDia=RepetirDia
    this.procesoNuevo.repetirDiaMes=RepetirMes

    //agregar
    this.procesoService.agregarproceso(this.procesoNuevo).then((response: ApiResult)=>{
      this.LimpiarForm()
      if(DiasSemana!=undefined){
        DiasSemana.forEach((d) => {      
          this.procesoSemana.dia=d
          this.procesoSemana.idTarea=response.objModResultado.id
          this.procesoService.agregarprocesoSemana(this.procesoSemana).then((response: ApiResult)=>{
  
           }, error=> {
            console.log(error);
          })
        });
      }
      this.toastr.success("Se agrego tarea exitosamente.");
      }, error=> {
        console.log(error);
        this.toastr.error("Ocurrio un error al agregar tarea.");
    });
    }
    else{
      this.toastr.error("Verifique los campos.");
    }
    
  }

  ValidarForm(){
    this.FormValido=true;
    if(this.reglarefCondSelectedLocal==undefined){
      this.FormValido=false;
    }
    if(this.FrecuenciaSelected==undefined){
      this.FormValido=false;
    }
    if(this.FrecuenciaSelected!='Manual'){
      if(this.FechaInicio=='' || this.FechaInicio==undefined){ 
        this.FormValido=false;
      }
      if(this.HoraInicio=='' || this.HoraInicio==undefined){ 
        this.FormValido=false;
      }
      if(this.checkboxHoraFin==true){ 
        if(this.HoraFin=='' || this.HoraFin==undefined){ 
          this.FormValido=false;
        }
      }
    }
    if(this.FrecuenciaSelected=='Diario'){
      if(this.RepetirDia==undefined || this.RepetirDia=='' )
      {
        this.FormValido=false;
      }
    }
    if(this.FrecuenciaSelected=='Semanal'){
      if(this.RepetirDiasSemana==undefined || this.RepetirDiasSemana=='' )
      {
        this.FormValido=false;
      }
    }
    if(this.FrecuenciaSelected=='Mensual'){
      if(this.RepetirMes==undefined || this.RepetirMes=='' )
      {
        this.FormValido=false;
      }
    }
    if(this.FrecuenciaSelected=='Hora'){
      if(this.RepetirHora==undefined || this.RepetirHora=='' )
      {
        this.FormValido=false;
      }
    }
 
  }


}
