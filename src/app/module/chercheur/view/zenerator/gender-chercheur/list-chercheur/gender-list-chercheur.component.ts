import {Component, OnInit} from '@angular/core';
import {GenderService} from 'src/app/controller/service/Gender.service';
import {GenderVo} from 'src/app/controller/model/Gender.model';
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
    selector: 'app-gender-list-chercheur',
    templateUrl: './gender-list-chercheur.component.html',
    styleUrls: ['./gender-list-chercheur.component.css']
})
export class GenderListChercheurComponent implements OnInit {
    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Gender';


    constructor(private datePipe: DatePipe, private genderService: GenderService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService, private exportService: ExportService
    ) {
    }

    ngOnInit(): void {
        this.loadGenders();
        this.initExport();
        this.initCol();
    }

    // methods
    public async loadGenders() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Gender', 'list');
        isPermistted ? this.genderService.findAll().subscribe(genders => this.genders = genders, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


    public searchRequest() {
        this.genderService.findByCriteria(this.searchGender).subscribe(genders => {

            this.genders = genders;
            // this.searchGender = new GenderVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'reference', header: 'Reference'},
            {field: 'libelle', header: 'Libelle'},
        ];
    }

    public async editGender(gender: GenderVo) {
        const isPermistted = await this.roleService.isPermitted('Gender', 'edit');
        if (isPermistted) {
            this.genderService.findByIdWithAssociatedList(gender).subscribe(res => {
                this.selectedGender = res;
                this.editGenderDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewGender(gender: GenderVo) {
        const isPermistted = await this.roleService.isPermitted('Gender', 'view');
        if (isPermistted) {
            this.genderService.findByIdWithAssociatedList(gender).subscribe(res => {
                this.selectedGender = res;
                this.viewGenderDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateGender(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedGender = new GenderVo();
            this.createGenderDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }


    public async deleteGender(gender: GenderVo) {
        const isPermistted = await this.roleService.isPermitted('Gender', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Gender) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.genderService.delete(gender).subscribe(status => {
                        if (status > 0) {
                            const position = this.genders.indexOf(gender);
                            position > -1 ? this.genders.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Gender Supprimé',
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


    public async duplicateGender(gender: GenderVo) {

        this.genderService.findByIdWithAssociatedList(gender).subscribe(
            res => {
                this.initDuplicateGender(res);
                this.selectedGender = res;
                this.selectedGender.id = null;
                this.createGenderDialog = true;

            });

    }

    initDuplicateGender(res: GenderVo) {


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
        this.exportData = this.genders.map(e => {
            return {
                'Reference': e.reference,
                'Libelle': e.libelle,
            };
        });

        this.criteriaData = [{
            'Reference': this.searchGender.reference ? this.searchGender.reference : environment.emptyForExport,
            'Libelle': this.searchGender.libelle ? this.searchGender.libelle : environment.emptyForExport,
        }];

    }

    // getters and setters

    get genders(): Array<GenderVo> {
        return this.genderService.genders;
    }

    set genders(value: Array<GenderVo>) {
        this.genderService.genders = value;
    }

    get genderSelections(): Array<GenderVo> {
        return this.genderService.genderSelections;
    }

    set genderSelections(value: Array<GenderVo>) {
        this.genderService.genderSelections = value;
    }


    get selectedGender(): GenderVo {
        return this.genderService.selectedGender;
    }

    set selectedGender(value: GenderVo) {
        this.genderService.selectedGender = value;
    }

    get createGenderDialog(): boolean {
        return this.genderService.createGenderDialog;
    }

    set createGenderDialog(value: boolean) {
        this.genderService.createGenderDialog = value;
    }

    get editGenderDialog(): boolean {
        return this.genderService.editGenderDialog;
    }

    set editGenderDialog(value: boolean) {
        this.genderService.editGenderDialog = value;
    }

    get viewGenderDialog(): boolean {
        return this.genderService.viewGenderDialog;
    }

    set viewGenderDialog(value: boolean) {
        this.genderService.viewGenderDialog = value;
    }

    get searchGender(): GenderVo {
        return this.genderService.searchGender;
    }

    set searchGender(value: GenderVo) {
        this.genderService.searchGender = value;
    }


    get dateFormat() {
        return environment.dateFormatList;
    }


}
