import {Component, OnInit} from '@angular/core';
import {AvisVisiteurService} from 'src/app/controller/service/AvisVisiteur.service';
import {AvisVisiteurVo} from 'src/app/controller/model/AvisVisiteur.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, {RowInput} from 'jspdf-autotable';
import {saveAs} from 'file-saver';
import {RoleService} from 'src/app/controller/service/role.service';
import {DatePipe} from '@angular/common';


import {TypeAvisService} from 'src/app/controller/service/TypeAvis.service';

import {TypeAvisVo} from 'src/app/controller/model/TypeAvis.model';
import {MessageService, ConfirmationService, MenuItem} from 'primeng/api';
import {AuthService} from 'src/app/controller/service/Auth.service';
import {ExportService} from 'src/app/controller/service/Export.service';

@Component({
    selector: 'app-avis-visiteur-list-chercheur',
    templateUrl: './avis-visiteur-list-chercheur.component.html',
    styleUrls: ['./avis-visiteur-list-chercheur.component.css']
})
export class AvisVisiteurListChercheurComponent implements OnInit {
    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'AvisVisiteur';
    typeAviss: Array<TypeAvisVo>;


    constructor(private datePipe: DatePipe, private avisVisiteurService: AvisVisiteurService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService, private exportService: ExportService
        , private typeAvisService: TypeAvisService
    ) {
    }

    ngOnInit(): void {
        this.loadAvisVisiteurs();
        this.initExport();
        this.initCol();
        this.loadTypeAvis();
    }

