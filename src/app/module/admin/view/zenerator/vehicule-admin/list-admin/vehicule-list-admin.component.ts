import {Component, OnInit} from '@angular/core';
import {VehiculeService} from 'src/app/controller/service/Vehicule.service';
import {VehiculeVo} from 'src/app/controller/model/Vehicule.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, {RowInput} from 'jspdf-autotable';
import {saveAs} from 'file-saver';
import {RoleService} from 'src/app/controller/service/role.service';
import {DatePipe} from '@angular/common';


import {MarqueService} from 'src/app/controller/service/Marque.service';
import {TypeVehiculeService} from 'src/app/controller/service/TypeVehicule.service';
import {EcoleService} from 'src/app/controller/service/Ecole.service';

import {EcoleVo} from 'src/app/controller/model/Ecole.model';
import {MarqueVo} from 'src/app/controller/model/Marque.model';
import {TypeVehiculeVo} from 'src/app/controller/model/TypeVehicule.model';
import {MessageService, ConfirmationService, MenuItem} from 'primeng/api';
import {AuthService} from 'src/app/controller/service/Auth.service';
import {ExportService} from 'src/app/controller/service/Export.service';

@Component({
    selector: 'app-vehicule-list-admin',
    templateUrl: './vehicule-list-admin.component.html',
    styleUrls: ['./vehicule-list-admin.component.css']
})
export class VehiculeListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Vehicule';
    marques: Array<MarqueVo>;
    typeVehicules: Array<TypeVehiculeVo>;
    ecoles: Array<EcoleVo>;


    constructor(private datePipe: DatePipe, private vehiculeService: VehiculeService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService, private exportService: ExportService
        , private marqueService: MarqueService
        , private typeVehiculeService: TypeVehiculeService
        , private ecoleService: EcoleService
    ) {
    }

    ngOnInit(): void {
        this.loadVehicules();
        this.initExport();
        this.initCol();
        this.loadMarque();
        this.loadTypeVehicule();
        this.loadEcole();
    }

    // methods
    public async loadVehicules() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Vehicule', 'list');
        isPermistted ? this.vehiculeService.findAll().subscribe(vehicules => this.vehicules = vehicules, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


    public searchRequest() {
        this.vehiculeService.findByCriteria(this.searchVehicule).subscribe(vehicules => {

            this.vehicules = vehicules;
            // this.searchVehicule = new VehiculeVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'matricule', header: 'Matricule'},
            {field: 'marque?.libelle', header: 'Marque'},
            {field: 'typeVehicule?.reference', header: 'Type vehicule'},
            {field: 'dateAchatVehicule', header: 'Date achat vehicule'},
            {field: 'imageUrl', header: 'Image url'},
            {field: 'ecole?.reference', header: 'Ecole'},
        ];
    }

    public async editVehicule(vehicule: VehiculeVo) {
        const isPermistted = await this.roleService.isPermitted('Vehicule', 'edit');
        if (isPermistted) {
            this.vehiculeService.findByIdWithAssociatedList(vehicule).subscribe(res => {
                this.selectedVehicule = res;
                this.selectedVehicule.dateAchatVehicule = new Date(vehicule.dateAchatVehicule);
                this.editVehiculeDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewVehicule(vehicule: VehiculeVo) {
        const isPermistted = await this.roleService.isPermitted('Vehicule', 'view');
        if (isPermistted) {
            this.vehiculeService.findByIdWithAssociatedList(vehicule).subscribe(res => {
                this.selectedVehicule = res;
                this.selectedVehicule.dateAchatVehicule = new Date(vehicule.dateAchatVehicule);
                this.viewVehiculeDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateVehicule(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedVehicule = new VehiculeVo();
            this.createVehiculeDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }


    public async deleteVehicule(vehicule: VehiculeVo) {
        const isPermistted = await this.roleService.isPermitted('Vehicule', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Vehicule) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.vehiculeService.delete(vehicule).subscribe(status => {
                        if (status > 0) {
                            const position = this.vehicules.indexOf(vehicule);
                            position > -1 ? this.vehicules.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Vehicule Supprimé',
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

    public async loadMarque() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Vehicule', 'list');
        isPermistted ? this.marqueService.findAll().subscribe(marques => this.marques = marques, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadTypeVehicule() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Vehicule', 'list');
        isPermistted ? this.typeVehiculeService.findAll().subscribe(typeVehicules => this.typeVehicules = typeVehicules, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async loadEcole() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Vehicule', 'list');
        isPermistted ? this.ecoleService.findAll().subscribe(ecoles => this.ecoles = ecoles, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async duplicateVehicule(vehicule: VehiculeVo) {

        this.vehiculeService.findByIdWithAssociatedList(vehicule).subscribe(
            res => {
                this.initDuplicateVehicule(res);
                this.selectedVehicule = res;
                this.selectedVehicule.id = null;
                this.createVehiculeDialog = true;

            });

    }

    initDuplicateVehicule(res: VehiculeVo) {


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
        this.exportData = this.vehicules.map(e => {
            return {
                'Matricule': e.matricule,
                'Marque': e.marqueVo?.libelle,
                'Type vehicule': e.typeVehiculeVo?.reference,
                'Date achat vehicule': this.datePipe.transform(e.dateAchatVehicule, 'dd-MM-yyyy'),
                'Image url': e.imageUrl,
                'Ecole': e.ecoleVo?.reference,
            };
        });

        this.criteriaData = [{
            'Matricule': this.searchVehicule.matricule ? this.searchVehicule.matricule : environment.emptyForExport,
            'Marque': this.searchVehicule.marqueVo?.libelle ? this.searchVehicule.marqueVo?.libelle : environment.emptyForExport,
            'Type vehicule': this.searchVehicule.typeVehiculeVo?.reference ? this.searchVehicule.typeVehiculeVo?.reference : environment.emptyForExport,
            'Date achat vehicule Min': this.searchVehicule.dateAchatVehiculeMin ? this.datePipe.transform(this.searchVehicule.dateAchatVehiculeMin, this.dateFormat) : environment.emptyForExport,
            'Date achat vehicule Max': this.searchVehicule.dateAchatVehiculeMax ? this.datePipe.transform(this.searchVehicule.dateAchatVehiculeMax, this.dateFormat) : environment.emptyForExport,
            'Image url': this.searchVehicule.imageUrl ? this.searchVehicule.imageUrl : environment.emptyForExport,
            'Ecole': this.searchVehicule.ecoleVo?.reference ? this.searchVehicule.ecoleVo?.reference : environment.emptyForExport,
        }];

    }

    // getters and setters

    get vehicules(): Array<VehiculeVo> {
        return this.vehiculeService.vehicules;
    }

    set vehicules(value: Array<VehiculeVo>) {
        this.vehiculeService.vehicules = value;
    }

    get vehiculeSelections(): Array<VehiculeVo> {
        return this.vehiculeService.vehiculeSelections;
    }

    set vehiculeSelections(value: Array<VehiculeVo>) {
        this.vehiculeService.vehiculeSelections = value;
    }


    get selectedVehicule(): VehiculeVo {
        return this.vehiculeService.selectedVehicule;
    }

    set selectedVehicule(value: VehiculeVo) {
        this.vehiculeService.selectedVehicule = value;
    }

    get createVehiculeDialog(): boolean {
        return this.vehiculeService.createVehiculeDialog;
    }

    set createVehiculeDialog(value: boolean) {
        this.vehiculeService.createVehiculeDialog = value;
    }

    get editVehiculeDialog(): boolean {
        return this.vehiculeService.editVehiculeDialog;
    }

    set editVehiculeDialog(value: boolean) {
        this.vehiculeService.editVehiculeDialog = value;
    }

    get viewVehiculeDialog(): boolean {
        return this.vehiculeService.viewVehiculeDialog;
    }

    set viewVehiculeDialog(value: boolean) {
        this.vehiculeService.viewVehiculeDialog = value;
    }

    get searchVehicule(): VehiculeVo {
        return this.vehiculeService.searchVehicule;
    }

    set searchVehicule(value: VehiculeVo) {
        this.vehiculeService.searchVehicule = value;
    }


    get dateFormat() {
        return environment.dateFormatList;
    }


}
