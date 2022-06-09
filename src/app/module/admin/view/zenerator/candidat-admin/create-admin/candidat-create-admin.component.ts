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
  selector: 'app-candidat-create-admin',
  templateUrl: './candidat-create-admin.component.html',
  styleUrls: ['./candidat-create-admin.component.css']
})
export class CandidatCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();





constructor(private datePipe: DatePipe, private candidatService: CandidatService
 ,       private stringUtilService: StringUtilService
 ,       private roleService: RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
) {

}



ngOnInit(): void {

}




private setValidation(value: boolean){
    }


public save(){
  this.submitted = true;
  this.validateForm();
  if (this.errorMessages.length === 0) {
        this.saveWithShowOption(false);
  } else {
        this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire'});
  }
}

public saveWithShowOption(showList: boolean){
     this.candidatService.save().subscribe(candidat=>{
       this.candidats.push({...candidat});
       this.createCandidatDialog = false;
       this.submitted = false;
       this.selectedCandidat = new CandidatVo();


    } , error =>{
        console.log(error);
    });
}

private validateForm(): void{
this.errorMessages = new Array<string>();

    }












hideCreateDialog(){
    this.createCandidatDialog  = false;
    this.setValidation(true);
}

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

   get createCandidatDialog(): boolean {
           return this.candidatService.createCandidatDialog;

       }
    set createCandidatDialog(value: boolean) {
        this.candidatService.createCandidatDialog= value;
       }


    get dateFormat(){
            return environment.dateFormatCreate;
    }

    get dateFormatColumn(){
            return environment.dateFormatCreate;
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
