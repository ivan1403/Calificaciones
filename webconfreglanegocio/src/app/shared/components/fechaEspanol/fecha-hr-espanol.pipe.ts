import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

enum meses {
  Enero,
  Febrero,
  Marzo,
  Abril,
  Mayo,
  Junio,
  Julio,
  Agosto,
  Septiembre,
  Octubre,
  Noviembre,
  Diciembre
}

@Pipe({
  name: 'fechaHrEspanol'
})
export class FechaHrEspanolPipe implements PipeTransform {

  transform(date: Date) {
    let  d = new Date(date);

    const datepipeHoraCompleta: DatePipe = new DatePipe('en-US')
    
     const dayOfMonth = d.getDate();
     const nameOfMonth = meses[d.getMonth()];
     const year = d.getFullYear();
     const hour = d.getHours();
     const minutes = d.getMinutes();
     const seconds = d.getSeconds();
     
     const result =dayOfMonth + '-' + nameOfMonth + '-' + year + ' '+datepipeHoraCompleta.transform(d, 'HH:mm:ss');


   return result;
}

}
