import {Component, OnInit} from '@angular/core';
import {MessagesService} from 'src/app/controller/service/Message.service';
import {MessageVo} from 'src/app/controller/model/Message.model';
import * as moment from 'moment';
import {Router} from '@angular/router';
import {environment} from 'src/environments/environment';
import jsPDF from 'jspdf';
import autoTable, {RowInput} from 'jspdf-autotable';
import {saveAs} from 'file-saver';
import {RoleService} from 'src/app/controller/service/role.service';
import {DatePipe} from '@angular/common';


import {EtatMessageService} from 'src/app/controller/service/EtatMessage.service';

import {EtatMessageVo} from 'src/app/controller/model/EtatMessage.model';
import {MessageService, ConfirmationService, MenuItem} from 'primeng/api';
import {AuthService} from 'src/app/controller/service/Auth.service';
import {ExportService} from 'src/app/controller/service/Export.service';

@Component({
    selector: 'app-message-list-chercheur',
    templateUrl: './message-list-chercheur.component.html',
    styleUrls: ['./message-list-chercheur.component.css']
})
export class MessageListChercheurComponent implements OnInit {
    // declarations
    findByCriteriaShow: boolean = false;
    cols: any[] = [];
    excelPdfButons: MenuItem[];
    exportData: any[] = [];
    criteriaData: any[] = [];
    fileName = 'Message';
    etatMessages: Array<EtatMessageVo>;


    constructor(private datePipe: DatePipe, private messagesService: MessagesService, private messageService: MessageService, private confirmationService: ConfirmationService, private roleService: RoleService, private router: Router, private authService: AuthService, private exportService: ExportService
        , private etatMessageService: EtatMessageService
    ) {
    }

    ngOnInit(): void {
        this.loadMessages();
        this.initExport();
        this.initCol();
        this.loadEtatMessage();
    }

    // methods
    public async loadMessages() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Message', 'list');
        isPermistted ? this.messagesService.findAll().subscribe(messages => this.messages = messages, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'});
    }


    public searchRequest() {
        this.messagesService.findByCriteria(this.searchMessage).subscribe(messages => {

            this.messages = messages;
            // this.searchMessage = new MessageVo();
        }, error => console.log(error));
    }

    private initCol() {
        this.cols = [
            {field: 'reference', header: 'Reference'},
            {field: 'email', header: 'Email'},
            {field: 'dateEnvoi', header: 'Date envoi'},
            {field: 'etatMessage?.libelle', header: 'Etat message'},
        ];
    }

    public async editMessage(message: MessageVo) {
        const isPermistted = await this.roleService.isPermitted('Message', 'edit');
        if (isPermistted) {
            this.messagesService.findByIdWithAssociatedList(message).subscribe(res => {
                this.selectedMessage = res;
                this.selectedMessage.dateEnvoi = new Date(message.dateEnvoi);
                this.editMessageDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'Erreur', detail: 'Probléme de permission'
            });
        }

    }


    public async viewMessage(message: MessageVo) {
        const isPermistted = await this.roleService.isPermitted('Message', 'view');
        if (isPermistted) {
            this.messagesService.findByIdWithAssociatedList(message).subscribe(res => {
                this.selectedMessage = res;
                this.selectedMessage.dateEnvoi = new Date(message.dateEnvoi);
                this.viewMessageDialog = true;
            });
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }

    public async openCreateMessage(pojo: string) {
        const isPermistted = await this.roleService.isPermitted(pojo, 'add');
        if (isPermistted) {
            this.selectedMessage = new MessageVo();
            this.createMessageDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème d\'autorisation'
            });
        }

    }


    public async deleteMessage(message: MessageVo) {
        const isPermistted = await this.roleService.isPermitted('Message', 'delete');
        if (isPermistted) {
            this.confirmationService.confirm({
                message: 'Voulez-vous supprimer cet élément (Message) ?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    this.messagesService.delete(message).subscribe(status => {
                        if (status > 0) {
                            const position = this.messages.indexOf(message);
                            position > -1 ? this.messages.splice(position, 1) : false;
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Succès',
                                detail: 'Message Supprimé',
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

    public async loadEtatMessage() {
        await this.roleService.findAll();
        const isPermistted = await this.roleService.isPermitted('Message', 'list');
        isPermistted ? this.etatMessageService.findAll().subscribe(etatMessages => this.etatMessages = etatMessages, error => console.log(error))
            : this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Problème de permission'});

    }

    public async duplicateMessage(message: MessageVo) {

        this.messagesService.findByIdWithAssociatedList(message).subscribe(
            res => {
                this.initDuplicateMessage(res);
                this.selectedMessage = res;
                this.selectedMessage.id = null;
                this.createMessageDialog = true;

            });

    }

    initDuplicateMessage(res: MessageVo) {


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
        this.exportData = this.messages.map(e => {
            return {
                'Reference': e.reference,
                'Email': e.email,
                'Corps': e.corps,
                'Date envoi': this.datePipe.transform(e.dateEnvoi, 'dd-MM-yyyy'),
                'Etat message': e.etatMessageVo?.libelle,
            };
        });

        this.criteriaData = [{
            'Reference': this.searchMessage.reference ? this.searchMessage.reference : environment.emptyForExport,
            'Email': this.searchMessage.email ? this.searchMessage.email : environment.emptyForExport,
            'Corps': this.searchMessage.corps ? this.searchMessage.corps : environment.emptyForExport,
            'Date envoi Min': this.searchMessage.dateEnvoiMin ? this.datePipe.transform(this.searchMessage.dateEnvoiMin, this.dateFormat) : environment.emptyForExport,
            'Date envoi Max': this.searchMessage.dateEnvoiMax ? this.datePipe.transform(this.searchMessage.dateEnvoiMax, this.dateFormat) : environment.emptyForExport,
            'Etat message': this.searchMessage.etatMessageVo?.libelle ? this.searchMessage.etatMessageVo?.libelle : environment.emptyForExport,
        }];

    }

    // getters and setters

    get messages(): Array<MessageVo> {
        return this.messagesService.messages;
    }

    set messages(value: Array<MessageVo>) {
        this.messagesService.messages = value;
    }

    get messageSelections(): Array<MessageVo> {
        return this.messagesService.messageSelections;
    }

    set messageSelections(value: Array<MessageVo>) {
        this.messagesService.messageSelections = value;
    }


    get selectedMessage(): MessageVo {
        return this.messagesService.selectedMessage;
    }

    set selectedMessage(value: MessageVo) {
        this.messagesService.selectedMessage = value;
    }

    get createMessageDialog(): boolean {
        return this.messagesService.createMessageDialog;
    }

    set createMessageDialog(value: boolean) {
        this.messagesService.createMessageDialog = value;
    }

    get editMessageDialog(): boolean {
        return this.messagesService.editMessageDialog;
    }

    set editMessageDialog(value: boolean) {
        this.messagesService.editMessageDialog = value;
    }

    get viewMessageDialog(): boolean {
        return this.messagesService.viewMessageDialog;
    }

    set viewMessageDialog(value: boolean) {
        this.messagesService.viewMessageDialog = value;
    }

    get searchMessage(): MessageVo {
        return this.messagesService.searchMessage;
    }

    set searchMessage(value: MessageVo) {
        this.messagesService.searchMessage = value;
    }


    get dateFormat() {
        return environment.dateFormatList;
    }


}
