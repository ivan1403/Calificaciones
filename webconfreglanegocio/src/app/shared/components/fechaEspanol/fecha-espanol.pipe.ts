import { Pipe, PipeTransform } from '@angular/core';

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
  name: 'fechaEspanol'
})
export class FechaEspanolPipe implements PipeTransform {

  transform(date: Date) {
    let  d = new Date(date);

     const dayOfMonth = d.getDate();
     const nameOfMonth = meses[d.getMonth()];
     const year = d.getFullYear();
    //  console.log(dayOfMonth + '-' + nameOfMonth + '/' + year)
     const result =dayOfMonth + '-' + nameOfMonth + '-' + year;


   return result;
}

}
