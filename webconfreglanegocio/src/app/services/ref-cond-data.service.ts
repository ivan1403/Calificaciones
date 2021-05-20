import { Injectable } from '@angular/core';
import { EMPTY, empty } from 'rxjs';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class RefCondDataService {
 
  private tiposrc=new BehaviorSubject("")
  tipo:any =this.tiposrc.asObservable();


   
private reglaselect = new BehaviorSubject<any>([]);
reglaRefCond:any =this.reglaselect.asObservable();

private reglaselectNueva = new BehaviorSubject<any>([]);
reglaRefCondNueva:any =this.reglaselectNueva.asObservable();


  constructor() { }
  
  SelectRegla(reglaRefCond:any){
    this.reglaselect.next(reglaRefCond)
  }

  SelectReglaNueva(reglaRefCond:any){
    this.reglaselectNueva.next(reglaRefCond)
  }

  SelectTipo(tipo:any){
    this.tipo=tipo;
  }

  ClearReglaRefCond(){
    this.reglaselectNueva.next(EMPTY);
  }
}
