import { Component, OnInit } from '@angular/core';
import { NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-ver-log',
  templateUrl: './modal-ver-log.component.html',
  styleUrls: ['./modal-ver-log.component.css']
})
export class ModalVerLogComponent implements OnInit {

  constructor(private modalService: NgbModal,public modalActive: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
