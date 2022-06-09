import {Component, OnInit, Input} from '@angular/core';
import {InscriptionCandidatService} from 'src/app/controller/service/InscriptionCandidat.service';
import {InscriptionCandidatVo} from 'src/app/controller/model/InscriptionCandidat.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


import {CandidatVo} from 'src/app/controller/model/Candidat.model';
import {CandidatService} from 'src/app/controller/service/Candidat.service';
import {EcoleVo} from 'src/app/controller/model/Ecole.model';
import {EcoleService} from 'src/app/controller/service/Ecole.service';
import {CategoriePermisVo} from 'src/app/controller/model/CategoriePermis.model';
import {CategoriePermisService} from 'src/app/controller/service/CategoriePermis.service';
import {EtatInscriptionCandidatVo} from 'src/app/controller/model/EtatInscriptionCandidat.model';
import {EtatInscriptionCandidatService} from 'src/app/controller/service/EtatInscriptionCandidat.service';
@Component({
  selector: 'app-inscription-candidat-create-admin',
  templateUrl: './inscription-candidat-create-admin.component.html',
  styleUrls: ['./inscription-candidat-create-admin.component.css']
})
export class InscriptionCandidatCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();





constructor(private datePipe: DatePipe, private inscriptionCandidatService: InscriptionCandidatService
 ,       private stringUtilService: StringUtilService
 ,       private roleService: RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private candidatService: CandidatService
,       private ecoleService: EcoleService
,       private categoriePermisService: CategoriePermisService
,       private etatInscriptionCandidatService: EtatInscriptionCandidatService
) {

}



ngOnInit(): void {

    this.selectedCandidat = new CandidatVo();
    this.candidatService.findAll().subscribe((data) => this.candidats = data);
    this.selectedEcole = new EcoleVo();
    this.ecoleService.findAll().subscribe((data) => this.ecoles = data);
    this.selectedCategoriePermis = new CategoriePermisVo();
    this.categoriePermisService.findAll().subscribe((data) => this.categoriePermiss = data);
    this.selectedEtatInscriptionCandidat = new EtatInscriptionCandidatVo();
    this.etatInscriptionCandidatService.findAll().subscribe((data) => this.etatInscriptionCandidats = data);
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
     this.inscriptionCandidatService.save().subscribe(inscriptionCandidat=>{
       this.inscriptionCandidats.push({...inscriptionCandidat});
       this.createInscriptionCandidatDialog = false;
       this.submitted = false;
       this.selectedInscriptionCandidat = new InscriptionCandidatVo();


    } , error =>{
        console.log(error);
    });
}

