import { Component, OnInit } from '@angular/core';
import { NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-sel-ref',
  templateUrl: './modal-sel-ref.component.html',
  styleUrls: ['./modal-sel-ref.component.css']
})
export class ModalSelRefComponent implements OnInit {

  constructor(private modalService: NgbModal, public modalActive: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
