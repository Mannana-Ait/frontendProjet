import {Component, OnInit} from '@angular/core';
import {GerantService} from 'src/app/controller/service/Gerant.service';
import {GerantVo} from 'src/app/controller/model/Gerant.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, {RowInput} from 'jspdf-autotable';
import {saveAs} from 'file-saver';
import {RoleService} from 'src/app/controller/service/role.service';
import {DatePipe} from '@angular/common';


import {GenderService} from 'src/app/controller/service/Gender.service';

import {GenderVo} from 'src/app/controller/model/Gender.model';
import {MessageService, ConfirmationService, MenuItem} from 'primeng/api';
import {AuthService} from 'src/app/controller/service/Auth.service';
import {ExportService} from 'src/app/controller/service/Export.service';

@Component({
    selector: 'app-gerant-list-chercheur',
    templateUrl: './gerant-list-chercheur.component.html',
    styleUrls: ['./gerant-list-chercheur.component.css']
})
export class GerantListChercheurComponent implements OnInit {
    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Gerant';
    genders: Array<GenderVo>;


    constructor(private datePipe: DatePipe, private gerantService: GerantService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService, private exportService: ExportService
        , private genderService: GenderService
    ) {
    }

    ngOnInit(): void {
        this.loadGerants();
        this.initExport();
        this.initCol();
        this.loadGender();
    }