private validateForm(): void{
this.errorMessages = new Array<string>();

    }













       public async openCreateCandidat(candidat: string) {
          const isPermistted = await this.roleService.isPermitted('Candidat', 'add');
         if(isPermistted) {
         this.selectedCandidat = new CandidatVo();
         this.createCandidatDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
       public async openCreateEtatInscriptionCandidat(etatInscriptionCandidat: string) {
          const isPermistted = await this.roleService.isPermitted('EtatInscriptionCandidat', 'add');
         if(isPermistted) {
         this.selectedEtatInscriptionCandidat = new EtatInscriptionCandidatVo();
         this.createEtatInscriptionCandidatDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
       public async openCreateEcole(ecole: string) {
          const isPermistted = await this.roleService.isPermitted('Ecole', 'add');
         if(isPermistted) {
         this.selectedEcole = new EcoleVo();
         this.createEcoleDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
       public async openCreateCategoriePermis(categoriePermis: string) {
          const isPermistted = await this.roleService.isPermitted('CategoriePermis', 'add');
         if(isPermistted) {
         this.selectedCategoriePermis = new CategoriePermisVo();
         this.createCategoriePermisDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}

hideCreateDialog(){
    this.createInscriptionCandidatDialog  = false;
    this.setValidation(true);
}

get inscriptionCandidats(): Array<InscriptionCandidatVo> {
    return this.inscriptionCandidatService.inscriptionCandidats;
       }
set inscriptionCandidats(value: Array<InscriptionCandidatVo>) {
        this.inscriptionCandidatService.inscriptionCandidats = value;
       }

 get selectedInscriptionCandidat(): InscriptionCandidatVo {
           return this.inscriptionCandidatService.selectedInscriptionCandidat;
       }
    set selectedInscriptionCandidat(value: InscriptionCandidatVo) {
        this.inscriptionCandidatService.selectedInscriptionCandidat = value;
       }

   get createInscriptionCandidatDialog(): boolean {
           return this.inscriptionCandidatService.createInscriptionCandidatDialog;

       }
    set createInscriptionCandidatDialog(value: boolean) {
        this.inscriptionCandidatService.createInscriptionCandidatDialog= value;
       }

       get selectedCandidat(): CandidatVo {
           return this.candidatService.selectedCandidat;
       }
      set selectedCandidat(value: CandidatVo) {
        this.candidatService.selectedCandidat = value;
       }
       get candidats(): Array<CandidatVo> {
           return this.candidatService.candidats;
       }
       set candidats(value: Array<CandidatVo>) {
        this.candidatService.candidats = value;
       }
       get createCandidatDialog(): boolean {
           return this.candidatService.createCandidatDialog;
       }
      set createCandidatDialog(value: boolean) {
        this.candidatService.createCandidatDialog= value;
       }
       get selectedEtatInscriptionCandidat(): EtatInscriptionCandidatVo {
           return this.etatInscriptionCandidatService.selectedEtatInscriptionCandidat;
       }
      set selectedEtatInscriptionCandidat(value: EtatInscriptionCandidatVo) {
        this.etatInscriptionCandidatService.selectedEtatInscriptionCandidat = value;
       }
       get etatInscriptionCandidats(): Array<EtatInscriptionCandidatVo> {
           return this.etatInscriptionCandidatService.etatInscriptionCandidats;
       }
       set etatInscriptionCandidats(value: Array<EtatInscriptionCandidatVo>) {
        this.etatInscriptionCandidatService.etatInscriptionCandidats = value;
       }
       get createEtatInscriptionCandidatDialog(): boolean {
           return this.etatInscriptionCandidatService.createEtatInscriptionCandidatDialog;
       }
      set createEtatInscriptionCandidatDialog(value: boolean) {
        this.etatInscriptionCandidatService.createEtatInscriptionCandidatDialog= value;
       }
       get selectedEcole(): EcoleVo {
           return this.ecoleService.selectedEcole;
       }
      set selectedEcole(value: EcoleVo) {
        this.ecoleService.selectedEcole = value;
       }
       get ecoles(): Array<EcoleVo> {
           return this.ecoleService.ecoles;
       }
       set ecoles(value: Array<EcoleVo>) {
        this.ecoleService.ecoles = value;
       }
       get createEcoleDialog(): boolean {
           return this.ecoleService.createEcoleDialog;
       }
      set createEcoleDialog(value: boolean) {
        this.ecoleService.createEcoleDialog= value;
       }
       get selectedCategoriePermis(): CategoriePermisVo {
           return this.categoriePermisService.selectedCategoriePermis;
       }
      set selectedCategoriePermis(value: CategoriePermisVo) {
        this.categoriePermisService.selectedCategoriePermis = value;
       }
       get categoriePermiss(): Array<CategoriePermisVo> {
           return this.categoriePermisService.categoriePermiss;
       }
       set categoriePermiss(value: Array<CategoriePermisVo>) {
        this.categoriePermisService.categoriePermiss = value;
       }
       get createCategoriePermisDialog(): boolean {
           return this.categoriePermisService.createCategoriePermisDialog;
       }
      set createCategoriePermisDialog(value: boolean) {
        this.categoriePermisService.createCategoriePermisDialog= value;
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
