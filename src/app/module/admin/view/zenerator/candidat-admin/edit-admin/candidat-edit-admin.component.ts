import {Component, OnInit, Input} from '@angular/core';
import {CandidatService} from 'src/app/controller/service/Candidat.service';
import {CandidatVo} from 'src/app/controller/model/Candidat.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';




@Component({
  selector: 'app-candidat-edit-admin',
  templateUrl: './candidat-edit-admin.component.html',
  styleUrls: ['./candidat-edit-admin.component.css']
})
export class CandidatEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();





constructor(private datePipe: DatePipe, private candidatService: CandidatService
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
     this.candidatService.edit().subscribe(candidat=>{
     const myIndex = this.candidats.findIndex(e => e.id === this.selectedCandidat.id);
     this.candidats[myIndex] = this.selectedCandidat;
     this.editCandidatDialog = false;
     this.submitted = false;
     this.selectedCandidat = new CandidatVo();



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
    this.editCandidatDialog  = false;
    this.setValidation(true);
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

   get editCandidatDialog(): boolean {
           return this.candidatService.editCandidatDialog;

       }
    set editCandidatDialog(value: boolean) {
        this.candidatService.editCandidatDialog= value;
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
