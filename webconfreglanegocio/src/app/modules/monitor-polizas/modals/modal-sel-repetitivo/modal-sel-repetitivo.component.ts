import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RefCondService } from '../../../../services/ref-cond.service';
import { ApiResult } from '../../../../models/common/apiResult';
import { ToastrService } from 'ngx-toastr';
import { Paginador } from '../../../../models/common/paginador';

@Component({
  selector: 'app-modal-sel-repetitivo',
  templateUrl: './modal-sel-repetitivo.component.html',
  styleUrls: ['./modal-sel-repetitivo.component.css']
})
export class ModalSelRepetitivoComponent implements OnInit {

  constructor(public modalActive: NgbActiveModal,private toastr: ToastrService ) { }

  InputBuscarRepetitivo;
  InputAsientoRepetitivo;


  ngOnInit(): void {
  }

}
