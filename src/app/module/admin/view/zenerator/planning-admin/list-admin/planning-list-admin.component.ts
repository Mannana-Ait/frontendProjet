import {Component, OnInit} from '@angular/core';
import {PlanningService} from 'src/app/controller/service/Planning.service';
import {PlanningVo} from 'src/app/controller/model/Planning.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from 'src/app/controller/service/role.service';
import {DatePipe} from '@angular/common';


import { JourService } from 'src/app/controller/service/Jour.service';
import { EcoleService } from 'src/app/controller/service/Ecole.service';

import {JourVo} from 'src/app/controller/model/Jour.model';
import {EcoleVo} from 'src/app/controller/model/Ecole.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from 'src/app/controller/service/Auth.service';
import { ExportService } from 'src/app/controller/service/Export.service';

@Component({
  selector: 'app-planning-list-admin',
  templateUrl: './planning-list-admin.component.html',
  styleUrls: ['./planning-list-admin.component.css']
})
export class PlanningListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Planning';
    jours :Array<JourVo>;
    ecoles :Array<EcoleVo>;


    constructor(private datePipe: DatePipe, private planningService: PlanningService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
        , private jourService: JourService
        , private ecoleService: EcoleService
) { }

    ngOnInit() : void {
      this.loadPlannings();
      this.initExport();
      this.initCol();
      this.loadJour();
      this.loadEcole();
    }
    
    // methods
      public async loadPlannings(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Planning', 'list');
        isPermistted ? this.planningService.findAll().subscribe(plannings => this.plannings = plannings,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.planningService.findByCriteria(this.searchPlanning).subscribe(plannings=>{
            
            this.plannings = plannings;
           // this.searchPlanning = new PlanningVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'jour?.libelle', header: 'Jour'},
                            {field: 'dateOuverture', header: 'Date ouverture'},
                            {field: 'dateFermeture', header: 'Date fermeture'},
                        {field: 'ecole?.reference', header: 'Ecole'},
        ];
    }
    
    public async editPlanning(planning: PlanningVo){
        const isPermistted = await this.roleService.isPermitted('Planning', 'edit');
         if(isPermistted){
          this.planningService.findByIdWithAssociatedList(planning).subscribe(res => {
           this.selectedPlanning = res;
            this.selectedPlanning.dateOuverture = new Date(planning.dateOuverture);
            this.selectedPlanning.dateFermeture = new Date(planning.dateFermeture);
            this.editPlanningDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewPlanning(planning: PlanningVo){
        const isPermistted = await this.roleService.isPermitted('Planning', 'view');
        if(isPermistted){
           this.planningService.findByIdWithAssociatedList(planning).subscribe(res => {
           this.selectedPlanning = res;
            this.selectedPlanning.dateOuverture = new Date(planning.dateOuverture);
            this.selectedPlanning.dateFermeture = new Date(planning.dateFermeture);
            this.viewPlanningDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreatePlanning(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedPlanning = new PlanningVo();
            this.createPlanningDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deletePlanning(planning: PlanningVo){
       const isPermistted = await this.roleService.isPermitted('Planning', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Planning) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.planningService.delete(planning).subscribe(status=>{
                          if(status > 0){
                          const position = this.plannings.indexOf(planning);
                          position > -1 ? this.plannings.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Planning Supprimé',
                        life: 3000
                    });
                                     }

                    },error=>console.log(error))
                             }
                     });
              }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'Problème de permission'
              });
             }
    }

public async loadJour(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Planning', 'list');
    isPermistted ? this.jourService.findAll().subscribe(jours => this.jours = jours,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEcole(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('Planning', 'list');
    isPermistted ? this.ecoleService.findAll().subscribe(ecoles => this.ecoles = ecoles,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicatePlanning(planning: PlanningVo) {

     this.planningService.findByIdWithAssociatedList(planning).subscribe(
	 res => {
	       this.initDuplicatePlanning(res);
	       this.selectedPlanning = res;
	       this.selectedPlanning.id = null;
            this.createPlanningDialog = true;

});

	}

	initDuplicatePlanning(res: PlanningVo) {


	}

  initExport() : void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.plannings.map(e => {
    return {
            'Jour': e.jourVo?.libelle ,
                    'Date ouverture': this.datePipe.transform(e.dateOuverture , 'dd-MM-yyyy'),
                    'Date fermeture': this.datePipe.transform(e.dateFermeture , 'dd-MM-yyyy'),
            'Ecole': e.ecoleVo?.reference ,
     }
      });

      this.criteriaData = [{
        'Jour': this.searchPlanning.jourVo?.libelle ? this.searchPlanning.jourVo?.libelle : environment.emptyForExport ,
            'Date ouverture Min': this.searchPlanning.dateOuvertureMin ? this.datePipe.transform(this.searchPlanning.dateOuvertureMin , this.dateFormat) : environment.emptyForExport ,
            'Date ouverture Max': this.searchPlanning.dateOuvertureMax ? this.datePipe.transform(this.searchPlanning.dateOuvertureMax , this.dateFormat) : environment.emptyForExport ,
            'Date fermeture Min': this.searchPlanning.dateFermetureMin ? this.datePipe.transform(this.searchPlanning.dateFermetureMin , this.dateFormat) : environment.emptyForExport ,
            'Date fermeture Max': this.searchPlanning.dateFermetureMax ? this.datePipe.transform(this.searchPlanning.dateFermetureMax , this.dateFormat) : environment.emptyForExport ,
        'Ecole': this.searchPlanning.ecoleVo?.reference ? this.searchPlanning.ecoleVo?.reference : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get plannings() : Array<PlanningVo> {
           return this.planningService.plannings;
       }
    set plannings(value: Array<PlanningVo>) {
        this.planningService.plannings = value;
       }

    get planningSelections() : Array<PlanningVo> {
           return this.planningService.planningSelections;
       }
    set planningSelections(value: Array<PlanningVo>) {
        this.planningService.planningSelections = value;
       }
   
     


    get selectedPlanning() : PlanningVo {
           return this.planningService.selectedPlanning;
       }
    set selectedPlanning(value: PlanningVo) {
        this.planningService.selectedPlanning = value;
       }
    
    get createPlanningDialog() :boolean {
           return this.planningService.createPlanningDialog;
       }
    set createPlanningDialog(value: boolean) {
        this.planningService.createPlanningDialog= value;
       }
    
    get editPlanningDialog() :boolean {
           return this.planningService.editPlanningDialog;
       }
    set editPlanningDialog(value: boolean) {
        this.planningService.editPlanningDialog= value;
       }
    get viewPlanningDialog() :boolean {
           return this.planningService.viewPlanningDialog;
       }
    set viewPlanningDialog(value: boolean) {
        this.planningService.viewPlanningDialog = value;
       }
       
     get searchPlanning() : PlanningVo {
        return this.planningService.searchPlanning;
       }
    set searchPlanning(value: PlanningVo) {
        this.planningService.searchPlanning = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
