import {Component, OnInit} from '@angular/core';
import {TypeVehiculeService} from 'src/app/controller/service/TypeVehicule.service';
import {TypeVehiculeVo} from 'src/app/controller/model/TypeVehicule.model';
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
    selector: 'app-type-vehicule-list-chercheur',
    templateUrl: './type-vehicule-list-chercheur.component.html',
    styleUrls: ['./type-vehicule-list-chercheur.component.css']
})
export class TypeVehiculeListChercheurComponent implements OnInit {
    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'TypeVehicule';


    constructor(private datePipe: DatePipe, private typeVehiculeService: TypeVehiculeService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService, private exportService: ExportService
    ) {
    }

    ngOnInit(): void {
        this.loadTypeVehicules();
        this.initExport();
        this.initCol();
    }

    // methods
    public async loadTypeVehicules() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('TypeVehicule', 'list');
        isPermistted ? this.typeVehiculeService.findAll().subscribe(typeVehicules => this.typeVehicules = typeVehicules, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


    public searchRequest() {
        this.typeVehiculeService.findByCriteria(this.searchTypeVehicule).subscribe(typeVehicules => {

            this.typeVehicules = typeVehicules;
            // this.searchTypeVehicule = new TypeVehiculeVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'reference', header: 'Reference'},
            {field: 'libele', header: 'Libele'},
        ];
    }

    public async editTypeVehicule(typeVehicule: TypeVehiculeVo) {
        const isPermistted = await this.roleService.isPermitted('TypeVehicule', 'edit');
        if (isPermistted) {
            this.typeVehiculeService.findByIdWithAssociatedList(typeVehicule).subscribe(res => {
                this.selectedTypeVehicule = res;
                this.editTypeVehiculeDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewTypeVehicule(typeVehicule: TypeVehiculeVo) {
        const isPermistted = await this.roleService.isPermitted('TypeVehicule', 'view');
        if (isPermistted) {
            this.typeVehiculeService.findByIdWithAssociatedList(typeVehicule).subscribe(res => {
                this.selectedTypeVehicule = res;
                this.viewTypeVehiculeDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateTypeVehicule(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedTypeVehicule = new TypeVehiculeVo();
            this.createTypeVehiculeDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }


    public async deleteTypeVehicule(typeVehicule: TypeVehiculeVo) {
        const isPermistted = await this.roleService.isPermitted('TypeVehicule', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Type vehicule) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.typeVehiculeService.delete(typeVehicule).subscribe(status => {
                        if (status > 0) {
                            const position = this.typeVehicules.indexOf(typeVehicule);
                            position > -1 ? this.typeVehicules.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Type vehicule Supprimé',
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


    public async duplicateTypeVehicule(typeVehicule: TypeVehiculeVo) {

        this.typeVehiculeService.findByIdWithAssociatedList(typeVehicule).subscribe(
            res => {
                this.initDuplicateTypeVehicule(res);
                this.selectedTypeVehicule = res;
                this.selectedTypeVehicule.id = null;
                this.createTypeVehiculeDialog = true;

            });

    }

    initDuplicateTypeVehicule(res: TypeVehiculeVo) {


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
        this.exportData = this.typeVehicules.map(e => {
            return {
                'Reference': e.reference,
                'Libele': e.libele,
            };
        });

        this.criteriaData = [{
            'Reference': this.searchTypeVehicule.reference ? this.searchTypeVehicule.reference : environment.emptyForExport,
            'Libele': this.searchTypeVehicule.libele ? this.searchTypeVehicule.libele : environment.emptyForExport,
        }];

    }

    // getters and setters

    get typeVehicules(): Array<TypeVehiculeVo> {
        return this.typeVehiculeService.typeVehicules;
    }

    set typeVehicules(value: Array<TypeVehiculeVo>) {
        this.typeVehiculeService.typeVehicules = value;
    }

    get typeVehiculeSelections(): Array<TypeVehiculeVo> {
        return this.typeVehiculeService.typeVehiculeSelections;
    }

    set typeVehiculeSelections(value: Array<TypeVehiculeVo>) {
        this.typeVehiculeService.typeVehiculeSelections = value;
    }


    get selectedTypeVehicule(): TypeVehiculeVo {
        return this.typeVehiculeService.selectedTypeVehicule;
    }

    set selectedTypeVehicule(value: TypeVehiculeVo) {
        this.typeVehiculeService.selectedTypeVehicule = value;
    }

    get createTypeVehiculeDialog(): boolean {
        return this.typeVehiculeService.createTypeVehiculeDialog;
    }

    set createTypeVehiculeDialog(value: boolean) {
        this.typeVehiculeService.createTypeVehiculeDialog = value;
    }

    get editTypeVehiculeDialog(): boolean {
        return this.typeVehiculeService.editTypeVehiculeDialog;
    }

    set editTypeVehiculeDialog(value: boolean) {
        this.typeVehiculeService.editTypeVehiculeDialog = value;
    }

    get viewTypeVehiculeDialog(): boolean {
        return this.typeVehiculeService.viewTypeVehiculeDialog;
    }

    set viewTypeVehiculeDialog(value: boolean) {
        this.typeVehiculeService.viewTypeVehiculeDialog = value;
    }

    get searchTypeVehicule(): TypeVehiculeVo {
        return this.typeVehiculeService.searchTypeVehicule;
    }

    set searchTypeVehicule(value: TypeVehiculeVo) {
        this.typeVehiculeService.searchTypeVehicule = value;
    }


    get dateFormat() {
        return environment.dateFormatList;
    }


}
