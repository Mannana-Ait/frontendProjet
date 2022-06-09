import {Component, OnInit} from '@angular/core';
import {PlanningItemService} from 'src/app/controller/service/PlanningItem.service';
import {PlanningItemVo} from 'src/app/controller/model/PlanningItem.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, {RowInput} from 'jspdf-autotable';
import {saveAs} from 'file-saver';
import {RoleService} from 'src/app/controller/service/role.service';
import {DatePipe} from '@angular/common';


import {JourService} from 'src/app/controller/service/Jour.service';

import {JourVo} from 'src/app/controller/model/Jour.model';
import {MessageService, ConfirmationService, MenuItem} from 'primeng/api';
import {AuthService} from 'src/app/controller/service/Auth.service';
import {ExportService} from 'src/app/controller/service/Export.service';

@Component({
    selector: 'app-planning-item-list-chercheur',
    templateUrl: './planning-item-list-chercheur.component.html',
    styleUrls: ['./planning-item-list-chercheur.component.css']
})
export class PlanningItemListChercheurComponent implements OnInit {
    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'PlanningItem';
    jours: Array<JourVo>;


    constructor(private datePipe: DatePipe, private planningItemService: PlanningItemService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService, private exportService: ExportService
        , private jourService: JourService
    ) {
    }

    ngOnInit(): void {
        this.loadPlanningItems();
        this.initExport();
        this.initCol();
        this.loadJour();
    }

    // methods
    public async loadPlanningItems() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('PlanningItem', 'list');
        isPermistted ? this.planningItemService.findAll().subscribe(planningItems => this.planningItems = planningItems, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


    public searchRequest() {
        this.planningItemService.findByCriteria(this.searchPlanningItem).subscribe(planningItems => {

            this.planningItems = planningItems;
            // this.searchPlanningItem = new PlanningItemVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'jour?.libelle', header: 'Jour'},
            {field: 'dateOuverture', header: 'Date ouverture'},
            {field: 'dateFermeture', header: 'Date fermeture'},
        ];
    }

    public async editPlanningItem(planningItem: PlanningItemVo) {
        const isPermistted = await this.roleService.isPermitted('PlanningItem', 'edit');
        if (isPermistted) {
            this.planningItemService.findByIdWithAssociatedList(planningItem).subscribe(res => {
                this.selectedPlanningItem = res;
                this.selectedPlanningItem.dateOuverture = new Date(planningItem.dateOuverture);
                this.selectedPlanningItem.dateFermeture = new Date(planningItem.dateFermeture);
                this.editPlanningItemDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewPlanningItem(planningItem: PlanningItemVo) {
        const isPermistted = await this.roleService.isPermitted('PlanningItem', 'view');
        if (isPermistted) {
            this.planningItemService.findByIdWithAssociatedList(planningItem).subscribe(res => {
                this.selectedPlanningItem = res;
                this.selectedPlanningItem.dateOuverture = new Date(planningItem.dateOuverture);
                this.selectedPlanningItem.dateFermeture = new Date(planningItem.dateFermeture);
                this.viewPlanningItemDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreatePlanningItem(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedPlanningItem = new PlanningItemVo();
            this.createPlanningItemDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }


    public async deletePlanningItem(planningItem: PlanningItemVo) {
        const isPermistted = await this.roleService.isPermitted('PlanningItem', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Planning item) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.planningItemService.delete(planningItem).subscribe(status => {
                        if (status > 0) {
                            const position = this.planningItems.indexOf(planningItem);
                            position > -1 ? this.planningItems.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Planning item Supprimé',
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

    public async loadJour() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('PlanningItem', 'list');
        isPermistted ? this.jourService.findAll().subscribe(jours => this.jours = jours, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async duplicatePlanningItem(planningItem: PlanningItemVo) {

        this.planningItemService.findByIdWithAssociatedList(planningItem).subscribe(
            res => {
                this.initDuplicatePlanningItem(res);
                this.selectedPlanningItem = res;
                this.selectedPlanningItem.id = null;
                this.createPlanningItemDialog = true;

            });

    }

    initDuplicatePlanningItem(res: PlanningItemVo) {


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
        this.exportData = this.planningItems.map(e => {
            return {
                'Jour': e.jourVo?.libelle,
                'Date ouverture': this.datePipe.transform(e.dateOuverture, 'dd-MM-yyyy'),
                'Date fermeture': this.datePipe.transform(e.dateFermeture, 'dd-MM-yyyy'),
            };
        });

        this.criteriaData = [{
            'Jour': this.searchPlanningItem.jourVo?.libelle ? this.searchPlanningItem.jourVo?.libelle : environment.emptyForExport,
            'Date ouverture Min': this.searchPlanningItem.dateOuvertureMin ? this.datePipe.transform(this.searchPlanningItem.dateOuvertureMin, this.dateFormat) : environment.emptyForExport,
            'Date ouverture Max': this.searchPlanningItem.dateOuvertureMax ? this.datePipe.transform(this.searchPlanningItem.dateOuvertureMax, this.dateFormat) : environment.emptyForExport,
            'Date fermeture Min': this.searchPlanningItem.dateFermetureMin ? this.datePipe.transform(this.searchPlanningItem.dateFermetureMin, this.dateFormat) : environment.emptyForExport,
            'Date fermeture Max': this.searchPlanningItem.dateFermetureMax ? this.datePipe.transform(this.searchPlanningItem.dateFermetureMax, this.dateFormat) : environment.emptyForExport,
        }];

    }

    // getters and setters

    get planningItems(): Array<PlanningItemVo> {
        return this.planningItemService.planningItems;
    }

    set planningItems(value: Array<PlanningItemVo>) {
        this.planningItemService.planningItems = value;
    }

    get planningItemSelections(): Array<PlanningItemVo> {
        return this.planningItemService.planningItemSelections;
    }

    set planningItemSelections(value: Array<PlanningItemVo>) {
        this.planningItemService.planningItemSelections = value;
    }


    get selectedPlanningItem(): PlanningItemVo {
        return this.planningItemService.selectedPlanningItem;
    }

    set selectedPlanningItem(value: PlanningItemVo) {
        this.planningItemService.selectedPlanningItem = value;
    }

    get createPlanningItemDialog(): boolean {
        return this.planningItemService.createPlanningItemDialog;
    }

    set createPlanningItemDialog(value: boolean) {
        this.planningItemService.createPlanningItemDialog = value;
    }

    get editPlanningItemDialog(): boolean {
        return this.planningItemService.editPlanningItemDialog;
    }

    set editPlanningItemDialog(value: boolean) {
        this.planningItemService.editPlanningItemDialog = value;
    }

    get viewPlanningItemDialog(): boolean {
        return this.planningItemService.viewPlanningItemDialog;
    }

    set viewPlanningItemDialog(value: boolean) {
        this.planningItemService.viewPlanningItemDialog = value;
    }

    get searchPlanningItem(): PlanningItemVo {
        return this.planningItemService.searchPlanningItem;
    }

    set searchPlanningItem(value: PlanningItemVo) {
        this.planningItemService.searchPlanningItem = value;
    }


    get dateFormat() {
        return environment.dateFormatList;
    }


}
