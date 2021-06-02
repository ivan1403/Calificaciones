import { Component, Injectable, OnInit } from '@angular/core';
import { NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators ,ReactiveFormsModule, NumberValueAccessor} from '@angular/forms';
import {ModalSelRefCondComponent} from '../../../../shared/modals/modal-sel-ref-cond/modal-sel-ref-cond.component';
import { DatePipe } from '@angular/common';
import {NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { templateJitUrl } from '@angular/compiler';
import { ProcesoService } from '../../../../services/proceso.service';
import {Proceso} from '../../../../models/proceso'
import {ProcesoSemanal} from '../../../../models/procesoSemanal'
import { ApiResult } from '../../../../models/common/apiResult';
import {ProcesosComponent} from '../../pages/procesos/procesos.component'
import { RefCondService } from '../../../../services/ref-cond.service';
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

  constructor(private modalService: NgbModal,public modalActive: NgbActiveModal,
    private procesoService:ProcesoService, private toastr: ToastrService, private refCondService:RefCondService) { }

  procesoNuevo:any= new Proceso;
  procesoSemana:any= new ProcesoSemanal;
  procesoEditar:any= new Proceso;

  Modificando:boolean = false;

  DiasSemana: Array<any> = [
    { name: 'Lunes', value: 'Lunes',checked:false },
    { name: 'Martes', value: 'Martes' ,checked:false },
    { name: 'Miércoles', value: 'Miércoles' ,checked:false },
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

  ReferenciaRequerido:boolean=false;
  FrecuenciaRequerido:boolean=false;
  FechaInicioRequerido:boolean=false;
  HoraInicioRequerido:boolean=false;
  HoraFinRequerido:boolean=false;
  RepetirHoraRequerido:boolean=false;
  RepetirDiaRequerido:boolean=false;
  RepetirMesRequerido:boolean=false;
  RepetirSemanaRequedio:boolean=false;
  ComentariosRequerido:boolean=false;
  ComentariosSobrepasa:boolean=false;
  comentarioLimite:number

  ngOnInit(): void {
   this.reglarefCondSelected=null;  
  }

  abrirModalSelRefCond() {
   // this.refcondData.SelectTipo("Nueva");
    const modalSelRefCondComponent = this.modalService.open(ModalSelRefCondComponent, {ariaLabelledBy: 'modal-basic-title',size: 'md' , backdrop: 'static'});
    modalSelRefCondComponent.componentInstance.modaltitulo="Búsqueda Referencia / Condición";
    modalSelRefCondComponent.componentInstance.labelInputDescripcion="Referencia / Condición";
    modalSelRefCondComponent.componentInstance.evt.subscribe(arg=>{
     // console.log(arg)
      this.CargarRefCondSelected(arg)
    })
    modalSelRefCondComponent.result.then((result) => {

    }, (reason) => {

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
    this.FrecuenciaRequerido=false;
    this.FechaInicioRequerido=false;
    this.HoraInicioRequerido=false;
    this.HoraFinRequerido=false;
    this.RepetirHoraRequerido=false;
    this.RepetirDiaRequerido=false;
    this.RepetirMesRequerido=false;
    this.RepetirSemanaRequedio=false;
    if(e.target)
    {this.FrecuenciaSelected=e.target.value;}
    else{this.FrecuenciaSelected=e
    //console.log(e)
    }

    switch (this.FrecuenciaSelected) {
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

  CargarRefCondSelected(reglaRefCond:any){
    this.reglarefCondSelectedLocal=reglaRefCond
    if(this.reglarefCondSelectedLocal.nombreCondicion!=undefined)
    this.InputselRefCond=this.reglarefCondSelectedLocal.nombreCondicion+ ' / ' +this.reglarefCondSelectedLocal.referenciaCondicion
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
    //console.log(this.reglarefCondSelectedLocal)
    //Preparar datos
    if(this.FormValido){
      let DiasSemana:any=undefined;
      if(this.RepetirDiasSemana.length!=0){
        DiasSemana=this.RepetirDiasSemana.replace(/\s/g, '')
        if(!this.RepetirDiasSemana.includes(',')){
          DiasSemana=DiasSemana+','
        }
        //DiasSemana=this.RepetirDiasSemana.replace(/\s/g, '').split(",");
       
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
    if(this.FechaInicio!=undefined)
    {
      if(this.FechaInicio!=''){
        let UnformatedFechaInicio=  this.FechaInicio.year+'-'+this.FechaInicio.month +'-'+this.FechaInicio.day

        FechaInicio= datepipe.transform(UnformatedFechaInicio, 'yyyy-MM-dd'); 
      }


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
    //agregar
    if(!this.Modificando)
    {
      this.procesoNuevo.idCondicion=RefCond
      this.procesoNuevo.comentario=Comentarios
      this.procesoNuevo.frecuencia=Frecuencia
      this.procesoNuevo.fechaInicio=FechaInicio
      this.procesoNuevo.horaInicio=HoraInicio
      this.procesoNuevo.horaFin=HoraFin
      this.procesoNuevo.repetirHora=RepetirHora
      this.procesoNuevo.repetirDia=RepetirDia
      this.procesoNuevo.repetirDiaMes=RepetirMes
      this.procesoNuevo.diasSemana=DiasSemana

      this.procesoService.agregarproceso(this.procesoNuevo).then((response: ApiResult)=>{
        this.LimpiarForm()
        this.toastr.success("Se agregó tarea exitosamente.");

        }, error=> {
          console.log(error);
          this.toastr.error("Ocurrió un error al agregar la tarea.");
      });
    }
    else{
      
    //modificar
      this.procesoEditar.idCondicion=RefCond
      this.procesoEditar.comentario=Comentarios
      this.procesoEditar.frecuencia=Frecuencia
      this.procesoEditar.fechaInicio=FechaInicio
      this.procesoEditar.horaInicio=HoraInicio
      this.procesoEditar.horaFin=HoraFin
      this.procesoEditar.repetirHora=RepetirHora
      this.procesoEditar.repetirDia=RepetirDia
      this.procesoEditar.repetirDiaMes=RepetirMes
      this.procesoEditar.diasSemana=DiasSemana
   //  console.log(this.procesoEditar)
     
      this.procesoService.ModificarProceso(this.procesoEditar).then((response: ApiResult)=>{

        this.LimpiarForm()
        this.modalActive.dismiss()
        this.toastr.success("Se actualizó tarea exitosamente.");
        }, error=> {
          console.log(error);
          this.toastr.error("Ocurrió un error al actualizar la tarea.");
        });

      }
    }
    else{
      this.toastr.error("Verifique los campos.");
    }
    
  }

  ValidarForm(){

    this.FormValido=true;
    this.ReferenciaRequerido=false;
    this.FrecuenciaRequerido=false;
    this.FechaInicioRequerido=false;
    this.HoraInicioRequerido=false;
    this.HoraFinRequerido=false;
    this.RepetirHoraRequerido=false;
    this.RepetirDiaRequerido=false;
    this.RepetirMesRequerido=false;
    this.RepetirSemanaRequedio=false;
    this.ComentariosRequerido=false;
    this.ComentariosSobrepasa=false;

    if(this.reglarefCondSelectedLocal== undefined){
        this.ReferenciaRequerido=true;
         this.FormValido=false;
    }
    if(this.InputselRefCond== undefined){
        this.FormValido=false;     
        this.ReferenciaRequerido=true;
    }
    if(this.FrecuenciaSelected==undefined){
      this.FormValido=false;
      this.FrecuenciaRequerido=true;
    }
    if(this.FrecuenciaSelected!='Manual' && this.FrecuenciaSelected!=undefined){
     
      if(this.FechaInicio=='' || this.FechaInicio==undefined){ 
        this.FormValido=false;
        this.FechaInicioRequerido=true;
      }
      if(this.HoraInicio=='' || this.HoraInicio==undefined){ 
        this.FormValido=false;
        this.HoraInicioRequerido=true;
      }
      if(this.checkboxHoraFin==true){ 
        if(this.HoraFin=='' || this.HoraFin==undefined){ 
          this.FormValido=false;
          this.HoraFinRequerido=true;
        }
      }
    }
    if(this.FrecuenciaSelected=='Diario'){
      if(this.RepetirDia==undefined || this.RepetirDia=='' )
      {
        this.FormValido=false;
        this.RepetirDiaRequerido=true;
      }
    }
    if(this.FrecuenciaSelected=='Semanal'){
      if(this.RepetirDiasSemana==undefined || this.RepetirDiasSemana=='' )
      {
        this.FormValido=false;
        this.RepetirSemanaRequedio=true;
      }
    }
    if(this.FrecuenciaSelected=='Mensual'){
      if(this.RepetirMes==undefined || this.RepetirMes=='' )
      {
        this.FormValido=false;
        this.RepetirMesRequerido=true;
      }
    }
    if(this.FrecuenciaSelected=='Hora'){
      if(this.RepetirHora==undefined || this.RepetirHora=='' )
      {
        this.FormValido=false;
        this.RepetirHoraRequerido=true;
      }
    }

    if(this.Comentarios==null || this.Comentarios==undefined || this.Comentarios.trim()==''){
      this.FormValido=false;
      this.ComentariosRequerido=true;
    }
    if(this.Comentarios!=undefined){
      if(this.Comentarios.length>1000 )
      {
        this.FormValido=false;
        this.ComentariosSobrepasa=true;
        this.comentarioLimite=this.Comentarios.length-1000
      }
    }

 
  }

  ModificarDatos(procesoAbuscar:any){

    this.Modificando=true;

    this.procesoService.CargarDatosEditar(procesoAbuscar.idTarea).then((response: ApiResult)=>{
    if(response.objModResultado.error){
      this.toastr.error(response.objModResultado.mensajeError,'Error al cargar datos');
    }else{
      this.procesoEditar=response.result[0];
      this.CargarRefCondxId(this.procesoEditar.idCondicion)           
     // this.InputselRefCond=this.reglarefCondSelectedLocal.nombreCondicion;
      this.Comentarios=this.procesoEditar.comentario;
      this.SelectFrecuencia=this.procesoEditar.frecuencia
      this.onChangeFrecuenciaSelect(this.procesoEditar.frecuencia);
      if(this.procesoEditar.frecuencia!="Manual"){        

      const datepipeanio: DatePipe = new DatePipe('en-US')
      const datepipemes: DatePipe = new DatePipe('en-US')
      const datepipedia: DatePipe = new DatePipe('en-US')
       
      this.FechaInicio={year:Number(datepipeanio.transform(new Date(this.procesoEditar.fechaInicio), 'yyyy')),
        month:Number(datepipemes.transform(new Date(this.procesoEditar.fechaInicio), 'MM')),
        day:Number(datepipedia.transform(new Date(this.procesoEditar.fechaInicio), 'dd'))};

      const datepipeHora: DatePipe = new DatePipe('en-US')
      const datepipeMinuto: DatePipe = new DatePipe('en-US')
      const datepipeHoraCompleta: DatePipe = new DatePipe('en-US')
      let Hora= datepipeHora.transform(this.procesoEditar.horaInicio, 'HH');   
      let Minuto= datepipeMinuto.transform(this.procesoEditar.horaInicio, 'mm');  
      this.HoraInicio= datepipeHoraCompleta.transform(this.procesoEditar.horaInicio, 'HH:mm');  
      this.SelHoraInicio = {hour: Number(Hora), minute: Number(Minuto)};

      if(this.procesoEditar.horaFin!=null){
        this.checkboxHoraFin=true
        const datepipeHora: DatePipe = new DatePipe('en-US')
        const datepipeMinuto: DatePipe = new DatePipe('en-US')
        const datepipeHoraCompleta: DatePipe = new DatePipe('en-US')
        let Hora= datepipeHora.transform(this.procesoEditar.horaFin, 'HH');   
        let Minuto= datepipeMinuto.transform(this.procesoEditar.horaFin, 'mm');  
        this.HoraFin= datepipeHoraCompleta.transform(this.procesoEditar.horaFin, 'HH:mm');  
        this.SelHoraFin = {hour: Number(Hora), minute: Number(Minuto)};
      }

      if(this.procesoEditar.frecuencia=="Diario"){
        this.RepetirDia=this.procesoEditar.repetirDia;
      }
      if(this.procesoEditar.frecuencia=="Mensual"){
        this.RepetirMes=this.procesoEditar.repetirDiaMes;
      }
      if(this.procesoEditar.frecuencia=="Hora"){
        this.RepetirHora=this.procesoEditar.repetirHora;
      }
      if(this.procesoEditar.frecuencia=="Semanal"){
        this.procesoService.CargarDatosEditarSemanal(this.procesoEditar.idTarea).then((response: ApiResult)=>{
          if(response.objModResultado.error){
            this.toastr.error(response.objModResultado.mensajeError,'Error al cargar datos');
          }else{
           // console.log(response.result);
            let diasSemana =response.result
            this.DiasSemana.forEach((D)=>{

              diasSemana.forEach((d) => {
                if(D.name==d.dia){
                  D.checked=true;
                }
               });               
            })
            let DiasSemanaSeleccionado = [];
            this.DiasSemana.filter(d =>d.checked===true).forEach((d) => {
              DiasSemanaSeleccionado.push(d.name); 
            });
            this.RepetirDiasSemana=DiasSemanaSeleccionado.join(', ');
          }
         }, error=> {
           console.log(error);
        });
      }
      }
    }
   }, error=> {
     console.log(error);
  });
  }

  CargarRefCondxId(id:number){
       this.refCondService.CargarRefCondxId(id).subscribe((refCond:ApiResult)=>{
      if(refCond.result!=null){
      this.reglarefCondSelectedLocal = refCond.result[0];
      this.InputselRefCond=this.reglarefCondSelectedLocal.nombreCondicion+ ' / ' +this.reglarefCondSelectedLocal.referenciaCondicion
      }
      else{this.reglarefCondSelectedLocal=[]}
      
    }, error=> {
      if(typeof error==="object"){
        this.toastr.error("Ocurrió un error al conectarse al servidor.");
      } else {
        this.toastr.error(error);
      }
    });
    
  }


}
