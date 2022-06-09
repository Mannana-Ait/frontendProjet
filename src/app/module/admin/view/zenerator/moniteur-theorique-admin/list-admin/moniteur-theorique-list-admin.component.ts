import {Component, OnInit} from '@angular/core';
import {MoniteurTheoriqueService} from 'src/app/controller/service/MoniteurTheorique.service';
import {MoniteurTheoriqueVo} from 'src/app/controller/model/MoniteurTheorique.model';
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
    selector: 'app-moniteur-theorique-list-admin',
    templateUrl: './moniteur-theorique-list-admin.component.html',
    styleUrls: ['./moniteur-theorique-list-admin.component.css']
})
export class MoniteurTheoriqueListAdminComponent implements OnInit {
    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'MoniteurTheorique';
    genders: Array<GenderVo>;


    constructor(private datePipe: DatePipe, private moniteurTheoriqueService: MoniteurTheoriqueService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService, private exportService: ExportService
        , private genderService: GenderService
    ) {
    }

    ngOnInit(): void {
        this.loadMoniteurTheoriques();
        this.initExport();
        this.initCol();
        this.loadGender();
    }

    // methods
    public async loadMoniteurTheoriques() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('MoniteurTheorique', 'list');
        isPermistted ? this.moniteurTheoriqueService.findAll().subscribe(moniteurTheoriques => this.moniteurTheoriques = moniteurTheoriques, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


    public searchRequest() {
        this.moniteurTheoriqueService.findByCriteria(this.searchMoniteurTheorique).subscribe(moniteurTheoriques => {

            this.moniteurTheoriques = moniteurTheoriques;
            // this.searchMoniteurTheorique = new MoniteurTheoriqueVo();
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
        ];
    }

    public async editMoniteurTheorique(moniteurTheorique: MoniteurTheoriqueVo) {
        const isPermistted = await this.roleService.isPermitted('MoniteurTheorique', 'edit');
        if (isPermistted) {
            this.moniteurTheoriqueService.findByIdWithAssociatedList(moniteurTheorique).subscribe(res => {
                this.selectedMoniteurTheorique = res;
                this.selectedMoniteurTheorique.lieuNaissance = new Date(moniteurTheorique.lieuNaissance);
                this.selectedMoniteurTheorique.dateNaissance = new Date(moniteurTheorique.dateNaissance);
                this.editMoniteurTheoriqueDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewMoniteurTheorique(moniteurTheorique: MoniteurTheoriqueVo) {
        const isPermistted = await this.roleService.isPermitted('MoniteurTheorique', 'view');
        if (isPermistted) {
            this.moniteurTheoriqueService.findByIdWithAssociatedList(moniteurTheorique).subscribe(res => {
                this.selectedMoniteurTheorique = res;
                this.selectedMoniteurTheorique.lieuNaissance = new Date(moniteurTheorique.lieuNaissance);
                this.selectedMoniteurTheorique.dateNaissance = new Date(moniteurTheorique.dateNaissance);
                this.viewMoniteurTheoriqueDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateMoniteurTheorique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedMoniteurTheorique = new MoniteurTheoriqueVo();
            this.createMoniteurTheoriqueDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }


    public async deleteMoniteurTheorique(moniteurTheorique: MoniteurTheoriqueVo) {
        const isPermistted = await this.roleService.isPermitted('MoniteurTheorique', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Moniteur theorique) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.moniteurTheoriqueService.delete(moniteurTheorique).subscribe(status => {
                        if (status > 0) {
                            const position = this.moniteurTheoriques.indexOf(moniteurTheorique);
                            position > -1 ? this.moniteurTheoriques.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Moniteur theorique Supprimé',
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
        const isPermistted = await this.roleService.isPermitted('MoniteurTheorique', 'list');
        isPermistted ? this.genderService.findAll().subscribe(genders => this.genders = genders, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async duplicateMoniteurTheorique(moniteurTheorique: MoniteurTheoriqueVo) {

        this.moniteurTheoriqueService.findByIdWithAssociatedList(moniteurTheorique).subscribe(
            res => {
                this.initDuplicateMoniteurTheorique(res);
                this.selectedMoniteurTheorique = res;
                this.selectedMoniteurTheorique.id = null;
                this.createMoniteurTheoriqueDialog = true;

            });

    }

    initDuplicateMoniteurTheorique(res: MoniteurTheoriqueVo) {


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
        this.exportData = this.moniteurTheoriques.map(e => {
            return {
                'Reference': e.reference,
                'Nom': e.nom,
                'Prenom': e.prenom,
                'Email': e.email,
                'Adress': e.adress,
                'Phone': e.phone,
                'Fix': e.fix,
                'Lieu naissance': this.datePipe.transform(e.lieuNaissance, 'dd-MM-yyyy'),
                'Date naissance': this.datePipe.transform(e.dateNaissance, 'dd-MM-yyyy'),
                'Cin': e.cin,
                'Gender': e.genderVo?.libelle,
                'Picture': e.picture,
            };
        });

        this.criteriaData = [{
            'Reference': this.searchMoniteurTheorique.reference ? this.searchMoniteurTheorique.reference : environment.emptyForExport,
            'Nom': this.searchMoniteurTheorique.nom ? this.searchMoniteurTheorique.nom : environment.emptyForExport,
            'Prenom': this.searchMoniteurTheorique.prenom ? this.searchMoniteurTheorique.prenom : environment.emptyForExport,
            'Email': this.searchMoniteurTheorique.email ? this.searchMoniteurTheorique.email : environment.emptyForExport,
            'Adress': this.searchMoniteurTheorique.adress ? this.searchMoniteurTheorique.adress : environment.emptyForExport,
            'Phone': this.searchMoniteurTheorique.phone ? this.searchMoniteurTheorique.phone : environment.emptyForExport,
            'Fix': this.searchMoniteurTheorique.fix ? this.searchMoniteurTheorique.fix : environment.emptyForExport,
            'Lieu naissance Min': this.searchMoniteurTheorique.lieuNaissanceMin ? this.datePipe.transform(this.searchMoniteurTheorique.lieuNaissanceMin, this.dateFormat) : environment.emptyForExport,
            'Lieu naissance Max': this.searchMoniteurTheorique.lieuNaissanceMax ? this.datePipe.transform(this.searchMoniteurTheorique.lieuNaissanceMax, this.dateFormat) : environment.emptyForExport,
            'Date naissance Min': this.searchMoniteurTheorique.dateNaissanceMin ? this.datePipe.transform(this.searchMoniteurTheorique.dateNaissanceMin, this.dateFormat) : environment.emptyForExport,
            'Date naissance Max': this.searchMoniteurTheorique.dateNaissanceMax ? this.datePipe.transform(this.searchMoniteurTheorique.dateNaissanceMax, this.dateFormat) : environment.emptyForExport,
            'Cin': this.searchMoniteurTheorique.cin ? this.searchMoniteurTheorique.cin : environment.emptyForExport,
            'Gender': this.searchMoniteurTheorique.genderVo?.libelle ? this.searchMoniteurTheorique.genderVo?.libelle : environment.emptyForExport,
            'Picture': this.searchMoniteurTheorique.picture ? this.searchMoniteurTheorique.picture : environment.emptyForExport,
        }];

    }

    // getters and setters

    get moniteurTheoriques(): Array<MoniteurTheoriqueVo> {
        return this.moniteurTheoriqueService.moniteurTheoriques;
    }

    set moniteurTheoriques(value: Array<MoniteurTheoriqueVo>) {
        this.moniteurTheoriqueService.moniteurTheoriques = value;
    }

    get moniteurTheoriqueSelections(): Array<MoniteurTheoriqueVo> {
        return this.moniteurTheoriqueService.moniteurTheoriqueSelections;
    }

    set moniteurTheoriqueSelections(value: Array<MoniteurTheoriqueVo>) {
        this.moniteurTheoriqueService.moniteurTheoriqueSelections = value;
    }


    get selectedMoniteurTheorique(): MoniteurTheoriqueVo {
        return this.moniteurTheoriqueService.selectedMoniteurTheorique;
    }

    set selectedMoniteurTheorique(value: MoniteurTheoriqueVo) {
        this.moniteurTheoriqueService.selectedMoniteurTheorique = value;
    }

    get createMoniteurTheoriqueDialog(): boolean {
        return this.moniteurTheoriqueService.createMoniteurTheoriqueDialog;
    }

    set createMoniteurTheoriqueDialog(value: boolean) {
        this.moniteurTheoriqueService.createMoniteurTheoriqueDialog = value;
    }

    get editMoniteurTheoriqueDialog(): boolean {
        return this.moniteurTheoriqueService.editMoniteurTheoriqueDialog;
    }

    set editMoniteurTheoriqueDialog(value: boolean) {
        this.moniteurTheoriqueService.editMoniteurTheoriqueDialog = value;
    }

    get viewMoniteurTheoriqueDialog(): boolean {
        return this.moniteurTheoriqueService.viewMoniteurTheoriqueDialog;
    }

    set viewMoniteurTheoriqueDialog(value: boolean) {
        this.moniteurTheoriqueService.viewMoniteurTheoriqueDialog = value;
    }

    get searchMoniteurTheorique(): MoniteurTheoriqueVo {
        return this.moniteurTheoriqueService.searchMoniteurTheorique;
    }

    set searchMoniteurTheorique(value: MoniteurTheoriqueVo) {
        this.moniteurTheoriqueService.searchMoniteurTheorique = value;
    }


    get dateFormat() {
        return environment.dateFormatList;
    }


}
