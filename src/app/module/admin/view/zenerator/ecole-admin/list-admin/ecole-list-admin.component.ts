import {Component, OnInit} from '@angular/core';
import {EcoleService} from 'src/app/controller/service/Ecole.service';
import {EcoleVo} from 'src/app/controller/model/Ecole.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, {RowInput} from 'jspdf-autotable';
import {saveAs} from 'file-saver';
import {RoleService} from 'src/app/controller/service/role.service';
import {DatePipe} from '@angular/common';


import {VilleService} from 'src/app/controller/service/Ville.service';
import {GerantService} from 'src/app/controller/service/Gerant.service';

import {VehiculeVo} from 'src/app/controller/model/Vehicule.model';
import {PlanningItemVo} from 'src/app/controller/model/PlanningItem.model';
import {MoniteurPratiqueVo} from 'src/app/controller/model/MoniteurPratique.model';
import {MoniteurTheoriqueVo} from 'src/app/controller/model/MoniteurTheorique.model';
import {VilleVo} from 'src/app/controller/model/Ville.model';
import {GerantVo} from 'src/app/controller/model/Gerant.model';
import {MessageService, ConfirmationService, MenuItem} from 'primeng/api';
import {AuthService} from 'src/app/controller/service/Auth.service';
import {ExportService} from 'src/app/controller/service/Export.service';

