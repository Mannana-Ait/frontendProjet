import {Component, OnInit, Input} from '@angular/core';
import {CategoriePermisMoniteurPratiqueService} from 'src/app/controller/service/CategoriePermisMoniteurPratique.service';
import {CategoriePermisMoniteurPratiqueVo} from 'src/app/controller/model/CategoriePermisMoniteurPratique.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


import {MoniteurPratiqueVo} from 'src/app/controller/model/MoniteurPratique.model';
import {MoniteurPratiqueService} from 'src/app/controller/service/MoniteurPratique.service';
import {CategoriePermisVo} from 'src/app/controller/model/CategoriePermis.model';
import {CategoriePermisService} from 'src/app/controller/service/CategoriePermis.service';

import {MoniteurPratiqueVo} from 'src/app/controller/model/MoniteurPratique.model';
import {MoniteurPratiqueService} from 'src/app/controller/service/MoniteurPratique.service';
import {CategoriePermisVo} from 'src/app/controller/model/CategoriePermis.model';
import {CategoriePermisService} from 'src/app/controller/service/CategoriePermis.service';

@Component({
  selector: 'app-categorie-permis-moniteur-pratique-edit-chercheur',
  templateUrl: './categorie-permis-moniteur-pratique-edit-chercheur.component.html',
  styleUrls: ['./categorie-permis-moniteur-pratique-edit-chercheur.component.css']
})
export class CategoriePermisMoniteurPratiqueEditChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();





constructor(private datePipe: DatePipe, private categoriePermisMoniteurPratiqueService: CategoriePermisMoniteurPratiqueService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private moniteurPratiqueService: MoniteurPratiqueService
,       private categoriePermisService: CategoriePermisService
) {

}


// methods
ngOnInit(): void {

    this.selectedCategoriePermis = new CategoriePermisVo();
    this.categoriePermisService.findAll().subscribe((data) => this.categoriePermiss = data);
    this.selectedMoniteurPratique = new MoniteurPratiqueVo();
    this.moniteurPratiqueService.findAll().subscribe((data) => this.moniteurPratiques = data);
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
     this.categoriePermisMoniteurPratiqueService.edit().subscribe(categoriePermisMoniteurPratique=>{
     const myIndex = this.categoriePermisMoniteurPratiques.findIndex(e => e.id === this.selectedCategoriePermisMoniteurPratique.id);
     this.categoriePermisMoniteurPratiques[myIndex] = this.selectedCategoriePermisMoniteurPratique;
     this.editCategoriePermisMoniteurPratiqueDialog = false;
     this.submitted = false;
     this.selectedCategoriePermisMoniteurPratique = new CategoriePermisMoniteurPratiqueVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }







//openPopup
      public async openCreateMoniteurPratique(moniteurPratique: string) {
        const isPermistted = await this.roleService.isPermitted('MoniteurPratique', 'edit');
        if(isPermistted) {
         this.selectedMoniteurPratique = new MoniteurPratiqueVo();
         this.createMoniteurPratiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
      public async openCreateCategoriePermis(categoriePermis: string) {
        const isPermistted = await this.roleService.isPermitted('CategoriePermis', 'edit');
        if(isPermistted) {
         this.selectedCategoriePermis = new CategoriePermisVo();
         this.createCategoriePermisDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}
// methods

hideEditDialog(){
    this.editCategoriePermisMoniteurPratiqueDialog  = false;
    this.setValidation(true);
}

// getters and setters

get categoriePermisMoniteurPratiques(): Array<CategoriePermisMoniteurPratiqueVo> {
    return this.categoriePermisMoniteurPratiqueService.categoriePermisMoniteurPratiques;
       }
set categoriePermisMoniteurPratiques(value: Array<CategoriePermisMoniteurPratiqueVo>) {
        this.categoriePermisMoniteurPratiqueService.categoriePermisMoniteurPratiques = value;
       }

 get selectedCategoriePermisMoniteurPratique(): CategoriePermisMoniteurPratiqueVo {
           return this.categoriePermisMoniteurPratiqueService.selectedCategoriePermisMoniteurPratique;
       }
    set selectedCategoriePermisMoniteurPratique(value: CategoriePermisMoniteurPratiqueVo) {
        this.categoriePermisMoniteurPratiqueService.selectedCategoriePermisMoniteurPratique = value;
       }

   get editCategoriePermisMoniteurPratiqueDialog(): boolean {
           return this.categoriePermisMoniteurPratiqueService.createCategoriePermisMoniteurPratiqueDialog;

       }
    set editCategoriePermisMoniteurPratiqueDialog(value: boolean) {
        this.categoriePermisMoniteurPratiqueService.createCategoriePermisMoniteurPratiqueDialog= value;
       }

       get selectedMoniteurPratique(): MoniteurPratiqueVo {
           return this.moniteurPratiqueService.selectedMoniteurPratique;
       }
      set selectedMoniteurPratique(value: MoniteurPratiqueVo) {
        this.moniteurPratiqueService.selectedMoniteurPratique = value;
       }
       get moniteurPratiques(): Array<MoniteurPratiqueVo> {
           return this.moniteurPratiqueService.moniteurPratiques;
       }
       set moniteurPratiques(value: Array<MoniteurPratiqueVo>) {
        this.moniteurPratiqueService.moniteurPratiques = value;
       }
       get createMoniteurPratiqueDialog(): boolean {
           return this.moniteurPratiqueService.createMoniteurPratiqueDialog;
       }
      set createMoniteurPratiqueDialog(value: boolean) {
        this.moniteurPratiqueService.createMoniteurPratiqueDialog= value;
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
