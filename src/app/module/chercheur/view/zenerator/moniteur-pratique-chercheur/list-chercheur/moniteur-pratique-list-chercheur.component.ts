import {Component, OnInit} from '@angular/core';
import {MoniteurPratiqueService} from 'src/app/controller/service/MoniteurPratique.service';
import {MoniteurPratiqueVo} from 'src/app/controller/model/MoniteurPratique.model';
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
    selector: 'app-moniteur-pratique-list-chercheur',
    templateUrl: './moniteur-pratique-list-chercheur.component.html',
    styleUrls: ['./moniteur-pratique-list-chercheur.component.css']
})
export class MoniteurPratiqueListChercheurComponent implements OnInit {
    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'MoniteurPratique';
    genders: Array<GenderVo>;


    constructor(private datePipe: DatePipe, private moniteurPratiqueService: MoniteurPratiqueService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService, private exportService: ExportService
        , private genderService: GenderService
    ) {
    }

    ngOnInit(): void {
        this.loadMoniteurPratiques();
        this.initExport();
        this.initCol();
        this.loadGender();
    }

    // methods
    public async loadMoniteurPratiques() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('MoniteurPratique', 'list');
        isPermistted ? this.moniteurPratiqueService.findAll().subscribe(moniteurPratiques => this.moniteurPratiques = moniteurPratiques, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


    public searchRequest() {
        this.moniteurPratiqueService.findByCriteria(this.searchMoniteurPratique).subscribe(moniteurPratiques => {

            this.moniteurPratiques = moniteurPratiques;
            // this.searchMoniteurPratique = new MoniteurPratiqueVo();
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

    public async editMoniteurPratique(moniteurPratique: MoniteurPratiqueVo) {
        const isPermistted = await this.roleService.isPermitted('MoniteurPratique', 'edit');
        if (isPermistted) {
            this.moniteurPratiqueService.findByIdWithAssociatedList(moniteurPratique).subscribe(res => {
                this.selectedMoniteurPratique = res;
                this.selectedMoniteurPratique.lieuNaissance = new Date(moniteurPratique.lieuNaissance);
                this.selectedMoniteurPratique.dateNaissance = new Date(moniteurPratique.dateNaissance);
                this.editMoniteurPratiqueDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewMoniteurPratique(moniteurPratique: MoniteurPratiqueVo) {
        const isPermistted = await this.roleService.isPermitted('MoniteurPratique', 'view');
        if (isPermistted) {
            this.moniteurPratiqueService.findByIdWithAssociatedList(moniteurPratique).subscribe(res => {
                this.selectedMoniteurPratique = res;
                this.selectedMoniteurPratique.lieuNaissance = new Date(moniteurPratique.lieuNaissance);
                this.selectedMoniteurPratique.dateNaissance = new Date(moniteurPratique.dateNaissance);
                this.viewMoniteurPratiqueDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateMoniteurPratique(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedMoniteurPratique = new MoniteurPratiqueVo();
            this.createMoniteurPratiqueDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }


    public async deleteMoniteurPratique(moniteurPratique: MoniteurPratiqueVo) {
        const isPermistted = await this.roleService.isPermitted('MoniteurPratique', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Moniteur pratique) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.moniteurPratiqueService.delete(moniteurPratique).subscribe(status => {
                        if (status > 0) {
                            const position = this.moniteurPratiques.indexOf(moniteurPratique);
                            position > -1 ? this.moniteurPratiques.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Moniteur pratique Supprimé',
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
        const isPermistted = await this.roleService.isPermitted('MoniteurPratique', 'list');
        isPermistted ? this.genderService.findAll().subscribe(genders => this.genders = genders, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async duplicateMoniteurPratique(moniteurPratique: MoniteurPratiqueVo) {

        this.moniteurPratiqueService.findByIdWithAssociatedList(moniteurPratique).subscribe(
            res => {
                this.initDuplicateMoniteurPratique(res);
                this.selectedMoniteurPratique = res;
                this.selectedMoniteurPratique.id = null;
                this.createMoniteurPratiqueDialog = true;

            });

    }

    initDuplicateMoniteurPratique(res: MoniteurPratiqueVo) {


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
        this.exportData = this.moniteurPratiques.map(e => {
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
            'Reference': this.searchMoniteurPratique.reference ? this.searchMoniteurPratique.reference : environment.emptyForExport,
            'Nom': this.searchMoniteurPratique.nom ? this.searchMoniteurPratique.nom : environment.emptyForExport,
            'Prenom': this.searchMoniteurPratique.prenom ? this.searchMoniteurPratique.prenom : environment.emptyForExport,
            'Email': this.searchMoniteurPratique.email ? this.searchMoniteurPratique.email : environment.emptyForExport,
            'Adress': this.searchMoniteurPratique.adress ? this.searchMoniteurPratique.adress : environment.emptyForExport,
            'Phone': this.searchMoniteurPratique.phone ? this.searchMoniteurPratique.phone : environment.emptyForExport,
            'Fix': this.searchMoniteurPratique.fix ? this.searchMoniteurPratique.fix : environment.emptyForExport,
            'Lieu naissance Min': this.searchMoniteurPratique.lieuNaissanceMin ? this.datePipe.transform(this.searchMoniteurPratique.lieuNaissanceMin, this.dateFormat) : environment.emptyForExport,
            'Lieu naissance Max': this.searchMoniteurPratique.lieuNaissanceMax ? this.datePipe.transform(this.searchMoniteurPratique.lieuNaissanceMax, this.dateFormat) : environment.emptyForExport,
            'Date naissance Min': this.searchMoniteurPratique.dateNaissanceMin ? this.datePipe.transform(this.searchMoniteurPratique.dateNaissanceMin, this.dateFormat) : environment.emptyForExport,
            'Date naissance Max': this.searchMoniteurPratique.dateNaissanceMax ? this.datePipe.transform(this.searchMoniteurPratique.dateNaissanceMax, this.dateFormat) : environment.emptyForExport,
            'Cin': this.searchMoniteurPratique.cin ? this.searchMoniteurPratique.cin : environment.emptyForExport,
            'Gender': this.searchMoniteurPratique.genderVo?.libelle ? this.searchMoniteurPratique.genderVo?.libelle : environment.emptyForExport,
            'Picture': this.searchMoniteurPratique.picture ? this.searchMoniteurPratique.picture : environment.emptyForExport,
        }];

    }

    // getters and setters

    get moniteurPratiques(): Array<MoniteurPratiqueVo> {
        return this.moniteurPratiqueService.moniteurPratiques;
    }

    set moniteurPratiques(value: Array<MoniteurPratiqueVo>) {
        this.moniteurPratiqueService.moniteurPratiques = value;
    }

    get moniteurPratiqueSelections(): Array<MoniteurPratiqueVo> {
        return this.moniteurPratiqueService.moniteurPratiqueSelections;
    }

    set moniteurPratiqueSelections(value: Array<MoniteurPratiqueVo>) {
        this.moniteurPratiqueService.moniteurPratiqueSelections = value;
    }


    get selectedMoniteurPratique(): MoniteurPratiqueVo {
        return this.moniteurPratiqueService.selectedMoniteurPratique;
    }

    set selectedMoniteurPratique(value: MoniteurPratiqueVo) {
        this.moniteurPratiqueService.selectedMoniteurPratique = value;
    }

    get createMoniteurPratiqueDialog(): boolean {
        return this.moniteurPratiqueService.createMoniteurPratiqueDialog;
    }

    set createMoniteurPratiqueDialog(value: boolean) {
        this.moniteurPratiqueService.createMoniteurPratiqueDialog = value;
    }

    get editMoniteurPratiqueDialog(): boolean {
        return this.moniteurPratiqueService.editMoniteurPratiqueDialog;
    }

    set editMoniteurPratiqueDialog(value: boolean) {
        this.moniteurPratiqueService.editMoniteurPratiqueDialog = value;
    }

    get viewMoniteurPratiqueDialog(): boolean {
        return this.moniteurPratiqueService.viewMoniteurPratiqueDialog;
    }

    set viewMoniteurPratiqueDialog(value: boolean) {
        this.moniteurPratiqueService.viewMoniteurPratiqueDialog = value;
    }

    get searchMoniteurPratique(): MoniteurPratiqueVo {
        return this.moniteurPratiqueService.searchMoniteurPratique;
    }

    set searchMoniteurPratique(value: MoniteurPratiqueVo) {
        this.moniteurPratiqueService.searchMoniteurPratique = value;
    }


    get dateFormat() {
        return environment.dateFormatList;
    }


}
