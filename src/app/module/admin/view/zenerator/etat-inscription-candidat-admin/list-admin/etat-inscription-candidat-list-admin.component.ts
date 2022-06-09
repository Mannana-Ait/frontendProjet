import {Component, OnInit} from '@angular/core';
import {EtatInscriptionCandidatService} from 'src/app/controller/service/EtatInscriptionCandidat.service';
import {EtatInscriptionCandidatVo} from 'src/app/controller/model/EtatInscriptionCandidat.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { RoleService } from 'src/app/controller/service/role.service';
import {DatePipe} from '@angular/common';



import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import {AuthService} from 'src/app/controller/service/Auth.service';
import { ExportService } from 'src/app/controller/service/Export.service';

@Component({
  selector: 'app-etat-inscription-candidat-list-admin',
  templateUrl: './etat-inscription-candidat-list-admin.component.html',
  styleUrls: ['./etat-inscription-candidat-list-admin.component.css']
})
export class EtatInscriptionCandidatListAdminComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'EtatInscriptionCandidat';


    constructor(private datePipe: DatePipe, private etatInscriptionCandidatService: EtatInscriptionCandidatService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadEtatInscriptionCandidats();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadEtatInscriptionCandidats(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EtatInscriptionCandidat', 'list');
        isPermistted ? this.etatInscriptionCandidatService.findAll().subscribe(etatInscriptionCandidats => this.etatInscriptionCandidats = etatInscriptionCandidats,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.etatInscriptionCandidatService.findByCriteria(this.searchEtatInscriptionCandidat).subscribe(etatInscriptionCandidats=>{
            
            this.etatInscriptionCandidats = etatInscriptionCandidats;
           // this.searchEtatInscriptionCandidat = new EtatInscriptionCandidatVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'libelle', header: 'Libelle'},
        ];
    }
    
    public async editEtatInscriptionCandidat(etatInscriptionCandidat: EtatInscriptionCandidatVo){
        const isPermistted = await this.roleService.isPermitted('EtatInscriptionCandidat', 'edit');
         if(isPermistted){
          this.etatInscriptionCandidatService.findByIdWithAssociatedList(etatInscriptionCandidat).subscribe(res => {
           this.selectedEtatInscriptionCandidat = res;
            this.editEtatInscriptionCandidatDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewEtatInscriptionCandidat(etatInscriptionCandidat: EtatInscriptionCandidatVo){
        const isPermistted = await this.roleService.isPermitted('EtatInscriptionCandidat', 'view');
        if(isPermistted){
           this.etatInscriptionCandidatService.findByIdWithAssociatedList(etatInscriptionCandidat).subscribe(res => {
           this.selectedEtatInscriptionCandidat = res;
            this.viewEtatInscriptionCandidatDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateEtatInscriptionCandidat(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedEtatInscriptionCandidat = new EtatInscriptionCandidatVo();
            this.createEtatInscriptionCandidatDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteEtatInscriptionCandidat(etatInscriptionCandidat: EtatInscriptionCandidatVo){
       const isPermistted = await this.roleService.isPermitted('EtatInscriptionCandidat', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Etat inscription candidat) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.etatInscriptionCandidatService.delete(etatInscriptionCandidat).subscribe(status=>{
                          if(status > 0){
                          const position = this.etatInscriptionCandidats.indexOf(etatInscriptionCandidat);
                          position > -1 ? this.etatInscriptionCandidats.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Etat inscription candidat Supprimé',
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


public async duplicateEtatInscriptionCandidat(etatInscriptionCandidat: EtatInscriptionCandidatVo) {

     this.etatInscriptionCandidatService.findByIdWithAssociatedList(etatInscriptionCandidat).subscribe(
	 res => {
	       this.initDuplicateEtatInscriptionCandidat(res);
	       this.selectedEtatInscriptionCandidat = res;
	       this.selectedEtatInscriptionCandidat.id = null;
            this.createEtatInscriptionCandidatDialog = true;

});

	}

	initDuplicateEtatInscriptionCandidat(res: EtatInscriptionCandidatVo) {


	}

  initExport() : void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.etatInscriptionCandidats.map(e => {
    return {
                    'Libelle': e.libelle ,
     }
      });

      this.criteriaData = [{
            'Libelle': this.searchEtatInscriptionCandidat.libelle ? this.searchEtatInscriptionCandidat.libelle : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get etatInscriptionCandidats() : Array<EtatInscriptionCandidatVo> {
           return this.etatInscriptionCandidatService.etatInscriptionCandidats;
       }
    set etatInscriptionCandidats(value: Array<EtatInscriptionCandidatVo>) {
        this.etatInscriptionCandidatService.etatInscriptionCandidats = value;
       }

    get etatInscriptionCandidatSelections() : Array<EtatInscriptionCandidatVo> {
           return this.etatInscriptionCandidatService.etatInscriptionCandidatSelections;
       }
    set etatInscriptionCandidatSelections(value: Array<EtatInscriptionCandidatVo>) {
        this.etatInscriptionCandidatService.etatInscriptionCandidatSelections = value;
       }
   
     


    get selectedEtatInscriptionCandidat() : EtatInscriptionCandidatVo {
           return this.etatInscriptionCandidatService.selectedEtatInscriptionCandidat;
       }
    set selectedEtatInscriptionCandidat(value: EtatInscriptionCandidatVo) {
        this.etatInscriptionCandidatService.selectedEtatInscriptionCandidat = value;
       }
    
    get createEtatInscriptionCandidatDialog() :boolean {
           return this.etatInscriptionCandidatService.createEtatInscriptionCandidatDialog;
       }
    set createEtatInscriptionCandidatDialog(value: boolean) {
        this.etatInscriptionCandidatService.createEtatInscriptionCandidatDialog= value;
       }
    
    get editEtatInscriptionCandidatDialog() :boolean {
           return this.etatInscriptionCandidatService.editEtatInscriptionCandidatDialog;
       }
    set editEtatInscriptionCandidatDialog(value: boolean) {
        this.etatInscriptionCandidatService.editEtatInscriptionCandidatDialog= value;
       }
    get viewEtatInscriptionCandidatDialog() :boolean {
           return this.etatInscriptionCandidatService.viewEtatInscriptionCandidatDialog;
       }
    set viewEtatInscriptionCandidatDialog(value: boolean) {
        this.etatInscriptionCandidatService.viewEtatInscriptionCandidatDialog = value;
       }
       
     get searchEtatInscriptionCandidat() : EtatInscriptionCandidatVo {
        return this.etatInscriptionCandidatService.searchEtatInscriptionCandidat;
       }
    set searchEtatInscriptionCandidat(value: EtatInscriptionCandidatVo) {
        this.etatInscriptionCandidatService.searchEtatInscriptionCandidat = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
