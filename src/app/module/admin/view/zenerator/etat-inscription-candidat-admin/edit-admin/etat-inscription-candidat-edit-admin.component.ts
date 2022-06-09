import {Component, OnInit, Input} from '@angular/core';
import {EtatInscriptionCandidatService} from 'src/app/controller/service/EtatInscriptionCandidat.service';
import {EtatInscriptionCandidatVo} from 'src/app/controller/model/EtatInscriptionCandidat.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';




@Component({
  selector: 'app-etat-inscription-candidat-edit-admin',
  templateUrl: './etat-inscription-candidat-edit-admin.component.html',
  styleUrls: ['./etat-inscription-candidat-edit-admin.component.css']
})
export class EtatInscriptionCandidatEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();





constructor(private datePipe: DatePipe, private etatInscriptionCandidatService: EtatInscriptionCandidatService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}


// methods
ngOnInit(): void {

}




private setValidation(value : boolean){
    }


public edit(){
  this.submitted = true;
  this.validateForm();
  if (this.errorMessages.length === 0) {
        this.editWithShowOption(false);
  } else {
        this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire'});
  }
}

public editWithShowOption(showList: boolean){
     this.etatInscriptionCandidatService.edit().subscribe(etatInscriptionCandidat=>{
     const myIndex = this.etatInscriptionCandidats.findIndex(e => e.id === this.selectedEtatInscriptionCandidat.id);
     this.etatInscriptionCandidats[myIndex] = this.selectedEtatInscriptionCandidat;
     this.editEtatInscriptionCandidatDialog = false;
     this.submitted = false;
     this.selectedEtatInscriptionCandidat = new EtatInscriptionCandidatVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }






//openPopup
// methods

hideEditDialog(){
    this.editEtatInscriptionCandidatDialog  = false;
    this.setValidation(true);
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

   get editEtatInscriptionCandidatDialog(): boolean {
           return this.etatInscriptionCandidatService.editEtatInscriptionCandidatDialog;

       }
    set editEtatInscriptionCandidatDialog(value: boolean) {
        this.etatInscriptionCandidatService.editEtatInscriptionCandidatDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatEdit;
    }

    get dateFormatColumn(){
            return environment.dateFormatEdit;
     }

     get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }




    get errorMessages(): string[] {
    return this._errorMessages;
    }

    set errorMessages(value: string[]) {
    this._errorMessages = value;
    }


}
