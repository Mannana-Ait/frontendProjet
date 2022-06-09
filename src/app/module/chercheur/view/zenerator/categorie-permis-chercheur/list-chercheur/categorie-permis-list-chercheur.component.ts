import {Component, OnInit} from '@angular/core';
import {CategoriePermisService} from 'src/app/controller/service/CategoriePermis.service';
import {CategoriePermisVo} from 'src/app/controller/model/CategoriePermis.model';
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
    selector: 'app-categorie-permis-list-chercheur',
    templateUrl: './categorie-permis-list-chercheur.component.html',
    styleUrls: ['./categorie-permis-list-chercheur.component.css']
})
export class CategoriePermisListChercheurComponent implements OnInit {
    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'CategoriePermis';


    constructor(private datePipe: DatePipe, private categoriePermisService: CategoriePermisService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService, private exportService: ExportService
    ) {
    }

    ngOnInit(): void {
        this.loadCategoriePermiss();
        this.initExport();
        this.initCol();
    }

    // methods
    public async loadCategoriePermiss() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('CategoriePermis', 'list');
        isPermistted ? this.categoriePermisService.findAll().subscribe(categoriePermiss => this.categoriePermiss = categoriePermiss, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


    public searchRequest() {
        this.categoriePermisService.findByCriteria(this.searchCategoriePermis).subscribe(categoriePermiss => {

            this.categoriePermiss = categoriePermiss;
            // this.searchCategoriePermis = new CategoriePermisVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'reference', header: 'Reference'},
            {field: 'libele', header: 'Libele'},
        ];
    }

    public async editCategoriePermis(categoriePermis: CategoriePermisVo) {
        const isPermistted = await this.roleService.isPermitted('CategoriePermis', 'edit');
        if (isPermistted) {
            this.categoriePermisService.findByIdWithAssociatedList(categoriePermis).subscribe(res => {
                this.selectedCategoriePermis = res;
                this.editCategoriePermisDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewCategoriePermis(categoriePermis: CategoriePermisVo) {
        const isPermistted = await this.roleService.isPermitted('CategoriePermis', 'view');
        if (isPermistted) {
            this.categoriePermisService.findByIdWithAssociatedList(categoriePermis).subscribe(res => {
                this.selectedCategoriePermis = res;
                this.viewCategoriePermisDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateCategoriePermis(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedCategoriePermis = new CategoriePermisVo();
            this.createCategoriePermisDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }


    public async deleteCategoriePermis(categoriePermis: CategoriePermisVo) {
        const isPermistted = await this.roleService.isPermitted('CategoriePermis', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Categorie permis) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.categoriePermisService.delete(categoriePermis).subscribe(status => {
                        if (status > 0) {
                            const position = this.categoriePermiss.indexOf(categoriePermis);
                            position > -1 ? this.categoriePermiss.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Categorie permis Supprimé',
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


    public async duplicateCategoriePermis(categoriePermis: CategoriePermisVo) {

        this.categoriePermisService.findByIdWithAssociatedList(categoriePermis).subscribe(
            res => {
                this.initDuplicateCategoriePermis(res);
                this.selectedCategoriePermis = res;
                this.selectedCategoriePermis.id = null;
                this.createCategoriePermisDialog = true;

            });

    }

    initDuplicateCategoriePermis(res: CategoriePermisVo) {


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
        this.exportData = this.categoriePermiss.map(e => {
            return {
                'Reference': e.reference,
                'Libele': e.libele,
                'Description': e.description,
            };
        });

        this.criteriaData = [{
            'Reference': this.searchCategoriePermis.reference ? this.searchCategoriePermis.reference : environment.emptyForExport,
            'Libele': this.searchCategoriePermis.libele ? this.searchCategoriePermis.libele : environment.emptyForExport,
            'Description': this.searchCategoriePermis.description ? this.searchCategoriePermis.description : environment.emptyForExport,
        }];

    }

    // getters and setters

    get categoriePermiss(): Array<CategoriePermisVo> {
        return this.categoriePermisService.categoriePermiss;
    }

    set categoriePermiss(value: Array<CategoriePermisVo>) {
        this.categoriePermisService.categoriePermiss = value;
    }

    get categoriePermisSelections(): Array<CategoriePermisVo> {
        return this.categoriePermisService.categoriePermisSelections;
    }

    set categoriePermisSelections(value: Array<CategoriePermisVo>) {
        this.categoriePermisService.categoriePermisSelections = value;
    }


    get selectedCategoriePermis(): CategoriePermisVo {
        return this.categoriePermisService.selectedCategoriePermis;
    }

    set selectedCategoriePermis(value: CategoriePermisVo) {
        this.categoriePermisService.selectedCategoriePermis = value;
    }

    get createCategoriePermisDialog(): boolean {
        return this.categoriePermisService.createCategoriePermisDialog;
    }

    set createCategoriePermisDialog(value: boolean) {
        this.categoriePermisService.createCategoriePermisDialog = value;
    }

    get editCategoriePermisDialog(): boolean {
        return this.categoriePermisService.editCategoriePermisDialog;
    }

    set editCategoriePermisDialog(value: boolean) {
        this.categoriePermisService.editCategoriePermisDialog = value;
    }

    get viewCategoriePermisDialog(): boolean {
        return this.categoriePermisService.viewCategoriePermisDialog;
    }

    set viewCategoriePermisDialog(value: boolean) {
        this.categoriePermisService.viewCategoriePermisDialog = value;
    }

    get searchCategoriePermis(): CategoriePermisVo {
        return this.categoriePermisService.searchCategoriePermis;
    }

    set searchCategoriePermis(value: CategoriePermisVo) {
        this.categoriePermisService.searchCategoriePermis = value;
    }


    get dateFormat() {
        return environment.dateFormatList;
    }


}
