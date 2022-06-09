import {Component, OnInit} from '@angular/core';
import {InscriptionCandidatService} from 'src/app/controller/service/InscriptionCandidat.service';
import {InscriptionCandidatVo} from 'src/app/controller/model/InscriptionCandidat.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from 'src/app/controller/service/role.service';
import {DatePipe} from '@angular/common';


import { CandidatService } from 'src/app/controller/service/Candidat.service';
import { EcoleService } from 'src/app/controller/service/Ecole.service';
import { CategoriePermisService } from 'src/app/controller/service/CategoriePermis.service';
import { EtatInscriptionCandidatService } from 'src/app/controller/service/EtatInscriptionCandidat.service';

import {EcoleVo} from 'src/app/controller/model/Ecole.model';
import {CandidatVo} from 'src/app/controller/model/Candidat.model';
import {CategoriePermisVo} from 'src/app/controller/model/CategoriePermis.model';
import {EtatInscriptionCandidatVo} from 'src/app/controller/model/EtatInscriptionCandidat.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from 'src/app/controller/service/Auth.service';
import { ExportService } from 'src/app/controller/service/Export.service';

@Component({
  selector: 'app-inscription-candidat-list-chercheur',
  templateUrl: './inscription-candidat-list-chercheur.component.html',
  styleUrls: ['./inscription-candidat-list-chercheur.component.css']
})
export class InscriptionCandidatListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'InscriptionCandidat';
    candidats :Array<CandidatVo>;
    ecoles :Array<EcoleVo>;
    categoriePermiss :Array<CategoriePermisVo>;
    etatInscriptionCandidats :Array<EtatInscriptionCandidatVo>;


    constructor(private datePipe: DatePipe, private inscriptionCandidatService: InscriptionCandidatService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
        , private candidatService: CandidatService
        , private ecoleService: EcoleService
        , private categoriePermisService: CategoriePermisService
        , private etatInscriptionCandidatService: EtatInscriptionCandidatService
) { }

    ngOnInit() : void {
      this.loadInscriptionCandidats();
      this.initExport();
      this.initCol();
      this.loadCandidat();
      this.loadEcole();
      this.loadCategoriePermis();
      this.loadEtatInscriptionCandidat();
    }
    
    // methods
      public async loadInscriptionCandidats(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('InscriptionCandidat', 'list');
        isPermistted ? this.inscriptionCandidatService.findAll().subscribe(inscriptionCandidats => this.inscriptionCandidats = inscriptionCandidats,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.inscriptionCandidatService.findByCriteria(this.searchInscriptionCandidat).subscribe(inscriptionCandidats=>{
            
            this.inscriptionCandidats = inscriptionCandidats;
           // this.searchInscriptionCandidat = new InscriptionCandidatVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                        {field: 'candidat?.reference', header: 'Candidat'},
                        {field: 'ecole?.reference', header: 'Ecole'},
                            {field: 'dateInscription', header: 'Date inscription'},
                        {field: 'categoriePermis?.libele', header: 'Categorie permis'},
                        {field: 'etatInscriptionCandidat?.libelle', header: 'Etat inscription candidat'},
                            {field: 'dateDelivancePermis', header: 'Date delivance permis'},
                            {field: 'numeroPermis', header: 'Numero permis'},
                            {field: 'numBordereauPermis', header: 'Num bordereau permis'},
        ];
    }
    
    public async editInscriptionCandidat(inscriptionCandidat: InscriptionCandidatVo){
        const isPermistted = await this.roleService.isPermitted('InscriptionCandidat', 'edit');
         if(isPermistted){
          this.inscriptionCandidatService.findByIdWithAssociatedList(inscriptionCandidat).subscribe(res => {
           this.selectedInscriptionCandidat = res;
            this.selectedInscriptionCandidat.dateInscription = new Date(inscriptionCandidat.dateInscription);
            this.selectedInscriptionCandidat.dateDelivancePermis = new Date(inscriptionCandidat.dateDelivancePermis);
            this.editInscriptionCandidatDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewInscriptionCandidat(inscriptionCandidat: InscriptionCandidatVo){
        const isPermistted = await this.roleService.isPermitted('InscriptionCandidat', 'view');
        if(isPermistted){
           this.inscriptionCandidatService.findByIdWithAssociatedList(inscriptionCandidat).subscribe(res => {
           this.selectedInscriptionCandidat = res;
            this.selectedInscriptionCandidat.dateInscription = new Date(inscriptionCandidat.dateInscription);
            this.selectedInscriptionCandidat.dateDelivancePermis = new Date(inscriptionCandidat.dateDelivancePermis);
            this.viewInscriptionCandidatDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateInscriptionCandidat(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedInscriptionCandidat = new InscriptionCandidatVo();
            this.createInscriptionCandidatDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteInscriptionCandidat(inscriptionCandidat: InscriptionCandidatVo){
       const isPermistted = await this.roleService.isPermitted('InscriptionCandidat', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Inscription candidat) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.inscriptionCandidatService.delete(inscriptionCandidat).subscribe(status=>{
                          if(status > 0){
                          const position = this.inscriptionCandidats.indexOf(inscriptionCandidat);
                          position > -1 ? this.inscriptionCandidats.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Inscription candidat Supprimé',
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

public async loadCandidat(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('InscriptionCandidat', 'list');
    isPermistted ? this.candidatService.findAll().subscribe(candidats => this.candidats = candidats,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEcole(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('InscriptionCandidat', 'list');
    isPermistted ? this.ecoleService.findAll().subscribe(ecoles => this.ecoles = ecoles,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadCategoriePermis(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('InscriptionCandidat', 'list');
    isPermistted ? this.categoriePermisService.findAll().subscribe(categoriePermiss => this.categoriePermiss = categoriePermiss,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadEtatInscriptionCandidat(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('InscriptionCandidat', 'list');
    isPermistted ? this.etatInscriptionCandidatService.findAll().subscribe(etatInscriptionCandidats => this.etatInscriptionCandidats = etatInscriptionCandidats,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateInscriptionCandidat(inscriptionCandidat: InscriptionCandidatVo) {

     this.inscriptionCandidatService.findByIdWithAssociatedList(inscriptionCandidat).subscribe(
	 res => {
	       this.initDuplicateInscriptionCandidat(res);
	       this.selectedInscriptionCandidat = res;
	       this.selectedInscriptionCandidat.id = null;
            this.createInscriptionCandidatDialog = true;

});

	}

	initDuplicateInscriptionCandidat(res: InscriptionCandidatVo) {


	}

  initExport() : void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.inscriptionCandidats.map(e => {
    return {
            'Candidat': e.candidatVo?.reference ,
            'Ecole': e.ecoleVo?.reference ,
                    'Date inscription': this.datePipe.transform(e.dateInscription , 'dd-MM-yyyy'),
            'Categorie permis': e.categoriePermisVo?.libele ,
            'Etat inscription candidat': e.etatInscriptionCandidatVo?.libelle ,
                    'Date delivance permis': this.datePipe.transform(e.dateDelivancePermis , 'dd-MM-yyyy'),
                    'Numero permis': e.numeroPermis ,
                    'Num bordereau permis': e.numBordereauPermis ,
     }
      });

      this.criteriaData = [{
        'Candidat': this.searchInscriptionCandidat.candidatVo?.reference ? this.searchInscriptionCandidat.candidatVo?.reference : environment.emptyForExport ,
        'Ecole': this.searchInscriptionCandidat.ecoleVo?.reference ? this.searchInscriptionCandidat.ecoleVo?.reference : environment.emptyForExport ,
            'Date inscription Min': this.searchInscriptionCandidat.dateInscriptionMin ? this.datePipe.transform(this.searchInscriptionCandidat.dateInscriptionMin , this.dateFormat) : environment.emptyForExport ,
            'Date inscription Max': this.searchInscriptionCandidat.dateInscriptionMax ? this.datePipe.transform(this.searchInscriptionCandidat.dateInscriptionMax , this.dateFormat) : environment.emptyForExport ,
        'Categorie permis': this.searchInscriptionCandidat.categoriePermisVo?.libele ? this.searchInscriptionCandidat.categoriePermisVo?.libele : environment.emptyForExport ,
        'Etat inscription candidat': this.searchInscriptionCandidat.etatInscriptionCandidatVo?.libelle ? this.searchInscriptionCandidat.etatInscriptionCandidatVo?.libelle : environment.emptyForExport ,
            'Date delivance permis Min': this.searchInscriptionCandidat.dateDelivancePermisMin ? this.datePipe.transform(this.searchInscriptionCandidat.dateDelivancePermisMin , this.dateFormat) : environment.emptyForExport ,
            'Date delivance permis Max': this.searchInscriptionCandidat.dateDelivancePermisMax ? this.datePipe.transform(this.searchInscriptionCandidat.dateDelivancePermisMax , this.dateFormat) : environment.emptyForExport ,
            'Numero permis': this.searchInscriptionCandidat.numeroPermis ? this.searchInscriptionCandidat.numeroPermis : environment.emptyForExport ,
            'Num bordereau permis': this.searchInscriptionCandidat.numBordereauPermis ? this.searchInscriptionCandidat.numBordereauPermis : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get inscriptionCandidats() : Array<InscriptionCandidatVo> {
           return this.inscriptionCandidatService.inscriptionCandidats;
       }
    set inscriptionCandidats(value: Array<InscriptionCandidatVo>) {
        this.inscriptionCandidatService.inscriptionCandidats = value;
       }

    get inscriptionCandidatSelections() : Array<InscriptionCandidatVo> {
           return this.inscriptionCandidatService.inscriptionCandidatSelections;
       }
    set inscriptionCandidatSelections(value: Array<InscriptionCandidatVo>) {
        this.inscriptionCandidatService.inscriptionCandidatSelections = value;
       }
   
     


    get selectedInscriptionCandidat() : InscriptionCandidatVo {
           return this.inscriptionCandidatService.selectedInscriptionCandidat;
       }
    set selectedInscriptionCandidat(value: InscriptionCandidatVo) {
        this.inscriptionCandidatService.selectedInscriptionCandidat = value;
       }
    
    get createInscriptionCandidatDialog() :boolean {
           return this.inscriptionCandidatService.createInscriptionCandidatDialog;
       }
    set createInscriptionCandidatDialog(value: boolean) {
        this.inscriptionCandidatService.createInscriptionCandidatDialog= value;
       }
    
    get editInscriptionCandidatDialog() :boolean {
           return this.inscriptionCandidatService.editInscriptionCandidatDialog;
       }
    set editInscriptionCandidatDialog(value: boolean) {
        this.inscriptionCandidatService.editInscriptionCandidatDialog= value;
       }
    get viewInscriptionCandidatDialog() :boolean {
           return this.inscriptionCandidatService.viewInscriptionCandidatDialog;
       }
    set viewInscriptionCandidatDialog(value: boolean) {
        this.inscriptionCandidatService.viewInscriptionCandidatDialog = value;
       }
       
     get searchInscriptionCandidat() : InscriptionCandidatVo {
        return this.inscriptionCandidatService.searchInscriptionCandidat;
       }
    set searchInscriptionCandidat(value: InscriptionCandidatVo) {
        this.inscriptionCandidatService.searchInscriptionCandidat = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
