import {Component, OnInit} from '@angular/core';
import {JourService} from 'src/app/controller/service/Jour.service';
import {JourVo} from 'src/app/controller/model/Jour.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, {RowInput} from 'jspdf-autotable';
import {saveAs} from 'file-saver';
import {RoleService} from 'src/app/controller/service/role.service';
import {DatePipe} from '@angular/common';


import {MessageService, ConfirmationService, MenuItem} from 'primeng/api';
import {AuthService} from 'src/app/controller/service/Auth.service';
import {ExportService} from 'src/app/controller/service/Export.service';

@Component({
    selector: 'app-jour-list-chercheur',
    templateUrl: './jour-list-chercheur.component.html',
    styleUrls: ['./jour-list-chercheur.component.css']
})
export class JourListChercheurComponent implements OnInit {
    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Jour';


    constructor(private datePipe: DatePipe, private jourService: JourService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService, private exportService: ExportService
    ) {
    }

    ngOnInit(): void {
        this.loadJours();
        this.initExport();
        this.initCol();
    }

    // methods
    public async loadJours() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Jour', 'list');
        isPermistted ? this.jourService.findAll().subscribe(jours => this.jours = jours, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


    public searchRequest() {
        this.jourService.findByCriteria(this.searchJour).subscribe(jours => {

            this.jours = jours;
            // this.searchJour = new JourVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'reference', header: 'Reference'},
            {field: 'libelle', header: 'Libelle'},
        ];
    }

    public async editJour(jour: JourVo) {
        const isPermistted = await this.roleService.isPermitted('Jour', 'edit');
        if (isPermistted) {
            this.jourService.findByIdWithAssociatedList(jour).subscribe(res => {
                this.selectedJour = res;
                this.editJourDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewJour(jour: JourVo) {
        const isPermistted = await this.roleService.isPermitted('Jour', 'view');
        if (isPermistted) {
            this.jourService.findByIdWithAssociatedList(jour).subscribe(res => {
                this.selectedJour = res;
                this.viewJourDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateJour(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedJour = new JourVo();
            this.createJourDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }


    public async deleteJour(jour: JourVo) {
        const isPermistted = await this.roleService.isPermitted('Jour', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Jour) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.jourService.delete(jour).subscribe(status => {
                        if (status > 0) {
                            const position = this.jours.indexOf(jour);
                            position > -1 ? this.jours.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Jour Supprimé',
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


    public async duplicateJour(jour: JourVo) {

        this.jourService.findByIdWithAssociatedList(jour).subscribe(
            res => {
                this.initDuplicateJour(res);
                this.selectedJour = res;
                this.selectedJour.id = null;
                this.createJourDialog = true;

            });

    }

    initDuplicateJour(res: JourVo) {


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
        this.exportData = this.jours.map(e => {
            return {
                'Reference': e.reference,
                'Libelle': e.libelle,
            };
        });

        this.criteriaData = [{
            'Reference': this.searchJour.reference ? this.searchJour.reference : environment.emptyForExport,
            'Libelle': this.searchJour.libelle ? this.searchJour.libelle : environment.emptyForExport,
        }];

    }

    // getters and setters

    get jours(): Array<JourVo> {
        return this.jourService.jours;
    }

    set jours(value: Array<JourVo>) {
        this.jourService.jours = value;
    }

    get jourSelections(): Array<JourVo> {
        return this.jourService.jourSelections;
    }

    set jourSelections(value: Array<JourVo>) {
        this.jourService.jourSelections = value;
    }


    get selectedJour(): JourVo {
        return this.jourService.selectedJour;
    }

    set selectedJour(value: JourVo) {
        this.jourService.selectedJour = value;
    }

    get createJourDialog(): boolean {
        return this.jourService.createJourDialog;
    }

    set createJourDialog(value: boolean) {
        this.jourService.createJourDialog = value;
    }

    get editJourDialog(): boolean {
        return this.jourService.editJourDialog;
    }

    set editJourDialog(value: boolean) {
        this.jourService.editJourDialog = value;
    }

    get viewJourDialog(): boolean {
        return this.jourService.viewJourDialog;
    }

    set viewJourDialog(value: boolean) {
        this.jourService.viewJourDialog = value;
    }

    get searchJour(): JourVo {
        return this.jourService.searchJour;
    }

    set searchJour(value: JourVo) {
        this.jourService.searchJour = value;
    }


    get dateFormat() {
        return environment.dateFormatList;
    }


}
