import {Component, OnInit} from '@angular/core';
import {CategoriePermisMoniteurTheoriqueService} from 'src/app/controller/service/CategoriePermisMoniteurTheorique.service';
import {CategoriePermisMoniteurTheoriqueVo} from 'src/app/controller/model/CategoriePermisMoniteurTheorique.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from 'src/app/controller/service/role.service';
import {DatePipe} from '@angular/common';


import { CategoriePermisService } from 'src/app/controller/service/CategoriePermis.service';
import { MoniteurTheoriqueService } from 'src/app/controller/service/MoniteurTheorique.service';

import {CategoriePermisVo} from 'src/app/controller/model/CategoriePermis.model';
import {MoniteurTheoriqueVo} from 'src/app/controller/model/MoniteurTheorique.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from 'src/app/controller/service/Auth.service';
import { ExportService } from 'src/app/controller/service/Export.service';

@Component({
  selector: 'app-categorie-permis-moniteur-theorique-list-chercheur',
  templateUrl: './categorie-permis-moniteur-theorique-list-chercheur.component.html',
  styleUrls: ['./categorie-permis-moniteur-theorique-list-chercheur.component.css']
})
export class CategoriePermisMoniteurTheoriqueListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'CategoriePermisMoniteurTheorique';
    categoriePermiss :Array<CategoriePermisVo>;
    moniteurTheoriques :Array<MoniteurTheoriqueVo>;


    constructor(private datePipe: DatePipe, private categoriePermisMoniteurTheoriqueService: CategoriePermisMoniteurTheoriqueService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
        , private categoriePermisService: CategoriePermisService
        , private moniteurTheoriqueService: MoniteurTheoriqueService
) { }

    ngOnInit() : void {
      this.loadCategoriePermisMoniteurTheoriques();
      this.initExport();
      this.initCol();
      this.loadCategoriePermis();
      this.loadMoniteurTheorique();
    }
    
    // methods
      public async loadCategoriePermisMoniteurTheoriques(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('CategoriePermisMoniteurTheorique', 'list');
        isPermistted ? this.categoriePermisMoniteurTheoriqueService.findAll().subscribe(categoriePermisMoniteurTheoriques => this.categoriePermisMoniteurTheoriques = categoriePermisMoniteurTheoriques,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.categoriePermisMoniteurTheoriqueService.findByCriteria(this.searchCategoriePermisMoniteurTheorique).subscribe(categoriePermisMoniteurTheoriques=>{
            
            this.categoriePermisMoniteurTheoriques = categoriePermisMoniteurTheoriques;
           // this.searchCategoriePermisMoniteurTheorique = new CategoriePermisMoniteurTheoriqueVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'categoriePermis?.libele', header: 'Categorie permis'},
                        {field: 'moniteurTheorique?.reference', header: 'Moniteur theorique'},
        ];
    }
    
    public async editCategoriePermisMoniteurTheorique(categoriePermisMoniteurTheorique: CategoriePermisMoniteurTheoriqueVo){
        const isPermistted = await this.roleService.isPermitted('CategoriePermisMoniteurTheorique', 'edit');
         if(isPermistted){
          this.categoriePermisMoniteurTheoriqueService.findByIdWithAssociatedList(categoriePermisMoniteurTheorique).subscribe(res => {
           this.selectedCategoriePermisMoniteurTheorique = res;
            this.editCategoriePermisMoniteurTheoriqueDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewCategoriePermisMoniteurTheorique(categoriePermisMoniteurTheorique: CategoriePermisMoniteurTheoriqueVo){
        const isPermistted = await this.roleService.isPermitted('CategoriePermisMoniteurTheorique', 'view');
        if(isPermistted){
           this.categoriePermisMoniteurTheoriqueService.findByIdWithAssociatedList(categoriePermisMoniteurTheorique).subscribe(res => {
           this.selectedCategoriePermisMoniteurTheorique = res;
            this.viewCategoriePermisMoniteurTheoriqueDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateCategoriePermisMoniteurTheorique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedCategoriePermisMoniteurTheorique = new CategoriePermisMoniteurTheoriqueVo();
            this.createCategoriePermisMoniteurTheoriqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteCategoriePermisMoniteurTheorique(categoriePermisMoniteurTheorique: CategoriePermisMoniteurTheoriqueVo){
       const isPermistted = await this.roleService.isPermitted('CategoriePermisMoniteurTheorique', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Categorie permis moniteur theorique) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.categoriePermisMoniteurTheoriqueService.delete(categoriePermisMoniteurTheorique).subscribe(status=>{
                          if(status > 0){
                          const position = this.categoriePermisMoniteurTheoriques.indexOf(categoriePermisMoniteurTheorique);
                          position > -1 ? this.categoriePermisMoniteurTheoriques.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Categorie permis moniteur theorique Supprimé',
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

public async loadCategoriePermis(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('CategoriePermisMoniteurTheorique', 'list');
    isPermistted ? this.categoriePermisService.findAll().subscribe(categoriePermiss => this.categoriePermiss = categoriePermiss,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadMoniteurTheorique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('CategoriePermisMoniteurTheorique', 'list');
    isPermistted ? this.moniteurTheoriqueService.findAll().subscribe(moniteurTheoriques => this.moniteurTheoriques = moniteurTheoriques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateCategoriePermisMoniteurTheorique(categoriePermisMoniteurTheorique: CategoriePermisMoniteurTheoriqueVo) {

     this.categoriePermisMoniteurTheoriqueService.findByIdWithAssociatedList(categoriePermisMoniteurTheorique).subscribe(
	 res => {
	       this.initDuplicateCategoriePermisMoniteurTheorique(res);
	       this.selectedCategoriePermisMoniteurTheorique = res;
	       this.selectedCategoriePermisMoniteurTheorique.id = null;
            this.createCategoriePermisMoniteurTheoriqueDialog = true;

});

	}

	initDuplicateCategoriePermisMoniteurTheorique(res: CategoriePermisMoniteurTheoriqueVo) {


	}

  initExport() : void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.categoriePermisMoniteurTheoriques.map(e => {
    return {
            'Categorie permis': e.categoriePermisVo?.libele ,
            'Moniteur theorique': e.moniteurTheoriqueVo?.reference ,
     }
      });

      this.criteriaData = [{
        'Categorie permis': this.searchCategoriePermisMoniteurTheorique.categoriePermisVo?.libele ? this.searchCategoriePermisMoniteurTheorique.categoriePermisVo?.libele : environment.emptyForExport ,
        'Moniteur theorique': this.searchCategoriePermisMoniteurTheorique.moniteurTheoriqueVo?.reference ? this.searchCategoriePermisMoniteurTheorique.moniteurTheoriqueVo?.reference : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get categoriePermisMoniteurTheoriques() : Array<CategoriePermisMoniteurTheoriqueVo> {
           return this.categoriePermisMoniteurTheoriqueService.categoriePermisMoniteurTheoriques;
       }
    set categoriePermisMoniteurTheoriques(value: Array<CategoriePermisMoniteurTheoriqueVo>) {
        this.categoriePermisMoniteurTheoriqueService.categoriePermisMoniteurTheoriques = value;
       }

    get categoriePermisMoniteurTheoriqueSelections() : Array<CategoriePermisMoniteurTheoriqueVo> {
           return this.categoriePermisMoniteurTheoriqueService.categoriePermisMoniteurTheoriqueSelections;
       }
    set categoriePermisMoniteurTheoriqueSelections(value: Array<CategoriePermisMoniteurTheoriqueVo>) {
        this.categoriePermisMoniteurTheoriqueService.categoriePermisMoniteurTheoriqueSelections = value;
       }
   
     


    get selectedCategoriePermisMoniteurTheorique() : CategoriePermisMoniteurTheoriqueVo {
           return this.categoriePermisMoniteurTheoriqueService.selectedCategoriePermisMoniteurTheorique;
       }
    set selectedCategoriePermisMoniteurTheorique(value: CategoriePermisMoniteurTheoriqueVo) {
        this.categoriePermisMoniteurTheoriqueService.selectedCategoriePermisMoniteurTheorique = value;
       }
    
    get createCategoriePermisMoniteurTheoriqueDialog() :boolean {
           return this.categoriePermisMoniteurTheoriqueService.createCategoriePermisMoniteurTheoriqueDialog;
       }
    set createCategoriePermisMoniteurTheoriqueDialog(value: boolean) {
        this.categoriePermisMoniteurTheoriqueService.createCategoriePermisMoniteurTheoriqueDialog= value;
       }
    
    get editCategoriePermisMoniteurTheoriqueDialog() :boolean {
           return this.categoriePermisMoniteurTheoriqueService.editCategoriePermisMoniteurTheoriqueDialog;
       }
    set editCategoriePermisMoniteurTheoriqueDialog(value: boolean) {
        this.categoriePermisMoniteurTheoriqueService.editCategoriePermisMoniteurTheoriqueDialog= value;
       }
    get viewCategoriePermisMoniteurTheoriqueDialog() :boolean {
           return this.categoriePermisMoniteurTheoriqueService.viewCategoriePermisMoniteurTheoriqueDialog;
       }
    set viewCategoriePermisMoniteurTheoriqueDialog(value: boolean) {
        this.categoriePermisMoniteurTheoriqueService.viewCategoriePermisMoniteurTheoriqueDialog = value;
       }
       
     get searchCategoriePermisMoniteurTheorique() : CategoriePermisMoniteurTheoriqueVo {
        return this.categoriePermisMoniteurTheoriqueService.searchCategoriePermisMoniteurTheorique;
       }
    set searchCategoriePermisMoniteurTheorique(value: CategoriePermisMoniteurTheoriqueVo) {
        this.categoriePermisMoniteurTheoriqueService.searchCategoriePermisMoniteurTheorique = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
