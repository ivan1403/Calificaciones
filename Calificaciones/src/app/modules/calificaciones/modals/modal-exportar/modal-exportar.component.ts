import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';
import { Calificacion } from '../../../../models/calificacion';

@Component({
  selector: 'app-modal-exportar',
  templateUrl: './modal-exportar.component.html',
  styleUrls: ['./modal-exportar.component.css']
})
export class ModalExportarComponent implements OnInit {

  archivoASubir: File = null;
  calificaciones: Array<Calificacion> = new Array<Calificacion>();
  archivoCargado: boolean = false;

  constructor(public modalActive: NgbActiveModal,
              private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  cerrar(){
    if (this.archivoCargado) {
      this.modalActive.close(this.calificaciones);
    }else{
      this.toastr.error("Seleccione un archivo.");
    }
  }

  onChangeFile(ev){
    if (ev) {
      this.archivoCargado = true;
    }
    this.handleFileInput(ev.target.files);
    this.changeFile(ev);
  }

  handleFileInput(files: FileList) {
    this.archivoASubir = files.item(0);
  }

  changeFile(ev) {

    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary', raw: true });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
     
      this.obtenerDatos(jsonData);

    };

    reader.readAsBinaryString(file);
  }

  obtenerDatos(jsonData) {
    
    let nombreHoja = null;
    for (const property in jsonData) {
      nombreHoja = property;
      break;
    }

    let datos = jsonData[nombreHoja];

    for(let i=0; i<datos.length; i++) {
     
      let calificacion: Calificacion = new Calificacion();
        
      calificacion.nombre = datos[i]['Nombres'];
      calificacion.apellido_materno = datos[i]['Apellido Materno'];
      calificacion.apellido_paterno = datos[i]['Apellido Paterno'];
      calificacion.fecha_nacimiento = new Date(this.formatoFecha(datos[i]['Fecha de Nacimiento']));
      calificacion.grado = datos[i]['Grado'];
      calificacion.grupo = datos[i]['Grupo'];
      calificacion.calificacion = datos[i]['Calificacion'];

      this.calificaciones.push(calificacion);

    }

  }

  formatoFecha(fechaStr: string){
    var fechaSeparada = [];
    fechaSeparada = fechaStr.split('/')
    return fechaSeparada[2] + "/" + fechaSeparada[1] + "/" + fechaSeparada[0];
  }

}
