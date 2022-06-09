import {Component, OnInit} from '@angular/core';
import {EtatMessageService} from 'src/app/controller/service/EtatMessage.service';
import {EtatMessageVo} from 'src/app/controller/model/EtatMessage.model';
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
    selector: 'app-etat-message-list-chercheur',
    templateUrl: './etat-message-list-chercheur.component.html',
    styleUrls: ['./etat-message-list-chercheur.component.css']
})
export class EtatMessageListChercheurComponent implements OnInit {
    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'EtatMessage';


    constructor(private datePipe: DatePipe, private etatMessageService: EtatMessageService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService, private exportService: ExportService
    ) {
    }

    ngOnInit(): void {
        this.loadEtatMessages();
        this.initExport();
        this.initCol();
    }

    // methods
    public async loadEtatMessages() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('EtatMessage', 'list');
        isPermistted ? this.etatMessageService.findAll().subscribe(etatMessages => this.etatMessages = etatMessages, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


    public searchRequest() {
        this.etatMessageService.findByCriteria(this.searchEtatMessage).subscribe(etatMessages => {

            this.etatMessages = etatMessages;
            // this.searchEtatMessage = new EtatMessageVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'reference', header: 'Reference'},
            {field: 'libelle', header: 'Libelle'},
        ];
    }

    public async editEtatMessage(etatMessage: EtatMessageVo) {
        const isPermistted = await this.roleService.isPermitted('EtatMessage', 'edit');
        if (isPermistted) {
            this.etatMessageService.findByIdWithAssociatedList(etatMessage).subscribe(res => {
                this.selectedEtatMessage = res;
                this.editEtatMessageDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewEtatMessage(etatMessage: EtatMessageVo) {
        const isPermistted = await this.roleService.isPermitted('EtatMessage', 'view');
        if (isPermistted) {
            this.etatMessageService.findByIdWithAssociatedList(etatMessage).subscribe(res => {
                this.selectedEtatMessage = res;
                this.viewEtatMessageDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateEtatMessage(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedEtatMessage = new EtatMessageVo();
            this.createEtatMessageDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }


    public async deleteEtatMessage(etatMessage: EtatMessageVo) {
        const isPermistted = await this.roleService.isPermitted('EtatMessage', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Etat message) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.etatMessageService.delete(etatMessage).subscribe(status => {
                        if (status > 0) {
                            const position = this.etatMessages.indexOf(etatMessage);
                            position > -1 ? this.etatMessages.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Etat message Supprimé',
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


    public async duplicateEtatMessage(etatMessage: EtatMessageVo) {

        this.etatMessageService.findByIdWithAssociatedList(etatMessage).subscribe(
            res => {
                this.initDuplicateEtatMessage(res);
                this.selectedEtatMessage = res;
                this.selectedEtatMessage.id = null;
                this.createEtatMessageDialog = true;

            });

    }

    initDuplicateEtatMessage(res: EtatMessageVo) {


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
        this.exportData = this.etatMessages.map(e => {
            return {
                'Reference': e.reference,
                'Libelle': e.libelle,
            };
        });

        this.criteriaData = [{
            'Reference': this.searchEtatMessage.reference ? this.searchEtatMessage.reference : environment.emptyForExport,
            'Libelle': this.searchEtatMessage.libelle ? this.searchEtatMessage.libelle : environment.emptyForExport,
        }];

    }

    // getters and setters

    get etatMessages(): Array<EtatMessageVo> {
        return this.etatMessageService.etatMessages;
    }

    set etatMessages(value: Array<EtatMessageVo>) {
        this.etatMessageService.etatMessages = value;
    }

    get etatMessageSelections(): Array<EtatMessageVo> {
        return this.etatMessageService.etatMessageSelections;
    }

    set etatMessageSelections(value: Array<EtatMessageVo>) {
        this.etatMessageService.etatMessageSelections = value;
    }


    get selectedEtatMessage(): EtatMessageVo {
        return this.etatMessageService.selectedEtatMessage;
    }

    set selectedEtatMessage(value: EtatMessageVo) {
        this.etatMessageService.selectedEtatMessage = value;
    }

    get createEtatMessageDialog(): boolean {
        return this.etatMessageService.createEtatMessageDialog;
    }

    set createEtatMessageDialog(value: boolean) {
        this.etatMessageService.createEtatMessageDialog = value;
    }

    get editEtatMessageDialog(): boolean {
        return this.etatMessageService.editEtatMessageDialog;
    }

    set editEtatMessageDialog(value: boolean) {
        this.etatMessageService.editEtatMessageDialog = value;
    }

    get viewEtatMessageDialog(): boolean {
        return this.etatMessageService.viewEtatMessageDialog;
    }

    set viewEtatMessageDialog(value: boolean) {
        this.etatMessageService.viewEtatMessageDialog = value;
    }

    get searchEtatMessage(): EtatMessageVo {
        return this.etatMessageService.searchEtatMessage;
    }

    set searchEtatMessage(value: EtatMessageVo) {
        this.etatMessageService.searchEtatMessage = value;
    }


    get dateFormat() {
        return environment.dateFormatList;
    }


}
