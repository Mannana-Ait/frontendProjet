import {Component, OnInit, Input} from '@angular/core';
import {CategoriePermisMoniteurTheoriqueService} from 'src/app/controller/service/CategoriePermisMoniteurTheorique.service';
import {CategoriePermisMoniteurTheoriqueVo} from 'src/app/controller/model/CategoriePermisMoniteurTheorique.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


import {MoniteurTheoriqueVo} from 'src/app/controller/model/MoniteurTheorique.model';
import {MoniteurTheoriqueService} from 'src/app/controller/service/MoniteurTheorique.service';
import {CategoriePermisVo} from 'src/app/controller/model/CategoriePermis.model';
import {CategoriePermisService} from 'src/app/controller/service/CategoriePermis.service';

import {CategoriePermisVo} from 'src/app/controller/model/CategoriePermis.model';
import {CategoriePermisService} from 'src/app/controller/service/CategoriePermis.service';
import {MoniteurTheoriqueVo} from 'src/app/controller/model/MoniteurTheorique.model';
import {MoniteurTheoriqueService} from 'src/app/controller/service/MoniteurTheorique.service';

@Component({
  selector: 'app-categorie-permis-moniteur-theorique-edit-chercheur',
  templateUrl: './categorie-permis-moniteur-theorique-edit-chercheur.component.html',
  styleUrls: ['./categorie-permis-moniteur-theorique-edit-chercheur.component.css']
})
export class CategoriePermisMoniteurTheoriqueEditChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();





constructor(private datePipe: DatePipe, private categoriePermisMoniteurTheoriqueService: CategoriePermisMoniteurTheoriqueService
 ,       private stringUtilService: StringUtilService
 ,       private roleService:RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private moniteurTheoriqueService: MoniteurTheoriqueService
,       private categoriePermisService: CategoriePermisService
) {

}


// methods
ngOnInit(): void {

    this.selectedCategoriePermis = new CategoriePermisVo();
    this.categoriePermisService.findAll().subscribe((data) => this.categoriePermiss = data);
    this.selectedMoniteurTheorique = new MoniteurTheoriqueVo();
    this.moniteurTheoriqueService.findAll().subscribe((data) => this.moniteurTheoriques = data);
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
     this.categoriePermisMoniteurTheoriqueService.edit().subscribe(categoriePermisMoniteurTheorique=>{
     const myIndex = this.categoriePermisMoniteurTheoriques.findIndex(e => e.id === this.selectedCategoriePermisMoniteurTheorique.id);
     this.categoriePermisMoniteurTheoriques[myIndex] = this.selectedCategoriePermisMoniteurTheorique;
     this.editCategoriePermisMoniteurTheoriqueDialog = false;
     this.submitted = false;
     this.selectedCategoriePermisMoniteurTheorique = new CategoriePermisMoniteurTheoriqueVo();



    } , error =>{
        console.log(error);
    });

}
//validation methods
private validateForm(): void{
this.errorMessages = new Array<string>();

    }







//openPopup
      public async openCreateMoniteurTheorique(moniteurTheorique: string) {
        const isPermistted = await this.roleService.isPermitted('MoniteurTheorique', 'edit');
        if(isPermistted) {
         this.selectedMoniteurTheorique = new MoniteurTheoriqueVo();
         this.createMoniteurTheoriqueDialog = true;
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
    this.editCategoriePermisMoniteurTheoriqueDialog  = false;
    this.setValidation(true);
}

// getters and setters

get categoriePermisMoniteurTheoriques(): Array<CategoriePermisMoniteurTheoriqueVo> {
    return this.categoriePermisMoniteurTheoriqueService.categoriePermisMoniteurTheoriques;
       }
set categoriePermisMoniteurTheoriques(value: Array<CategoriePermisMoniteurTheoriqueVo>) {
        this.categoriePermisMoniteurTheoriqueService.categoriePermisMoniteurTheoriques = value;
       }

 get selectedCategoriePermisMoniteurTheorique(): CategoriePermisMoniteurTheoriqueVo {
           return this.categoriePermisMoniteurTheoriqueService.selectedCategoriePermisMoniteurTheorique;
       }
    set selectedCategoriePermisMoniteurTheorique(value: CategoriePermisMoniteurTheoriqueVo) {
        this.categoriePermisMoniteurTheoriqueService.selectedCategoriePermisMoniteurTheorique = value;
       }

   get editCategoriePermisMoniteurTheoriqueDialog(): boolean {
           return this.categoriePermisMoniteurTheoriqueService.createCategoriePermisMoniteurTheoriqueDialog;

       }
    set editCategoriePermisMoniteurTheoriqueDialog(value: boolean) {
        this.categoriePermisMoniteurTheoriqueService.createCategoriePermisMoniteurTheoriqueDialog= value;
       }

       get selectedMoniteurTheorique(): MoniteurTheoriqueVo {
           return this.moniteurTheoriqueService.selectedMoniteurTheorique;
       }
      set selectedMoniteurTheorique(value: MoniteurTheoriqueVo) {
        this.moniteurTheoriqueService.selectedMoniteurTheorique = value;
       }
       get moniteurTheoriques(): Array<MoniteurTheoriqueVo> {
           return this.moniteurTheoriqueService.moniteurTheoriques;
       }
       set moniteurTheoriques(value: Array<MoniteurTheoriqueVo>) {
        this.moniteurTheoriqueService.moniteurTheoriques = value;
       }
       get createMoniteurTheoriqueDialog(): boolean {
           return this.moniteurTheoriqueService.createMoniteurTheoriqueDialog;
       }
      set createMoniteurTheoriqueDialog(value: boolean) {
        this.moniteurTheoriqueService.createMoniteurTheoriqueDialog= value;
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
