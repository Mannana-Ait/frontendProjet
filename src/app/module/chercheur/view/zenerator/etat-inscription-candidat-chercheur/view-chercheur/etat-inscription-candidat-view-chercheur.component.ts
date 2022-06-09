import {Component, OnInit} from '@angular/core';
import {EtatInscriptionCandidatService} from 'src/app/controller/service/EtatInscriptionCandidat.service';
import {EtatInscriptionCandidatVo} from 'src/app/controller/model/EtatInscriptionCandidat.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-etat-inscription-candidat-view-chercheur',
  templateUrl: './etat-inscription-candidat-view-chercheur.component.html',
  styleUrls: ['./etat-inscription-candidat-view-chercheur.component.css']
})
export class EtatInscriptionCandidatViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private etatInscriptionCandidatService: EtatInscriptionCandidatService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
) {
}

// methods
ngOnInit(): void {
}

hideViewDialog(){
    this.viewEtatInscriptionCandidatDialog  = false;
}

// getters and setters

get etatInscriptionCandidats(): Array<EtatInscriptionCandidatVo> {
    return this.etatInscriptionCandidatService.etatInscriptionCandidats;
       }
set etatInscriptionCandidats(value: Array<EtatInscriptionCandidatVo>) {
        this.etatInscriptionCandidatService.etatInscriptionCandidats = value;
       }

 get selectedEtatInscriptionCandidat(): EtatInscriptionCandidatVo {
           return this.etatInscriptionCandidatService.selectedEtatInscriptionCandidat;
       }
    set selectedEtatInscriptionCandidat(value: EtatInscriptionCandidatVo) {
        this.etatInscriptionCandidatService.selectedEtatInscriptionCandidat = value;
       }

   get viewEtatInscriptionCandidatDialog(): boolean {
           return this.etatInscriptionCandidatService.viewEtatInscriptionCandidatDialog;

       }
    set viewEtatInscriptionCandidatDialog(value: boolean) {
        this.etatInscriptionCandidatService.viewEtatInscriptionCandidatDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
