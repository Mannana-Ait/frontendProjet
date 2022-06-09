import {Component, OnInit} from '@angular/core';
import {PlanningService} from 'src/app/controller/service/Planning.service';
import {PlanningVo} from 'src/app/controller/model/Planning.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {JourVo} from 'src/app/controller/model/Jour.model';
import {JourService} from 'src/app/controller/service/Jour.service';
import {EcoleVo} from 'src/app/controller/model/Ecole.model';
import {EcoleService} from 'src/app/controller/service/Ecole.service';

@Component({
  selector: 'app-planning-view-admin',
  templateUrl: './planning-view-admin.component.html',
  styleUrls: ['./planning-view-admin.component.css']
})
export class PlanningViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private planningService: PlanningService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private jourService: JourService
    ,private ecoleService: EcoleService
) {
}

// methods
ngOnInit(): void {
    this.selectedJour = new JourVo();
    this.jourService.findAll().subscribe((data) => this.jours = data);
    this.selectedEcole = new EcoleVo();
    this.ecoleService.findAll().subscribe((data) => this.ecoles = data);
}

hideViewDialog(){
    this.viewPlanningDialog  = false;
}

// getters and setters

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

   get viewPlanningDialog(): boolean {
           return this.planningService.viewPlanningDialog;

       }
    set viewPlanningDialog(value: boolean) {
        this.planningService.viewPlanningDialog= value;
       }

       get selectedEcole(): EcoleVo {
           return this.ecoleService.selectedEcole;
       }
      set selectedEcole(value: EcoleVo) {
        this.ecoleService.selectedEcole = value;
       }
       get ecoles():Array<EcoleVo> {
           return this.ecoleService.ecoles;
       }
       set ecoles(value: Array<EcoleVo>) {
        this.ecoleService.ecoles = value;
       }
       get editEcoleDialog(): boolean {
           return this.ecoleService.editEcoleDialog;
       }
      set editEcoleDialog(value: boolean) {
        this.ecoleService.editEcoleDialog= value;
       }
       get selectedJour(): JourVo {
           return this.jourService.selectedJour;
       }
      set selectedJour(value: JourVo) {
        this.jourService.selectedJour = value;
       }
       get jours():Array<JourVo> {
           return this.jourService.jours;
       }
       set jours(value: Array<JourVo>) {
        this.jourService.jours = value;
       }
       get editJourDialog(): boolean {
           return this.jourService.editJourDialog;
       }
      set editJourDialog(value: boolean) {
        this.jourService.editJourDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
