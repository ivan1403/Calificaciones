import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalExportarComponent } from '../../modals/modal-exportar/modal-exportar.component';
import { Calificacion } from '../../../../models/calificacion';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.component.html',
  styleUrls: ['./calificaciones.component.css']
})
export class CalificacionesComponent implements OnInit {

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;

  barChartData: ChartDataSets[] = [
  ];

  calificaciones: Array<Calificacion> = new Array<Calificacion>();
  alumnoMejor: string = "";
  alumnoPeor: string = "";
  promedioCalificacion: number = 0.00;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    
  }

  limpiarDatos(){
    this.calificaciones.length = 0;
    this.alumnoMejor = "";
    this.alumnoPeor = "";
    this.promedioCalificacion = 0.00;
    this.barChartLabels = [];
    this.barChartData = [];
  }

  abrirModal(){
    this.limpiarDatos();

    const modalRefImportarComponent = this.modalService.open(ModalExportarComponent, { ariaLabelledBy: 'modal-basic-title', size: 'xs', backdrop: 'static' });

    modalRefImportarComponent.result.then((result) => {
      this.calificaciones = result;
      this.formatoGrafica();
      this.obtenerAlumnoMejor();
      this.obtenerAlumnoPeor();
      this.obtenerPromedio();
    }, (reason) => {

    });
  }

  formatoGrafica(){
    let data = [];
    this.calificaciones.forEach(element => {
      data.push(element.calificacion);
      this.barChartLabels.push(element.nombre);
      element.edad = this.calcularEdad(element.fecha_nacimiento);
      element.clave = this.generarClave(element);
    });
    this.barChartData.push({data:data, label:'Calificación'});
  }

  obtenerAlumnoMejor(){
    let mejor = this.calificaciones.reduce((prev, current) => (+prev.calificacion > +current.calificacion) ? prev : current);
    this.alumnoMejor = mejor.nombre + " " + mejor.apellido_paterno + " " + mejor.apellido_materno;
  }

  obtenerAlumnoPeor(){
    let peor = this.calificaciones.reduce((prev, current) => (+prev.calificacion < +current.calificacion) ? prev : current);
    this.alumnoPeor = peor.nombre + " " + peor.apellido_paterno + " " + peor.apellido_materno;
  }

  obtenerPromedio(){
    let total = this.calificaciones.map(item => item.calificacion).reduce((prev, current) => prev + current);
    this.promedioCalificacion = (total/this.calificaciones.length);
  }

  calcularEdad(fechaNacimiento: Date){
    const convertAge = fechaNacimiento
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      return Math.floor((timeDiff / (1000 * 3600 * 24))/365);
  }

  generarClave(calificacion: Calificacion){
    let clave: string = "";
    clave = calificacion.nombre.slice(0,2);
    clave = clave + calificacion.apellido_materno.slice(-2);
    clave = clave + calificacion.edad;
    clave = clave.toUpperCase();
    clave = this.remplazarClave(clave);
    return clave;
  }

  remplazarClave(clave: string){
    let abecedario: string = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
    let abecedarioCifrado: string = "XYZABCDEFGHIJKLMNÑOPQRSTUVW";
    let abecedarioArray = abecedario.split('');
    let abecedarioCifradoArray = abecedarioCifrado.split('');
    let claveArray = clave.slice(0,4).split('');

    claveArray.forEach(element => {
      let letraIndex = abecedarioArray.findIndex(x => x == element);
      clave = clave.replace(element,abecedarioCifradoArray[letraIndex]);
    });

    return clave;
  }

  rotarClave(calificacion: Calificacion){
    let claveArray = calificacion.clave.split('');
    let claveNueva = "";

    for (let index = 0; index < calificacion.rotar; index++) {
      claveArray.push(claveArray.shift());
    }
    
    claveArray.forEach(element => {
      claveNueva = claveNueva + element;
    });

    calificacion.clave = claveNueva;
  }

}
