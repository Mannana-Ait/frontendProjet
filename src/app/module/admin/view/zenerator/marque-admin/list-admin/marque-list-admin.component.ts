import {Component, OnInit} from '@angular/core';
import {MarqueService} from 'src/app/controller/service/Marque.service';
import {MarqueVo} from 'src/app/controller/model/Marque.model';
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
    selector: 'app-marque-list-admin',
    templateUrl: './marque-list-admin.component.html',
    styleUrls: ['./marque-list-admin.component.css']
})
export class MarqueListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Marque';


    constructor(private datePipe: DatePipe, private marqueService: MarqueService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService, private exportService: ExportService
    ) {
    }

    ngOnInit(): void {
        this.loadMarques();
        this.initExport();
        this.initCol();
    }

    // methods
    public async loadMarques() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Marque', 'list');
        isPermistted ? this.marqueService.findAll().subscribe(marques => this.marques = marques, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


    public searchRequest() {
        this.marqueService.findByCriteria(this.searchMarque).subscribe(marques => {

            this.marques = marques;
            // this.searchMarque = new MarqueVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'libelle', header: 'Libelle'},
            {field: 'reference', header: 'Reference'},
        ];
    }

    public async editMarque(marque: MarqueVo) {
        const isPermistted = await this.roleService.isPermitted('Marque', 'edit');
        if (isPermistted) {
            this.marqueService.findByIdWithAssociatedList(marque).subscribe(res => {
                this.selectedMarque = res;
                this.editMarqueDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewMarque(marque: MarqueVo) {
        const isPermistted = await this.roleService.isPermitted('Marque', 'view');
        if (isPermistted) {
            this.marqueService.findByIdWithAssociatedList(marque).subscribe(res => {
                this.selectedMarque = res;
                this.viewMarqueDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateMarque(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedMarque = new MarqueVo();
            this.createMarqueDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }


    public async deleteMarque(marque: MarqueVo) {
        const isPermistted = await this.roleService.isPermitted('Marque', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Marque) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.marqueService.delete(marque).subscribe(status => {
                        if (status > 0) {
                            const position = this.marques.indexOf(marque);
                            position > -1 ? this.marques.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Marque Supprimé',
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


    public async duplicateMarque(marque: MarqueVo) {

        this.marqueService.findByIdWithAssociatedList(marque).subscribe(
            res => {
                this.initDuplicateMarque(res);
                this.selectedMarque = res;
                this.selectedMarque.id = null;
                this.createMarqueDialog = true;

            });

    }

    initDuplicateMarque(res: MarqueVo) {


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
        this.exportData = this.marques.map(e => {
            return {
                'Libelle': e.libelle,
                'Reference': e.reference,
            };
        });

        this.criteriaData = [{
            'Libelle': this.searchMarque.libelle ? this.searchMarque.libelle : environment.emptyForExport,
            'Reference': this.searchMarque.reference ? this.searchMarque.reference : environment.emptyForExport,
        }];

    }

    // getters and setters

    get marques(): Array<MarqueVo> {
        return this.marqueService.marques;
    }

    set marques(value: Array<MarqueVo>) {
        this.marqueService.marques = value;
    }

    get marqueSelections(): Array<MarqueVo> {
        return this.marqueService.marqueSelections;
    }

    set marqueSelections(value: Array<MarqueVo>) {
        this.marqueService.marqueSelections = value;
    }


    get selectedMarque(): MarqueVo {
        return this.marqueService.selectedMarque;
    }

    set selectedMarque(value: MarqueVo) {
        this.marqueService.selectedMarque = value;
    }

    get createMarqueDialog(): boolean {
        return this.marqueService.createMarqueDialog;
    }

    set createMarqueDialog(value: boolean) {
        this.marqueService.createMarqueDialog = value;
    }

    get editMarqueDialog(): boolean {
        return this.marqueService.editMarqueDialog;
    }

    set editMarqueDialog(value: boolean) {
        this.marqueService.editMarqueDialog = value;
    }

    get viewMarqueDialog(): boolean {
        return this.marqueService.viewMarqueDialog;
    }

    set viewMarqueDialog(value: boolean) {
        this.marqueService.viewMarqueDialog = value;
    }

    get searchMarque(): MarqueVo {
        return this.marqueService.searchMarque;
    }

    set searchMarque(value: MarqueVo) {
        this.marqueService.searchMarque = value;
    }


    get dateFormat() {
        return environment.dateFormatList;
    }


}
