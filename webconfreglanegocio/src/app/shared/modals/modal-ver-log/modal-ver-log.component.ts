import { Component, OnInit } from '@angular/core';
import { Pipe, PipeTransform} from '@angular/core';
import { NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MonitorPolizaService } from '../../../services/monitor-poliza.service'
import { Paginador } from '../../../models/common/paginador';
import { ToastrService } from 'ngx-toastr';
import { ApiResult } from '../../../models/common/apiResult';

@Component({
  selector: 'app-modal-ver-log',
  templateUrl: './modal-ver-log.component.html',
  styleUrls: ['./modal-ver-log.component.css']
})

// @Pipe({ name: 'sanitizeUrl' })
export class ModalVerLogComponent implements OnInit {

  constructor(private modalService: NgbModal,public modalActive: NgbActiveModal 
   ,private MonitorPolizaService:MonitorPolizaService, private toastr: ToastrService) { }


    ngOnInit(): void {
      // this.url='http://25.78.92.29/ReportServer_SQLEXPRESS/Pages/ReportViewer.aspx?%2fContabilidad%2fADMCONT005RS&rs:Command=Render&DoctoOrigen='+this.idDoctoOrigen
     // this.sanitizer.bypassSecurityTrustResourceUrl(this.url)
    //  this.transform(this.url)
    //   console.log(this.idDoctoOrigen+ '')
    }




  //   transform(url: string): SafeHtml {
  //     return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  // }


  
}
