import {Component, OnInit} from '@angular/core';
import {CandidatService} from 'src/app/controller/service/Candidat.service';
import {CandidatVo} from 'src/app/controller/model/Candidat.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-candidat-view-chercheur',
  templateUrl: './candidat-view-chercheur.component.html',
  styleUrls: ['./candidat-view-chercheur.component.css']
})
export class CandidatViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private candidatService: CandidatService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewCandidatDialog  = false;
}

// getters and setters

get candidats(): Array<CandidatVo> {
    return this.candidatService.candidats;
       }
set candidats(value: Array<CandidatVo>) {
        this.candidatService.candidats = value;
       }

 get selectedCandidat(): CandidatVo {
           return this.candidatService.selectedCandidat;
       }
    set selectedCandidat(value: CandidatVo) {
        this.candidatService.selectedCandidat = value;
       }

   get viewCandidatDialog(): boolean {
           return this.candidatService.viewCandidatDialog;

       }
    set viewCandidatDialog(value: boolean) {
        this.candidatService.viewCandidatDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