@Component({
    selector: 'app-ecole-list-admin',
    templateUrl: './ecole-list-admin.component.html',
    styleUrls: ['./ecole-list-admin.component.css']
})
export class EcoleListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Ecole';
    villes: Array<VilleVo>;
    gerants: Array<GerantVo>;


    constructor(private datePipe: DatePipe, private ecoleService: EcoleService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService, private exportService: ExportService
        , private villeService: VilleService
        , private gerantService: GerantService
    ) {
    }

    ngOnInit(): void {
        this.loadEcoles();
        this.initExport();
        this.initCol();
        this.loadVille();
        this.loadGerant();
    }

    // methods
    public async loadEcoles() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Ecole', 'list');
        isPermistted ? this.ecoleService.findAll().subscribe(ecoles => this.ecoles = ecoles, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


    public searchRequest() {
        this.ecoleService.findByCriteria(this.searchEcole).subscribe(ecoles => {

            this.ecoles = ecoles;
            // this.searchEcole = new EcoleVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'reference', header: 'Reference'},
            {field: 'ville?.libelle', header: 'Ville'},
            {field: 'altitude', header: 'Altitude'},
            {field: 'angitude', header: 'Angitude'},
            {field: 'nom', header: 'Nom'},
            {field: 'numAutorisation', header: 'Num autorisation'},
            {field: 'numFix', header: 'Num fix'},
            {field: 'numPhone', header: 'Num phone'},
            {field: 'email', header: 'Email'},
            {field: 'tauxReussite', header: 'Taux reussite'},
            {field: 'dateCreation', header: 'Date creation'},
            {field: 'dateAbonnement', header: 'Date abonnement'},
            {field: 'gerant?.reference', header: 'Gerant'},
        ];
    }

    public async editEcole(ecole: EcoleVo) {
        const isPermistted = await this.roleService.isPermitted('Ecole', 'edit');
        if (isPermistted) {
            this.ecoleService.findByIdWithAssociatedList(ecole).subscribe(res => {
                this.selectedEcole = res;
                this.selectedEcole.dateCreation = new Date(ecole.dateCreation);
                this.selectedEcole.dateAbonnement = new Date(ecole.dateAbonnement);
                this.editEcoleDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewEcole(ecole: EcoleVo) {
        const isPermistted = await this.roleService.isPermitted('Ecole', 'view');
        if (isPermistted) {
            this.ecoleService.findByIdWithAssociatedList(ecole).subscribe(res => {
                this.selectedEcole = res;
                this.selectedEcole.dateCreation = new Date(ecole.dateCreation);
                this.selectedEcole.dateAbonnement = new Date(ecole.dateAbonnement);
                this.viewEcoleDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateEcole(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedEcole = new EcoleVo();
            this.createEcoleDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }


    public async deleteEcole(ecole: EcoleVo) {
        const isPermistted = await this.roleService.isPermitted('Ecole', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Ecole) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.ecoleService.delete(ecole).subscribe(status => {
                        if (status > 0) {
                            const position = this.ecoles.indexOf(ecole);
                            position > -1 ? this.ecoles.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Ecole Supprimé',
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

    public async loadVille() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Ecole', 'list');
        isPermistted ? this.villeService.findAll().subscribe(villes => this.villes = villes, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadGerant() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Ecole', 'list');
        isPermistted ? this.gerantService.findAll().subscribe(gerants => this.gerants = gerants, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async duplicateEcole(ecole: EcoleVo) {

        this.ecoleService.findByIdWithAssociatedList(ecole).subscribe(
            res => {
                this.initDuplicateEcole(res);
                this.selectedEcole = res;
                this.selectedEcole.id = null;
                this.createEcoleDialog = true;

            });

    }

    initDuplicateEcole(res: EcoleVo) {
        if (res.vehiculesVo != null) {
            res.vehiculesVo.forEach(d => {
                d.ecoleVo = null;
                d.id = null;
            });
        }
        if (res.moniteurTheoriquesVo != null) {
            res.moniteurTheoriquesVo.forEach(d => {
                d.ecoleVo = null;
                d.id = null;
            });
        }
        if (res.moniteurPratiquesVo != null) {
            res.moniteurPratiquesVo.forEach(d => {
                d.ecoleVo = null;
                d.id = null;
            });
        }
        if (res.planningItemsVo != null) {
            res.planningItemsVo.forEach(d => {
                d.ecoleVo = null;
                d.id = null;
            });
        }


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
        this.exportData = this.ecoles.map(e => {
            return {
                'Reference': e.reference,
                'Ville': e.villeVo?.libelle,
                'Altitude': e.altitude,
                'Angitude': e.angitude,
                'Nom': e.nom,
                'Address': e.address,
                'Num autorisation': e.numAutorisation,
                'Num fix': e.numFix,
                'Num phone': e.numPhone,
                'Email': e.email,
                'Taux reussite': e.tauxReussite,
                'Date creation': this.datePipe.transform(e.dateCreation, 'dd-MM-yyyy'),
                'Date abonnement': this.datePipe.transform(e.dateAbonnement, 'dd-MM-yyyy'),
                'Gerant': e.gerantVo?.reference,
            };
        });

        this.criteriaData = [{
            'Reference': this.searchEcole.reference ? this.searchEcole.reference : environment.emptyForExport,
            'Ville': this.searchEcole.villeVo?.libelle ? this.searchEcole.villeVo?.libelle : environment.emptyForExport,
            'Altitude Min': this.searchEcole.altitudeMin ? this.searchEcole.altitudeMin : environment.emptyForExport,
            'Altitude Max': this.searchEcole.altitudeMax ? this.searchEcole.altitudeMax : environment.emptyForExport,
            'Angitude Min': this.searchEcole.angitudeMin ? this.searchEcole.angitudeMin : environment.emptyForExport,
            'Angitude Max': this.searchEcole.angitudeMax ? this.searchEcole.angitudeMax : environment.emptyForExport,
            'Nom': this.searchEcole.nom ? this.searchEcole.nom : environment.emptyForExport,
            'Address': this.searchEcole.address ? this.searchEcole.address : environment.emptyForExport,
            'Num autorisation': this.searchEcole.numAutorisation ? this.searchEcole.numAutorisation : environment.emptyForExport,
            'Num fix': this.searchEcole.numFix ? this.searchEcole.numFix : environment.emptyForExport,
            'Num phone': this.searchEcole.numPhone ? this.searchEcole.numPhone : environment.emptyForExport,
            'Email': this.searchEcole.email ? this.searchEcole.email : environment.emptyForExport,
            'Taux reussite Min': this.searchEcole.tauxReussiteMin ? this.searchEcole.tauxReussiteMin : environment.emptyForExport,
            'Taux reussite Max': this.searchEcole.tauxReussiteMax ? this.searchEcole.tauxReussiteMax : environment.emptyForExport,
            'Date creation Min': this.searchEcole.dateCreationMin ? this.datePipe.transform(this.searchEcole.dateCreationMin, this.dateFormat) : environment.emptyForExport,
            'Date creation Max': this.searchEcole.dateCreationMax ? this.datePipe.transform(this.searchEcole.dateCreationMax, this.dateFormat) : environment.emptyForExport,
            'Date abonnement Min': this.searchEcole.dateAbonnementMin ? this.datePipe.transform(this.searchEcole.dateAbonnementMin, this.dateFormat) : environment.emptyForExport,
            'Date abonnement Max': this.searchEcole.dateAbonnementMax ? this.datePipe.transform(this.searchEcole.dateAbonnementMax, this.dateFormat) : environment.emptyForExport,
            'Gerant': this.searchEcole.gerantVo?.reference ? this.searchEcole.gerantVo?.reference : environment.emptyForExport,
        }];

    }

    // getters and setters

    get ecoles(): Array<EcoleVo> {
        return this.ecoleService.ecoles;
    }

    set ecoles(value: Array<EcoleVo>) {
        this.ecoleService.ecoles = value;
    }

    get ecoleSelections(): Array<EcoleVo> {
        return this.ecoleService.ecoleSelections;
    }

    set ecoleSelections(value: Array<EcoleVo>) {
        this.ecoleService.ecoleSelections = value;
    }


    get selectedEcole(): EcoleVo {
        return this.ecoleService.selectedEcole;
    }

    set selectedEcole(value: EcoleVo) {
        this.ecoleService.selectedEcole = value;
    }

    get createEcoleDialog(): boolean {
        return this.ecoleService.createEcoleDialog;
    }

    set createEcoleDialog(value: boolean) {
        this.ecoleService.createEcoleDialog = value;
    }

    get editEcoleDialog(): boolean {
        return this.ecoleService.editEcoleDialog;
    }

    set editEcoleDialog(value: boolean) {
        this.ecoleService.editEcoleDialog = value;
    }

    get viewEcoleDialog(): boolean {
        return this.ecoleService.viewEcoleDialog;
    }

    set viewEcoleDialog(value: boolean) {
        this.ecoleService.viewEcoleDialog = value;
    }

    get searchEcole(): EcoleVo {
        return this.ecoleService.searchEcole;
    }

    set searchEcole(value: EcoleVo) {
        this.ecoleService.searchEcole = value;
    }


    get dateFormat() {
        return environment.dateFormatList;
    }


}
