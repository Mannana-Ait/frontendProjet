import {Component, OnInit} from '@angular/core';
import {AvisCondidatService} from 'src/app/controller/service/AvisCondidat.service';
import {AvisCondidatVo} from 'src/app/controller/model/AvisCondidat.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from 'src/app/controller/service/role.service';
import {DatePipe} from '@angular/common';


import { EcoleService } from 'src/app/controller/service/Ecole.service';
import { TypeAvisService } from 'src/app/controller/service/TypeAvis.service';

import {EcoleVo} from 'src/app/controller/model/Ecole.model';
import {TypeAvisVo} from 'src/app/controller/model/TypeAvis.model';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from 'src/app/controller/service/Auth.service';
import { ExportService } from 'src/app/controller/service/Export.service';

@Component({
  selector: 'app-avis-condidat-list-chercheur',
  templateUrl: './avis-condidat-list-chercheur.component.html',
  styleUrls: ['./avis-condidat-list-chercheur.component.css']
})
export class AvisCondidatListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'AvisCondidat';
    ecoles :Array<EcoleVo>;
    typeAviss :Array<TypeAvisVo>;


    constructor(private datePipe: DatePipe, private avisCondidatService: AvisCondidatService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
        , private ecoleService: EcoleService
        , private typeAvisService: TypeAvisService
) { }

    ngOnInit() : void {
      this.loadAvisCondidats();
      this.initExport();
      this.initCol();
      this.loadEcole();
      this.loadTypeAvis();
    }
    
    // methods
      public async loadAvisCondidats(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('AvisCondidat', 'list');
        isPermistted ? this.avisCondidatService.findAll().subscribe(avisCondidats => this.avisCondidats = avisCondidats,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.avisCondidatService.findByCriteria(this.searchAvisCondidat).subscribe(avisCondidats=>{
            
            this.avisCondidats = avisCondidats;
           // this.searchAvisCondidat = new AvisCondidatVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'reference', header: 'Reference'},
                        {field: 'ecole?.reference', header: 'Ecole'},
                            {field: 'objet', header: 'Objet'},
                        {field: 'typeAvis?.libelle', header: 'Type avis'},
                            {field: 'ratting', header: 'Ratting'},
        ];
    }
    
    public async editAvisCondidat(avisCondidat: AvisCondidatVo){
        const isPermistted = await this.roleService.isPermitted('AvisCondidat', 'edit');
         if(isPermistted){
          this.avisCondidatService.findByIdWithAssociatedList(avisCondidat).subscribe(res => {
           this.selectedAvisCondidat = res;
            this.editAvisCondidatDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewAvisCondidat(avisCondidat: AvisCondidatVo){
        const isPermistted = await this.roleService.isPermitted('AvisCondidat', 'view');
        if(isPermistted){
           this.avisCondidatService.findByIdWithAssociatedList(avisCondidat).subscribe(res => {
           this.selectedAvisCondidat = res;
            this.viewAvisCondidatDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateAvisCondidat(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedAvisCondidat = new AvisCondidatVo();
            this.createAvisCondidatDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteAvisCondidat(avisCondidat: AvisCondidatVo){
       const isPermistted = await this.roleService.isPermitted('AvisCondidat', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Avis condidat) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.avisCondidatService.delete(avisCondidat).subscribe(status=>{
                          if(status > 0){
                          const position = this.avisCondidats.indexOf(avisCondidat);
                          position > -1 ? this.avisCondidats.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Avis condidat Supprimé',
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

public async loadEcole(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('AvisCondidat', 'list');
    isPermistted ? this.ecoleService.findAll().subscribe(ecoles => this.ecoles = ecoles,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}
public async loadTypeAvis(){
    await this.roleService.findAll();
    const isPermistted = await this.roleService.isPermitted('AvisCondidat', 'list');
    isPermistted ? this.typeAvisService.findAll().subscribe(typeAviss => this.typeAviss = typeAviss,error=>console.log(error))
    : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

}

public async duplicateAvisCondidat(avisCondidat: AvisCondidatVo) {

     this.avisCondidatService.findByIdWithAssociatedList(avisCondidat).subscribe(
	 res => {
	       this.initDuplicateAvisCondidat(res);
	       this.selectedAvisCondidat = res;
	       this.selectedAvisCondidat.id = null;
            this.createAvisCondidatDialog = true;

});

	}

	initDuplicateAvisCondidat(res: AvisCondidatVo) {


	}

  initExport() : void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.avisCondidats.map(e => {
    return {
                    'Reference': e.reference ,
            'Ecole': e.ecoleVo?.reference ,
                    'Objet': e.objet ,
                    'Message': e.message ,
            'Type avis': e.typeAvisVo?.libelle ,
                    'Ratting': e.ratting ,
     }
      });

      this.criteriaData = [{
            'Reference': this.searchAvisCondidat.reference ? this.searchAvisCondidat.reference : environment.emptyForExport ,
        'Ecole': this.searchAvisCondidat.ecoleVo?.reference ? this.searchAvisCondidat.ecoleVo?.reference : environment.emptyForExport ,
            'Objet': this.searchAvisCondidat.objet ? this.searchAvisCondidat.objet : environment.emptyForExport ,
            'Message': this.searchAvisCondidat.message ? this.searchAvisCondidat.message : environment.emptyForExport ,
        'Type avis': this.searchAvisCondidat.typeAvisVo?.libelle ? this.searchAvisCondidat.typeAvisVo?.libelle : environment.emptyForExport ,
            'Ratting Min': this.searchAvisCondidat.rattingMin ? this.searchAvisCondidat.rattingMin : environment.emptyForExport ,
            'Ratting Max': this.searchAvisCondidat.rattingMax ? this.searchAvisCondidat.rattingMax : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get avisCondidats() : Array<AvisCondidatVo> {
           return this.avisCondidatService.avisCondidats;
       }
    set avisCondidats(value: Array<AvisCondidatVo>) {
        this.avisCondidatService.avisCondidats = value;
       }

    get avisCondidatSelections() : Array<AvisCondidatVo> {
           return this.avisCondidatService.avisCondidatSelections;
       }
    set avisCondidatSelections(value: Array<AvisCondidatVo>) {
        this.avisCondidatService.avisCondidatSelections = value;
       }
   
     


    get selectedAvisCondidat() : AvisCondidatVo {
           return this.avisCondidatService.selectedAvisCondidat;
       }
    set selectedAvisCondidat(value: AvisCondidatVo) {
        this.avisCondidatService.selectedAvisCondidat = value;
       }
    
    get createAvisCondidatDialog() :boolean {
           return this.avisCondidatService.createAvisCondidatDialog;
       }
    set createAvisCondidatDialog(value: boolean) {
        this.avisCondidatService.createAvisCondidatDialog= value;
       }
    
    get editAvisCondidatDialog() :boolean {
           return this.avisCondidatService.editAvisCondidatDialog;
       }
    set editAvisCondidatDialog(value: boolean) {
        this.avisCondidatService.editAvisCondidatDialog= value;
       }
    get viewAvisCondidatDialog() :boolean {
           return this.avisCondidatService.viewAvisCondidatDialog;
       }
    set viewAvisCondidatDialog(value: boolean) {
        this.avisCondidatService.viewAvisCondidatDialog = value;
       }
       
     get searchAvisCondidat() : AvisCondidatVo {
        return this.avisCondidatService.searchAvisCondidat;
       }
    set searchAvisCondidat(value: AvisCondidatVo) {
        this.avisCondidatService.searchAvisCondidat = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
