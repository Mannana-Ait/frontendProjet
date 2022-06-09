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
  selector: 'app-etat-inscription-candidat-create-chercheur',
  templateUrl: './etat-inscription-candidat-create-chercheur.component.html',
  styleUrls: ['./etat-inscription-candidat-create-chercheur.component.css']
})
export class EtatInscriptionCandidatCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();





constructor(private datePipe: DatePipe, private etatInscriptionCandidatService: EtatInscriptionCandidatService
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
     this.etatInscriptionCandidatService.save().subscribe(etatInscriptionCandidat=>{
       this.etatInscriptionCandidats.push({...etatInscriptionCandidat});
       this.createEtatInscriptionCandidatDialog = false;
       this.submitted = false;
       this.selectedEtatInscriptionCandidat = new EtatInscriptionCandidatVo();


    } , error =>{
        console.log(error);
    });
}

private validateForm(): void{
this.errorMessages = new Array<string>();

    }







hideCreateDialog(){
    this.createEtatInscriptionCandidatDialog  = false;
    this.setValidation(true);
}

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

   get createEtatInscriptionCandidatDialog(): boolean {
           return this.etatInscriptionCandidatService.createEtatInscriptionCandidatDialog;

       }
    set createEtatInscriptionCandidatDialog(value: boolean) {
        this.etatInscriptionCandidatService.createEtatInscriptionCandidatDialog= value;
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
