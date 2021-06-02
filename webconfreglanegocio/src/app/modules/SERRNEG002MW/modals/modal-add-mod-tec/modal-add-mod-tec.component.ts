import { Component, OnInit } from '@angular/core';
import { NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalConfAdiContComponent } from '../modal-conf-adi-cont/modal-conf-adi-cont.component'

@Component({
  selector: 'app-modal-add-mod-tec',
  templateUrl: './modal-add-mod-tec.component.html',
  styleUrls: ['./modal-add-mod-tec.component.css']
})
export class ModalAddModTecComponent implements OnInit {

  constructor(private modalService: NgbModal, public modalActive: NgbActiveModal) { }

  ngOnInit(): void {
  }

  AbrirModalConfAdiCont(){
    const ModalConfAdiCont = this.modalService.open(ModalConfAdiContComponent, {ariaLabelledBy: 'modal-basic-title',size: 'lg' , backdrop: 'static'});
    ModalConfAdiCont.result.then((result) => {
      console.log(result);
    }, (reason) => {

    });
  }
}