    // methods
    public async loadGerants() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Gerant', 'list');
        isPermistted ? this.gerantService.findAll().subscribe(gerants => this.gerants = gerants, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


    public searchRequest() {
        this.gerantService.findByCriteria(this.searchGerant).subscribe(gerants => {

            this.gerants = gerants;
            // this.searchGerant = new GerantVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'reference', header: 'Reference'},
            {field: 'nom', header: 'Nom'},
            {field: 'prenom', header: 'Prenom'},
            {field: 'email', header: 'Email'},
            {field: 'adress', header: 'Adress'},
            {field: 'phone', header: 'Phone'},
            {field: 'fix', header: 'Fix'},
            {field: 'lieuNaissance', header: 'Lieu naissance'},
            {field: 'dateNaissance', header: 'Date naissance'},
            {field: 'cin', header: 'Cin'},
            {field: 'gender?.libelle', header: 'Gender'},
            {field: 'picture', header: 'Picture'},
            {field: 'dateJoin', header: 'Date join'},
        ];
    }

    public async editGerant(gerant: GerantVo) {
        const isPermistted = await this.roleService.isPermitted('Gerant', 'edit');
        if (isPermistted) {
            this.gerantService.findByIdWithAssociatedList(gerant).subscribe(res => {
                this.selectedGerant = res;
                this.selectedGerant.dateJoin = new Date(gerant.dateJoin);
                this.editGerantDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewGerant(gerant: GerantVo) {
        const isPermistted = await this.roleService.isPermitted('Gerant', 'view');
        if (isPermistted) {
            this.gerantService.findByIdWithAssociatedList(gerant).subscribe(res => {
                this.selectedGerant = res;
                this.selectedGerant.dateJoin = new Date(gerant.dateJoin);
                this.viewGerantDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateGerant(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedGerant = new GerantVo();
            this.createGerantDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }


    public async deleteGerant(gerant: GerantVo) {
        const isPermistted = await this.roleService.isPermitted('Gerant', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Gerant) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.gerantService.delete(gerant).subscribe(status => {
                        if (status > 0) {
                            const position = this.gerants.indexOf(gerant);
                            position > -1 ? this.gerants.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Gerant Supprimé',
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

    public async loadGender() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Gerant', 'list');
        isPermistted ? this.genderService.findAll().subscribe(genders => this.genders = genders, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async duplicateGerant(gerant: GerantVo) {

        this.gerantService.findByIdWithAssociatedList(gerant).subscribe(
            res => {
                this.initDuplicateGerant(res);
                this.selectedGerant = res;
                this.selectedGerant.id = null;
                this.createGerantDialog = true;

            });

    }

    initDuplicateGerant(res: GerantVo) {


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
        this.exportData = this.gerants.map(e => {
            return {
                'Reference': e.reference,
                'Nom': e.nom,
                'Prenom': e.prenom,
                'Email': e.email,
                'Adress': e.adress,
                'Phone': e.phone,
                'Fix': e.fix,
                'Lieu naissance': e.lieuNaissance,
                'Date naissance': e.dateNaissance,
                'Cin': e.cin,
                'Gender': e.genderVo?.libelle,
                'Picture': e.picture,
                'Date join': this.datePipe.transform(e.dateJoin, 'dd-MM-yyyy'),
            };
        });

        this.criteriaData = [{
            'Reference': this.searchGerant.reference ? this.searchGerant.reference : environment.emptyForExport,
            'Nom': this.searchGerant.nom ? this.searchGerant.nom : environment.emptyForExport,
            'Prenom': this.searchGerant.prenom ? this.searchGerant.prenom : environment.emptyForExport,
            'Email': this.searchGerant.email ? this.searchGerant.email : environment.emptyForExport,
            'Adress': this.searchGerant.adress ? this.searchGerant.adress : environment.emptyForExport,
            'Phone': this.searchGerant.phone ? this.searchGerant.phone : environment.emptyForExport,
            'Fix': this.searchGerant.fix ? this.searchGerant.fix : environment.emptyForExport,
            'Lieu naissance': this.searchGerant.lieuNaissance ? this.searchGerant.lieuNaissance : environment.emptyForExport,
            'Date naissance': this.searchGerant.dateNaissance ? this.searchGerant.dateNaissance : environment.emptyForExport,
            'Cin': this.searchGerant.cin ? this.searchGerant.cin : environment.emptyForExport,
            'Gender': this.searchGerant.genderVo?.libelle ? this.searchGerant.genderVo?.libelle : environment.emptyForExport,
            'Picture': this.searchGerant.picture ? this.searchGerant.picture : environment.emptyForExport,
            'Date join Min': this.searchGerant.dateJoinMin ? this.datePipe.transform(this.searchGerant.dateJoinMin, this.dateFormat) : environment.emptyForExport,
            'Date join Max': this.searchGerant.dateJoinMax ? this.datePipe.transform(this.searchGerant.dateJoinMax, this.dateFormat) : environment.emptyForExport,
        }];

    }

    // getters and setters

    get gerants(): Array<GerantVo> {
        return this.gerantService.gerants;
    }

    set gerants(value: Array<GerantVo>) {
        this.gerantService.gerants = value;
    }

    get gerantSelections(): Array<GerantVo> {
        return this.gerantService.gerantSelections;
    }

    set gerantSelections(value: Array<GerantVo>) {
        this.gerantService.gerantSelections = value;
    }


    get selectedGerant(): GerantVo {
        return this.gerantService.selectedGerant;
    }

    set selectedGerant(value: GerantVo) {
        this.gerantService.selectedGerant = value;
    }

    get createGerantDialog(): boolean {
        return this.gerantService.createGerantDialog;
    }

    set createGerantDialog(value: boolean) {
        this.gerantService.createGerantDialog = value;
    }

    get editGerantDialog(): boolean {
        return this.gerantService.editGerantDialog;
    }

    set editGerantDialog(value: boolean) {
        this.gerantService.editGerantDialog = value;
    }

    get viewGerantDialog(): boolean {
        return this.gerantService.viewGerantDialog;
    }

    set viewGerantDialog(value: boolean) {
        this.gerantService.viewGerantDialog = value;
    }

    get searchGerant(): GerantVo {
        return this.gerantService.searchGerant;
    }

    set searchGerant(value: GerantVo) {
        this.gerantService.searchGerant = value;
    }


    get dateFormat() {
        return environment.dateFormatList;
    }


}