    // methods
    public async loadAvisVisiteurs() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('AvisVisiteur', 'list');
        isPermistted ? this.avisVisiteurService.findAll().subscribe(avisVisiteurs => this.avisVisiteurs = avisVisiteurs, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


    public searchRequest() {
        this.avisVisiteurService.findByCriteria(this.searchAvisVisiteur).subscribe(avisVisiteurs => {

            this.avisVisiteurs = avisVisiteurs;
            // this.searchAvisVisiteur = new AvisVisiteurVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'reference', header: 'Reference'},
            {field: 'emailVisiteur', header: 'Email visiteur'},
            {field: 'objet', header: 'Objet'},
            {field: 'ratting', header: 'Ratting'},
            {field: 'typeAvis?.libelle', header: 'Type avis'},
        ];
    }

    public async editAvisVisiteur(avisVisiteur: AvisVisiteurVo) {
        const isPermistted = await this.roleService.isPermitted('AvisVisiteur', 'edit');
        if (isPermistted) {
            this.avisVisiteurService.findByIdWithAssociatedList(avisVisiteur).subscribe(res => {
                this.selectedAvisVisiteur = res;
                this.editAvisVisiteurDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewAvisVisiteur(avisVisiteur: AvisVisiteurVo) {
        const isPermistted = await this.roleService.isPermitted('AvisVisiteur', 'view');
        if (isPermistted) {
            this.avisVisiteurService.findByIdWithAssociatedList(avisVisiteur).subscribe(res => {
                this.selectedAvisVisiteur = res;
                this.viewAvisVisiteurDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateAvisVisiteur(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedAvisVisiteur = new AvisVisiteurVo();
            this.createAvisVisiteurDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }


    public async deleteAvisVisiteur(avisVisiteur: AvisVisiteurVo) {
        const isPermistted = await this.roleService.isPermitted('AvisVisiteur', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Avis visiteur) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.avisVisiteurService.delete(avisVisiteur).subscribe(status => {
                        if (status > 0) {
                            const position = this.avisVisiteurs.indexOf(avisVisiteur);
                            position > -1 ? this.avisVisiteurs.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Avis visiteur Supprimé',
                                life: 3000
                            });
                        }

                    }, error => console.log(error));
                }
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'Problème de permission'
            });
        }
    }

    public async loadTypeAvis() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('AvisVisiteur', 'list');
        isPermistted ? this.typeAvisService.findAll().subscribe(typeAviss => this.typeAviss = typeAviss, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async duplicateAvisVisiteur(avisVisiteur: AvisVisiteurVo) {

        this.avisVisiteurService.findByIdWithAssociatedList(avisVisiteur).subscribe(
            res => {
                this.initDuplicateAvisVisiteur(res);
                this.selectedAvisVisiteur = res;
                this.selectedAvisVisiteur.id = null;
                this.createAvisVisiteurDialog = true;

            });

    }

    initDuplicateAvisVisiteur(res: AvisVisiteurVo) {


    }

    initExport(): void {
        this.excelPdfButons = [
            {
                label: 'CSV', icon: 'pi pi-file', command: () => {
                    this.prepareColumnExport();
                    this.exportService.exportCSV(this.criteriaData, this.exportData, this.fileName);
                }
            },
            {
                label: 'XLS', icon: 'pi pi-file-excel', command: () => {
                    this.prepareColumnExport();
                    this.exportService.exportExcel(this.criteriaData, this.exportData, this.fileName);
                }
            },
            {
                label: 'PDF', icon: 'pi pi-file-pdf', command: () => {
                    this.prepareColumnExport();
                    this.exportService.exportPdf(this.criteriaData, this.exportData, this.fileName);
                }
            }
        ];
    }


    prepareColumnExport(): void {
        this.exportData = this.avisVisiteurs.map(e => {
            return {
                'Reference': e.reference,
                'Email visiteur': e.emailVisiteur,
                'Objet': e.objet,
                'Message': e.message,
                'Ratting': e.ratting,
                'Type avis': e.typeAvisVo?.libelle,
            };
        });

        this.criteriaData = [{
            'Reference': this.searchAvisVisiteur.reference ? this.searchAvisVisiteur.reference : environment.emptyForExport,
            'Email visiteur': this.searchAvisVisiteur.emailVisiteur ? this.searchAvisVisiteur.emailVisiteur : environment.emptyForExport,
            'Objet': this.searchAvisVisiteur.objet ? this.searchAvisVisiteur.objet : environment.emptyForExport,
            'Message': this.searchAvisVisiteur.message ? this.searchAvisVisiteur.message : environment.emptyForExport,
            'Ratting Min': this.searchAvisVisiteur.rattingMin ? this.searchAvisVisiteur.rattingMin : environment.emptyForExport,
            'Ratting Max': this.searchAvisVisiteur.rattingMax ? this.searchAvisVisiteur.rattingMax : environment.emptyForExport,
            'Type avis': this.searchAvisVisiteur.typeAvisVo?.libelle ? this.searchAvisVisiteur.typeAvisVo?.libelle : environment.emptyForExport,
        }];

    }

    // getters and setters

    get avisVisiteurs(): Array<AvisVisiteurVo> {
        return this.avisVisiteurService.avisVisiteurs;
    }

    set avisVisiteurs(value: Array<AvisVisiteurVo>) {
        this.avisVisiteurService.avisVisiteurs = value;
    }

    get avisVisiteurSelections(): Array<AvisVisiteurVo> {
        return this.avisVisiteurService.avisVisiteurSelections;
    }

    set avisVisiteurSelections(value: Array<AvisVisiteurVo>) {
        this.avisVisiteurService.avisVisiteurSelections = value;
    }


    get selectedAvisVisiteur(): AvisVisiteurVo {
        return this.avisVisiteurService.selectedAvisVisiteur;
    }

    set selectedAvisVisiteur(value: AvisVisiteurVo) {
        this.avisVisiteurService.selectedAvisVisiteur = value;
    }

    get createAvisVisiteurDialog(): boolean {
        return this.avisVisiteurService.createAvisVisiteurDialog;
    }

    set createAvisVisiteurDialog(value: boolean) {
        this.avisVisiteurService.createAvisVisiteurDialog = value;
    }

    get editAvisVisiteurDialog(): boolean {
        return this.avisVisiteurService.editAvisVisiteurDialog;
    }

    set editAvisVisiteurDialog(value: boolean) {
        this.avisVisiteurService.editAvisVisiteurDialog = value;
    }

    get viewAvisVisiteurDialog(): boolean {
        return this.avisVisiteurService.viewAvisVisiteurDialog;
    }

    set viewAvisVisiteurDialog(value: boolean) {
        this.avisVisiteurService.viewAvisVisiteurDialog = value;
    }

    get searchAvisVisiteur(): AvisVisiteurVo {
        return this.avisVisiteurService.searchAvisVisiteur;
    }

    set searchAvisVisiteur(value: AvisVisiteurVo) {
        this.avisVisiteurService.searchAvisVisiteur = value;
    }


    get dateFormat() {
        return environment.dateFormatList;
    }


}
