import {Component, OnInit} from '@angular/core';
import {CategoriePermisMoniteurPratiqueService} from 'src/app/controller/service/CategoriePermisMoniteurPratique.service';
import {CategoriePermisMoniteurPratiqueVo} from 'src/app/controller/model/CategoriePermisMoniteurPratique.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from 'src/app/controller/service/role.service';
import {DatePipe} from '@angular/common';


import { CategoriePermisService } from 'src/app/controller/service/CategoriePermis.service';
import { MoniteurPratiqueService } from 'src/app/controller/service/MoniteurPratique.service';

import {MoniteurPratiqueVo} from 'src/app/controller/model/MoniteurPratique.model';
import {CategoriePermisVo} from 'src/app/controller/model/CategoriePermis.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from 'src/app/controller/service/Auth.service';
import { ExportService } from 'src/app/controller/service/Export.service';

@Component({
  selector: 'app-categorie-permis-moniteur-pratique-list-chercheur',
  templateUrl: './categorie-permis-moniteur-pratique-list-chercheur.component.html',
  styleUrls: ['./categorie-permis-moniteur-pratique-list-chercheur.component.css']
})
export class CategoriePermisMoniteurPratiqueListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'CategoriePermisMoniteurPratique';
    categoriePermiss :Array<CategoriePermisVo>;
    moniteurPratiques :Array<MoniteurPratiqueVo>;


    constructor(private datePipe: DatePipe, private categoriePermisMoniteurPratiqueService: CategoriePermisMoniteurPratiqueService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
        , private categoriePermisService: CategoriePermisService
        , private moniteurPratiqueService: MoniteurPratiqueService
) { }

    ngOnInit() : void {
      this.loadCategoriePermisMoniteurPratiques();
      this.initExport();
      this.initCol();
      this.loadCategoriePermis();
      this.loadMoniteurPratique();
    }
    
    // methods
      public async loadCategoriePermisMoniteurPratiques(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('CategoriePermisMoniteurPratique', 'list');
        isPermistted ? this.categoriePermisMoniteurPratiqueService.findAll().subscribe(categoriePermisMoniteurPratiques => this.categoriePermisMoniteurPratiques = categoriePermisMoniteurPratiques,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.categoriePermisMoniteurPratiqueService.findByCriteria(this.searchCategoriePermisMoniteurPratique).subscribe(categoriePermisMoniteurPratiques=>{
            
            this.categoriePermisMoniteurPratiques = categoriePermisMoniteurPratiques;
           // this.searchCategoriePermisMoniteurPratique = new CategoriePermisMoniteurPratiqueVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'categoriePermis?.libele', header: 'Categorie permis'},
                        {field: 'moniteurPratique?.reference', header: 'Moniteur pratique'},
        ];
    }
    
    public async editCategoriePermisMoniteurPratique(categoriePermisMoniteurPratique: CategoriePermisMoniteurPratiqueVo){
        const isPermistted = await this.roleService.isPermitted('CategoriePermisMoniteurPratique', 'edit');
         if(isPermistted){
          this.categoriePermisMoniteurPratiqueService.findByIdWithAssociatedList(categoriePermisMoniteurPratique).subscribe(res => {
           this.selectedCategoriePermisMoniteurPratique = res;
            this.editCategoriePermisMoniteurPratiqueDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewCategoriePermisMoniteurPratique(categoriePermisMoniteurPratique: CategoriePermisMoniteurPratiqueVo){
        const isPermistted = await this.roleService.isPermitted('CategoriePermisMoniteurPratique', 'view');
        if(isPermistted){
           this.categoriePermisMoniteurPratiqueService.findByIdWithAssociatedList(categoriePermisMoniteurPratique).subscribe(res => {
           this.selectedCategoriePermisMoniteurPratique = res;
            this.viewCategoriePermisMoniteurPratiqueDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateCategoriePermisMoniteurPratique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedCategoriePermisMoniteurPratique = new CategoriePermisMoniteurPratiqueVo();
            this.createCategoriePermisMoniteurPratiqueDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteCategoriePermisMoniteurPratique(categoriePermisMoniteurPratique: CategoriePermisMoniteurPratiqueVo){
       const isPermistted = await this.roleService.isPermitted('CategoriePermisMoniteurPratique', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Categorie permis moniteur pratique) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.categoriePermisMoniteurPratiqueService.delete(categoriePermisMoniteurPratique).subscribe(status=>{
                          if(status > 0){
                          const position = this.categoriePermisMoniteurPratiques.indexOf(categoriePermisMoniteurPratique);
                          position > -1 ? this.categoriePermisMoniteurPratiques.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Categorie permis moniteur pratique Supprimé',
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
    const isPermistted = await this.roleService.isPermitted('CategoriePermisMoniteurPratique', 'list');
    isPermistted ? this.categoriePermisService.findAll().subscribe(categoriePermiss => this.categoriePermiss = categoriePermiss,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadMoniteurPratique(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('CategoriePermisMoniteurPratique', 'list');
    isPermistted ? this.moniteurPratiqueService.findAll().subscribe(moniteurPratiques => this.moniteurPratiques = moniteurPratiques,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateCategoriePermisMoniteurPratique(categoriePermisMoniteurPratique: CategoriePermisMoniteurPratiqueVo) {

     this.categoriePermisMoniteurPratiqueService.findByIdWithAssociatedList(categoriePermisMoniteurPratique).subscribe(
	 res => {
	       this.initDuplicateCategoriePermisMoniteurPratique(res);
	       this.selectedCategoriePermisMoniteurPratique = res;
	       this.selectedCategoriePermisMoniteurPratique.id = null;
            this.createCategoriePermisMoniteurPratiqueDialog = true;

});

	}

	initDuplicateCategoriePermisMoniteurPratique(res: CategoriePermisMoniteurPratiqueVo) {


	}

  initExport() : void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.categoriePermisMoniteurPratiques.map(e => {
    return {
            'Categorie permis': e.categoriePermisVo?.libele ,
            'Moniteur pratique': e.moniteurPratiqueVo?.reference ,
     }
      });

      this.criteriaData = [{
        'Categorie permis': this.searchCategoriePermisMoniteurPratique.categoriePermisVo?.libele ? this.searchCategoriePermisMoniteurPratique.categoriePermisVo?.libele : environment.emptyForExport ,
        'Moniteur pratique': this.searchCategoriePermisMoniteurPratique.moniteurPratiqueVo?.reference ? this.searchCategoriePermisMoniteurPratique.moniteurPratiqueVo?.reference : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get categoriePermisMoniteurPratiques() : Array<CategoriePermisMoniteurPratiqueVo> {
           return this.categoriePermisMoniteurPratiqueService.categoriePermisMoniteurPratiques;
       }
    set categoriePermisMoniteurPratiques(value: Array<CategoriePermisMoniteurPratiqueVo>) {
        this.categoriePermisMoniteurPratiqueService.categoriePermisMoniteurPratiques = value;
       }

    get categoriePermisMoniteurPratiqueSelections() : Array<CategoriePermisMoniteurPratiqueVo> {
           return this.categoriePermisMoniteurPratiqueService.categoriePermisMoniteurPratiqueSelections;
       }
    set categoriePermisMoniteurPratiqueSelections(value: Array<CategoriePermisMoniteurPratiqueVo>) {
        this.categoriePermisMoniteurPratiqueService.categoriePermisMoniteurPratiqueSelections = value;
       }
   
     


    get selectedCategoriePermisMoniteurPratique() : CategoriePermisMoniteurPratiqueVo {
           return this.categoriePermisMoniteurPratiqueService.selectedCategoriePermisMoniteurPratique;
       }
    set selectedCategoriePermisMoniteurPratique(value: CategoriePermisMoniteurPratiqueVo) {
        this.categoriePermisMoniteurPratiqueService.selectedCategoriePermisMoniteurPratique = value;
       }
    
    get createCategoriePermisMoniteurPratiqueDialog() :boolean {
           return this.categoriePermisMoniteurPratiqueService.createCategoriePermisMoniteurPratiqueDialog;
       }
    set createCategoriePermisMoniteurPratiqueDialog(value: boolean) {
        this.categoriePermisMoniteurPratiqueService.createCategoriePermisMoniteurPratiqueDialog= value;
       }
    
    get editCategoriePermisMoniteurPratiqueDialog() :boolean {
           return this.categoriePermisMoniteurPratiqueService.editCategoriePermisMoniteurPratiqueDialog;
       }
    set editCategoriePermisMoniteurPratiqueDialog(value: boolean) {
        this.categoriePermisMoniteurPratiqueService.editCategoriePermisMoniteurPratiqueDialog= value;
       }
    get viewCategoriePermisMoniteurPratiqueDialog() :boolean {
           return this.categoriePermisMoniteurPratiqueService.viewCategoriePermisMoniteurPratiqueDialog;
       }
    set viewCategoriePermisMoniteurPratiqueDialog(value: boolean) {
        this.categoriePermisMoniteurPratiqueService.viewCategoriePermisMoniteurPratiqueDialog = value;
       }
       
     get searchCategoriePermisMoniteurPratique() : CategoriePermisMoniteurPratiqueVo {
        return this.categoriePermisMoniteurPratiqueService.searchCategoriePermisMoniteurPratique;
       }
    set searchCategoriePermisMoniteurPratique(value: CategoriePermisMoniteurPratiqueVo) {
        this.categoriePermisMoniteurPratiqueService.searchCategoriePermisMoniteurPratique = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
