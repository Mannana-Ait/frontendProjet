import {Component, OnInit, Input} from '@angular/core';
import {PlanningService} from 'src/app/controller/service/Planning.service';
import {PlanningVo} from 'src/app/controller/model/Planning.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


import {EcoleVo} from 'src/app/controller/model/Ecole.model';
import {EcoleService} from 'src/app/controller/service/Ecole.service';
import {JourVo} from 'src/app/controller/model/Jour.model';
import {JourService} from 'src/app/controller/service/Jour.service';
@Component({
  selector: 'app-planning-create-admin',
  templateUrl: './planning-create-admin.component.html',
  styleUrls: ['./planning-create-admin.component.css']
})
export class PlanningCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();





constructor(private datePipe: DatePipe, private planningService: PlanningService
 ,       private stringUtilService: StringUtilService
 ,       private roleService: RoleService
 ,       private messageService: MessageService
 ,       private router: Router
 
,       private ecoleService: EcoleService
,       private jourService: JourService
) {

}



ngOnInit(): void {

    this.selectedJour = new JourVo();
    this.jourService.findAll().subscribe((data) => this.jours = data);
    this.selectedEcole = new EcoleVo();
    this.ecoleService.findAll().subscribe((data) => this.ecoles = data);
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
     this.planningService.save().subscribe(planning=>{
       this.plannings.push({...planning});
       this.createPlanningDialog = false;
       this.submitted = false;
       this.selectedPlanning = new PlanningVo();


    } , error =>{
        console.log(error);
    });
}

private validateForm(): void{
this.errorMessages = new Array<string>();

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
       public async openCreateJour(jour: string) {
          const isPermistted = await this.roleService.isPermitted('Jour', 'add');
         if(isPermistted) {
         this.selectedJour = new JourVo();
         this.createJourDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
}

hideCreateDialog(){
    this.createPlanningDialog  = false;
    this.setValidation(true);
}

get plannings(): Array<PlanningVo> {
    return this.planningService.plannings;
       }
set plannings(value: Array<PlanningVo>) {
        this.planningService.plannings = value;
       }

 get selectedPlanning(): PlanningVo {
           return this.planningService.selectedPlanning;
       }
    set selectedPlanning(value: PlanningVo) {
        this.planningService.selectedPlanning = value;
       }

   get createPlanningDialog(): boolean {
           return this.planningService.createPlanningDialog;

       }
    set createPlanningDialog(value: boolean) {
        this.planningService.createPlanningDialog= value;
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
       get selectedJour(): JourVo {
           return this.jourService.selectedJour;
       }
      set selectedJour(value: JourVo) {
        this.jourService.selectedJour = value;
       }
       get jours(): Array<JourVo> {
           return this.jourService.jours;
       }
       set jours(value: Array<JourVo>) {
        this.jourService.jours = value;
       }
       get createJourDialog(): boolean {
           return this.jourService.createJourDialog;
       }
      set createJourDialog(value: boolean) {
        this.jourService.createJourDialog= value;
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
