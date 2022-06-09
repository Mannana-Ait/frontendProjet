import {Component, OnInit, Input} from '@angular/core';
import {AvisCondidatService} from 'src/app/controller/service/AvisCondidat.service';
import {AvisCondidatVo} from 'src/app/controller/model/AvisCondidat.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


import {EcoleVo} from 'src/app/controller/model/Ecole.model';
import {EcoleService} from 'src/app/controller/service/Ecole.service';
import {TypeAvisVo} from 'src/app/controller/model/TypeAvis.model';
import {TypeAvisService} from 'src/app/controller/service/TypeAvis.service';
@Component({
  selector: 'app-avis-condidat-create-chercheur',
  templateUrl: './avis-condidat-create-chercheur.component.html',
  styleUrls: ['./avis-condidat-create-chercheur.component.css']
})
export class AvisCondidatCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();





constructor(private datePipe: DatePipe, private avisCondidatService: AvisCondidatService
 ,       private stringUtilService: StringUtilService
 ,       private roleService: RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private ecoleService: EcoleService
,       private typeAvisService: TypeAvisService
) {

}



ngOnInit(): void {

    this.selectedEcole = new EcoleVo();
    this.ecoleService.findAll().subscribe((data) => this.ecoles = data);
    this.selectedTypeAvis = new TypeAvisVo();
    this.typeAvisService.findAll().subscribe((data) => this.typeAviss = data);
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
     this.avisCondidatService.save().subscribe(avisCondidat=>{
       this.avisCondidats.push({...avisCondidat});
       this.createAvisCondidatDialog = false;
       this.submitted = false;
       this.selectedAvisCondidat = new AvisCondidatVo();


    } , error =>{
        console.log(error);
    });
}

private validateForm(): void{
this.errorMessages = new Array<string>();

    }











       public async openCreateTypeAvis(typeAvis: string) {
          const isPermistted = await this.roleService.isPermitted('TypeAvis', 'add');
         if(isPermistted) {
         this.selectedTypeAvis = new TypeAvisVo();
         this.createTypeAvisDialog = true;
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

hideCreateDialog(){
    this.createAvisCondidatDialog  = false;
    this.setValidation(true);
}

get avisCondidats(): Array<AvisCondidatVo> {
    return this.avisCondidatService.avisCondidats;
       }
set avisCondidats(value: Array<AvisCondidatVo>) {
        this.avisCondidatService.avisCondidats = value;
       }

 get selectedAvisCondidat(): AvisCondidatVo {
           return this.avisCondidatService.selectedAvisCondidat;
       }
    set selectedAvisCondidat(value: AvisCondidatVo) {
        this.avisCondidatService.selectedAvisCondidat = value;
       }

   get createAvisCondidatDialog(): boolean {
           return this.avisCondidatService.createAvisCondidatDialog;

       }
    set createAvisCondidatDialog(value: boolean) {
        this.avisCondidatService.createAvisCondidatDialog= value;
       }

       get selectedTypeAvis(): TypeAvisVo {
           return this.typeAvisService.selectedTypeAvis;
       }
      set selectedTypeAvis(value: TypeAvisVo) {
        this.typeAvisService.selectedTypeAvis = value;
       }
       get typeAviss(): Array<TypeAvisVo> {
           return this.typeAvisService.typeAviss;
       }
       set typeAviss(value: Array<TypeAvisVo>) {
        this.typeAvisService.typeAviss = value;
       }
       get createTypeAvisDialog(): boolean {
           return this.typeAvisService.createTypeAvisDialog;
       }
      set createTypeAvisDialog(value: boolean) {
        this.typeAvisService.createTypeAvisDialog= value;
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
