import {Component, OnInit} from '@angular/core';
import {TypeAvisService} from 'src/app/controller/service/TypeAvis.service';
import {TypeAvisVo} from 'src/app/controller/model/TypeAvis.model';
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
    selector: 'app-type-avis-list-chercheur',
    templateUrl: './type-avis-list-chercheur.component.html',
    styleUrls: ['./type-avis-list-chercheur.component.css']
})
export class TypeAvisListChercheurComponent implements OnInit {
    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TypeAvis';


    constructor(private datePipe: DatePipe, private typeAvisService: TypeAvisService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService, private exportService: ExportService
    ) {
    }

    ngOnInit(): void {
        this.loadTypeAviss();
        this.initExport();
        this.initCol();
    }

    // methods
    public async loadTypeAviss() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TypeAvis', 'list');
        isPermistted ? this.typeAvisService.findAll().subscribe(typeAviss => this.typeAviss = typeAviss, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


    public searchRequest() {
        this.typeAvisService.findByCriteria(this.searchTypeAvis).subscribe(typeAviss => {

            this.typeAviss = typeAviss;
            // this.searchTypeAvis = new TypeAvisVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'libelle', header: 'Libelle'},
            {field: 'reference', header: 'Reference'},
        ];
    }

    public async editTypeAvis(typeAvis: TypeAvisVo) {
        const isPermistted = await this.roleService.isPermitted('TypeAvis', 'edit');
        if (isPermistted) {
            this.typeAvisService.findByIdWithAssociatedList(typeAvis).subscribe(res => {
                this.selectedTypeAvis = res;
                this.editTypeAvisDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewTypeAvis(typeAvis: TypeAvisVo) {
        const isPermistted = await this.roleService.isPermitted('TypeAvis', 'view');
        if (isPermistted) {
            this.typeAvisService.findByIdWithAssociatedList(typeAvis).subscribe(res => {
                this.selectedTypeAvis = res;
                this.viewTypeAvisDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateTypeAvis(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedTypeAvis = new TypeAvisVo();
            this.createTypeAvisDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }


    public async deleteTypeAvis(typeAvis: TypeAvisVo) {
        const isPermistted = await this.roleService.isPermitted('TypeAvis', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Type avis) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.typeAvisService.delete(typeAvis).subscribe(status => {
                        if (status > 0) {
                            const position = this.typeAviss.indexOf(typeAvis);
                            position > -1 ? this.typeAviss.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Type avis Supprimé',
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


    public async duplicateTypeAvis(typeAvis: TypeAvisVo) {

        this.typeAvisService.findByIdWithAssociatedList(typeAvis).subscribe(
            res => {
                this.initDuplicateTypeAvis(res);
                this.selectedTypeAvis = res;
                this.selectedTypeAvis.id = null;
                this.createTypeAvisDialog = true;

            });

    }

    initDuplicateTypeAvis(res: TypeAvisVo) {


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
        this.exportData = this.typeAviss.map(e => {
            return {
                'Libelle': e.libelle,
                'Reference': e.reference,
            };
        });

        this.criteriaData = [{
            'Libelle': this.searchTypeAvis.libelle ? this.searchTypeAvis.libelle : environment.emptyForExport,
            'Reference': this.searchTypeAvis.reference ? this.searchTypeAvis.reference : environment.emptyForExport,
        }];

    }

    // getters and setters

    get typeAviss(): Array<TypeAvisVo> {
        return this.typeAvisService.typeAviss;
    }

    set typeAviss(value: Array<TypeAvisVo>) {
        this.typeAvisService.typeAviss = value;
    }

    get typeAvisSelections(): Array<TypeAvisVo> {
        return this.typeAvisService.typeAvisSelections;
    }

    set typeAvisSelections(value: Array<TypeAvisVo>) {
        this.typeAvisService.typeAvisSelections = value;
    }


    get selectedTypeAvis(): TypeAvisVo {
        return this.typeAvisService.selectedTypeAvis;
    }

    set selectedTypeAvis(value: TypeAvisVo) {
        this.typeAvisService.selectedTypeAvis = value;
    }

    get createTypeAvisDialog(): boolean {
        return this.typeAvisService.createTypeAvisDialog;
    }

    set createTypeAvisDialog(value: boolean) {
        this.typeAvisService.createTypeAvisDialog = value;
    }

    get editTypeAvisDialog(): boolean {
        return this.typeAvisService.editTypeAvisDialog;
    }

    set editTypeAvisDialog(value: boolean) {
        this.typeAvisService.editTypeAvisDialog = value;
    }

    get viewTypeAvisDialog(): boolean {
        return this.typeAvisService.viewTypeAvisDialog;
    }

    set viewTypeAvisDialog(value: boolean) {
        this.typeAvisService.viewTypeAvisDialog = value;
    }

    get searchTypeAvis(): TypeAvisVo {
        return this.typeAvisService.searchTypeAvis;
    }

    set searchTypeAvis(value: TypeAvisVo) {
        this.typeAvisService.searchTypeAvis = value;
    }


    get dateFormat() {
        return environment.dateFormatList;
    }


}
