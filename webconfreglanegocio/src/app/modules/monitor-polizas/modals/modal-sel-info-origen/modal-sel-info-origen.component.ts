import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RefCondService } from '../../../../services/ref-cond.service';
import { ApiResult } from '../../../../models/common/apiResult';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-sel-info-origen',
  templateUrl: './modal-sel-info-origen.component.html',
  styleUrls: ['./modal-sel-info-origen.component.css']
})
export class ModalSelInfoOrigenComponent implements OnInit {

  constructor(public modalActive: NgbActiveModal,private toastr: ToastrService) { }

  ngOnInit(): void {
  }

}
