import { Component, OnInit } from '@angular/core';
import { NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-conf-adi-cont',
  templateUrl: './modal-conf-adi-cont.component.html',
  styleUrls: ['./modal-conf-adi-cont.component.css']
})
export class ModalConfAdiContComponent implements OnInit {

  constructor(private modalService: NgbModal, public modalActive: NgbActiveModal) { }

  InputStoredProcedure:string;
  InputOpcion:number;
  InputIdPlantilla:number;
  InputIntentoPoliza:number;
  InputIdPrueba:number;

  ngOnInit(): void {
  }

}
