import {Component, OnInit} from '@angular/core';
import {CandidatService} from 'src/app/controller/service/Candidat.service';
import {CandidatVo} from 'src/app/controller/model/Candidat.model';
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
  selector: 'app-candidat-list-chercheur',
  templateUrl: './candidat-list-chercheur.component.html',
  styleUrls: ['./candidat-list-chercheur.component.css']
})
export class CandidatListChercheurComponent implements OnInit {
   // declarations
    findByCriteriaShow:boolean=false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Candidat';


    constructor(private datePipe: DatePipe, private candidatService: CandidatService,private messageService: MessageService,private confirmationService: ConfirmationService,private roleService:RoleService, private router: Router , private authService: AuthService , private exportService: ExportService
) { }

    ngOnInit() : void {
      this.loadCandidats();
      this.initExport();
      this.initCol();
    }
    
    // methods
      public async loadCandidats(){
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Candidat', 'list');
        isPermistted ? this.candidatService.findAll().subscribe(candidats => this.candidats = candidats,error=>console.log(error))
        : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


  public searchRequest(){
        this.candidatService.findByCriteria(this.searchCandidat).subscribe(candidats=>{
            
            this.candidats = candidats;
           // this.searchCandidat = new CandidatVo();
        },error=>console.log(error));
    }

    private initCol() {
        this.cols = [
                            {field: 'reference', header: 'Reference'},
                            {field: 'nom', header: 'Nom'},
                            {field: 'adresse', header: 'Adresse'},
                            {field: 'cin', header: 'Cin'},
                            {field: 'numTele', header: 'Num tele'},
                            {field: 'email', header: 'Email'},
        ];
    }
    
    public async editCandidat(candidat: CandidatVo){
        const isPermistted = await this.roleService.isPermitted('Candidat', 'edit');
         if(isPermistted){
          this.candidatService.findByIdWithAssociatedList(candidat).subscribe(res => {
           this.selectedCandidat = res;
            this.editCandidatDialog = true;
          });
        }else{
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
         }
       
    }
    


   public async viewCandidat(candidat: CandidatVo){
        const isPermistted = await this.roleService.isPermitted('Candidat', 'view');
        if(isPermistted){
           this.candidatService.findByIdWithAssociatedList(candidat).subscribe(res => {
           this.selectedCandidat = res;
            this.viewCandidatDialog = true;
          });
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
        
    }
    
    public async openCreateCandidat(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if(isPermistted){
         this.selectedCandidat = new CandidatVo();
            this.createCandidatDialog = true;
        }else{
             this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }
       
    }


    public async deleteCandidat(candidat: CandidatVo){
       const isPermistted = await this.roleService.isPermitted('Candidat', 'delete');
        if(isPermistted){
                      this.confirmationService.confirm({
                      message: 'Voulez-vous supprimer cet élément (Candidat) ?',
                      header: 'Confirmation',
                      icon: 'pi pi-exclamation-triangle',
                      accept: () => {
                          this.candidatService.delete(candidat).subscribe(status=>{
                          if(status > 0){
                          const position = this.candidats.indexOf(candidat);
                          position > -1 ? this.candidats.splice(position, 1) : false;
                       this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Candidat Supprimé',
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


public async duplicateCandidat(candidat: CandidatVo) {

     this.candidatService.findByIdWithAssociatedList(candidat).subscribe(
	 res => {
	       this.initDuplicateCandidat(res);
	       this.selectedCandidat = res;
	       this.selectedCandidat.id = null;
            this.createCandidatDialog = true;

});

	}

	initDuplicateCandidat(res: CandidatVo) {


	}

  initExport() : void {
    this.excelPdfButons = [
      {label: 'CSV', icon: 'pi pi-file', command: () => {this.prepareColumnExport();this.exportService.exportCSV(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'XLS', icon: 'pi pi-file-excel', command: () => {this.prepareColumnExport();this.exportService.exportExcel(this.criteriaData,this.exportData,this.fileName);}},
      {label: 'PDF', icon: 'pi pi-file-pdf', command: () => {this.prepareColumnExport();this.exportService.exportPdf(this.criteriaData,this.exportData,this.fileName);}}
   ];
  }


    prepareColumnExport() : void {
    this.exportData = this.candidats.map(e => {
    return {
                    'Reference': e.reference ,
                    'Nom': e.nom ,
                    'Adresse': e.adresse ,
                    'Cin': e.cin ,
                    'Num tele': e.numTele ,
                    'Email': e.email ,
     }
      });

      this.criteriaData = [{
            'Reference': this.searchCandidat.reference ? this.searchCandidat.reference : environment.emptyForExport ,
            'Nom': this.searchCandidat.nom ? this.searchCandidat.nom : environment.emptyForExport ,
            'Adresse': this.searchCandidat.adresse ? this.searchCandidat.adresse : environment.emptyForExport ,
            'Cin': this.searchCandidat.cin ? this.searchCandidat.cin : environment.emptyForExport ,
            'Num tele': this.searchCandidat.numTele ? this.searchCandidat.numTele : environment.emptyForExport ,
            'Email': this.searchCandidat.email ? this.searchCandidat.email : environment.emptyForExport ,
     }];

      }

    // getters and setters

    get candidats() : Array<CandidatVo> {
           return this.candidatService.candidats;
       }
    set candidats(value: Array<CandidatVo>) {
        this.candidatService.candidats = value;
       }

    get candidatSelections() : Array<CandidatVo> {
           return this.candidatService.candidatSelections;
       }
    set candidatSelections(value: Array<CandidatVo>) {
        this.candidatService.candidatSelections = value;
       }
   
     


    get selectedCandidat() : CandidatVo {
           return this.candidatService.selectedCandidat;
       }
    set selectedCandidat(value: CandidatVo) {
        this.candidatService.selectedCandidat = value;
       }
    
    get createCandidatDialog() :boolean {
           return this.candidatService.createCandidatDialog;
       }
    set createCandidatDialog(value: boolean) {
        this.candidatService.createCandidatDialog= value;
       }
    
    get editCandidatDialog() :boolean {
           return this.candidatService.editCandidatDialog;
       }
    set editCandidatDialog(value: boolean) {
        this.candidatService.editCandidatDialog= value;
       }
    get viewCandidatDialog() :boolean {
           return this.candidatService.viewCandidatDialog;
       }
    set viewCandidatDialog(value: boolean) {
        this.candidatService.viewCandidatDialog = value;
       }
       
     get searchCandidat() : CandidatVo {
        return this.candidatService.searchCandidat;
       }
    set searchCandidat(value: CandidatVo) {
        this.candidatService.searchCandidat = value;
       }


    get dateFormat(){
            return environment.dateFormatList;
    }


}
