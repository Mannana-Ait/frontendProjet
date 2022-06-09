import {Component, OnInit} from '@angular/core';
import {PermisService} from 'src/app/controller/service/Permis.service';
import {PermisVo} from 'src/app/controller/model/Permis.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, {RowInput} from 'jspdf-autotable';
import {saveAs} from 'file-saver';
import {RoleService} from 'src/app/controller/service/role.service';
import {DatePipe} from '@angular/common';


import {CategoriePermisService} from 'src/app/controller/service/CategoriePermis.service';

import {CategoriePermisVo} from 'src/app/controller/model/CategoriePermis.model';
import {MessageService, ConfirmationService, MenuItem} from 'primeng/api';
import {AuthService} from 'src/app/controller/service/Auth.service';
import {ExportService} from 'src/app/controller/service/Export.service';

@Component({
    selector: 'app-permis-list-chercheur',
    templateUrl: './permis-list-chercheur.component.html',
    styleUrls: ['./permis-list-chercheur.component.css']
})
export class PermisListChercheurComponent implements OnInit {
    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Permis';
    categoriePermiss: Array<CategoriePermisVo>;


    constructor(private datePipe: DatePipe, private permisService: PermisService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService, private exportService: ExportService
        , private categoriePermisService: CategoriePermisService
    ) {
    }

    ngOnInit(): void {
        this.loadPermiss();
        this.initExport();
        this.initCol();
        this.loadCategoriePermis();
    }

    // methods
    public async loadPermiss() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Permis', 'list');
        isPermistted ? this.permisService.findAll().subscribe(permiss => this.permiss = permiss, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


    public searchRequest() {
        this.permisService.findByCriteria(this.searchPermis).subscribe(permiss => {

            this.permiss = permiss;
            // this.searchPermis = new PermisVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'reference', header: 'Reference'},
            {field: 'dateDelivre', header: 'Date delivre'},
            {field: 'numberPermis', header: 'Number permis'},
            {field: 'nomDelivreur', header: 'Nom delivreur'},
            {field: 'categoriePermis?.libele', header: 'Categorie permis'},
        ];
    }

    public async editPermis(permis: PermisVo) {
        const isPermistted = await this.roleService.isPermitted('Permis', 'edit');
        if (isPermistted) {
            this.permisService.findByIdWithAssociatedList(permis).subscribe(res => {
                this.selectedPermis = res;
                this.selectedPermis.dateDelivre = new Date(permis.dateDelivre);
                this.editPermisDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewPermis(permis: PermisVo) {
        const isPermistted = await this.roleService.isPermitted('Permis', 'view');
        if (isPermistted) {
            this.permisService.findByIdWithAssociatedList(permis).subscribe(res => {
                this.selectedPermis = res;
                this.selectedPermis.dateDelivre = new Date(permis.dateDelivre);
                this.viewPermisDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreatePermis(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedPermis = new PermisVo();
            this.createPermisDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }


    public async deletePermis(permis: PermisVo) {
        const isPermistted = await this.roleService.isPermitted('Permis', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Permis) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.permisService.delete(permis).subscribe(status => {
                        if (status > 0) {
                            const position = this.permiss.indexOf(permis);
                            position > -1 ? this.permiss.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Permis Supprimé',
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

    public async loadCategoriePermis() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Permis', 'list');
        isPermistted ? this.categoriePermisService.findAll().subscribe(categoriePermiss => this.categoriePermiss = categoriePermiss, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async duplicatePermis(permis: PermisVo) {

        this.permisService.findByIdWithAssociatedList(permis).subscribe(
            res => {
                this.initDuplicatePermis(res);
                this.selectedPermis = res;
                this.selectedPermis.id = null;
                this.createPermisDialog = true;

            });

    }

    initDuplicatePermis(res: PermisVo) {


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
        this.exportData = this.permiss.map(e => {
            return {
                'Reference': e.reference,
                'Date delivre': this.datePipe.transform(e.dateDelivre, 'dd-MM-yyyy'),
                'Number permis': e.numberPermis,
                'Nom delivreur': e.nomDelivreur,
                'Categorie permis': e.categoriePermisVo?.libele,
            };
        });

        this.criteriaData = [{
            'Reference': this.searchPermis.reference ? this.searchPermis.reference : environment.emptyForExport,
            'Date delivre Min': this.searchPermis.dateDelivreMin ? this.datePipe.transform(this.searchPermis.dateDelivreMin, this.dateFormat) : environment.emptyForExport,
            'Date delivre Max': this.searchPermis.dateDelivreMax ? this.datePipe.transform(this.searchPermis.dateDelivreMax, this.dateFormat) : environment.emptyForExport,
            'Number permis Min': this.searchPermis.numberPermisMin ? this.searchPermis.numberPermisMin : environment.emptyForExport,
            'Number permis Max': this.searchPermis.numberPermisMax ? this.searchPermis.numberPermisMax : environment.emptyForExport,
            'Nom delivreur': this.searchPermis.nomDelivreur ? this.searchPermis.nomDelivreur : environment.emptyForExport,
            'Categorie permis': this.searchPermis.categoriePermisVo?.libele ? this.searchPermis.categoriePermisVo?.libele : environment.emptyForExport,
        }];

    }

    // getters and setters

    get permiss(): Array<PermisVo> {
        return this.permisService.permiss;
    }

    set permiss(value: Array<PermisVo>) {
        this.permisService.permiss = value;
    }

    get permisSelections(): Array<PermisVo> {
        return this.permisService.permisSelections;
    }

    set permisSelections(value: Array<PermisVo>) {
        this.permisService.permisSelections = value;
    }


    get selectedPermis(): PermisVo {
        return this.permisService.selectedPermis;
    }

    set selectedPermis(value: PermisVo) {
        this.permisService.selectedPermis = value;
    }

    get createPermisDialog(): boolean {
        return this.permisService.createPermisDialog;
    }

    set createPermisDialog(value: boolean) {
        this.permisService.createPermisDialog = value;
    }

    get editPermisDialog(): boolean {
        return this.permisService.editPermisDialog;
    }

    set editPermisDialog(value: boolean) {
        this.permisService.editPermisDialog = value;
    }

    get viewPermisDialog(): boolean {
        return this.permisService.viewPermisDialog;
    }

    set viewPermisDialog(value: boolean) {
        this.permisService.viewPermisDialog = value;
    }

    get searchPermis(): PermisVo {
        return this.permisService.searchPermis;
    }

    set searchPermis(value: PermisVo) {
        this.permisService.searchPermis = value;
    }


    get dateFormat() {
        return environment.dateFormatList;
    }


}
