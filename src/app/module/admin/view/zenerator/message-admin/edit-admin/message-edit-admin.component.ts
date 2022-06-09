import {Component, OnInit, Input} from '@angular/core';
import {MessagesService} from 'src/app/controller/service/Message.service';
import {MessageVo} from 'src/app/controller/model/Message.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


import {EtatMessageVo} from 'src/app/controller/model/EtatMessage.model';
import {EtatMessageService} from 'src/app/controller/service/EtatMessage.service';

@Component({
    selector: 'app-message-edit-admin',
    templateUrl: './message-edit-admin.component.html',
    styleUrls: ['./message-edit-admin.component.css']
})
export class MessageEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    constructor(private datePipe: DatePipe, private messagesService: MessagesService
        , private stringUtilService: StringUtilService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
        , private etatMessageService: EtatMessageService
    ) {

    }


// methods
    ngOnInit(): void {

        this.selectedEtatMessage = new EtatMessageVo();
        this.etatMessageService.findAll().subscribe((data) => this.etatMessages = data);
    }


    private setValidation(value: boolean) {
    }


    public edit() {
        this.submitted = true;
        this.validateForm();
        if (this.errorMessages.length === 0) {
            this.editWithShowOption(false);
        } else {
            this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire'});
        }
    }

    public editWithShowOption(showList: boolean) {
        this.messagesService.edit().subscribe(message => {
            const myIndex = this.messages.findIndex(e => e.id === this.selectedMessage.id);
            this.messages[myIndex] = this.selectedMessage;
            this.editMessageDialog = false;
            this.submitted = false;
            this.selectedMessage = new MessageVo();


        }, error => {
            console.log(error);
        });

    }

//validation methods
    private validateForm(): void {
        this.errorMessages = new Array<string>();

    }


//openPopup
    public async openCreateEtatMessage(etatMessage: string) {
        const isPermistted = await this.roleService.isPermitted('EtatMessage', 'edit');
        if (isPermistted) {
            this.selectedEtatMessage = new EtatMessageVo();
            this.createEtatMessageDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

// methods

    hideEditDialog() {
        this.editMessageDialog = false;
        this.setValidation(true);
    }

// getters and setters

    get messages(): Array<MessageVo> {
        return this.messagesService.messages;
    }

    set messages(value: Array<MessageVo>) {
        this.messagesService.messages = value;
    }

    get selectedMessage(): MessageVo {
        return this.messagesService.selectedMessage;
    }

    set selectedMessage(value: MessageVo) {
        this.messagesService.selectedMessage = value;
    }

    get editMessageDialog(): boolean {
        return this.messagesService.editMessageDialog;

    }

    set editMessageDialog(value: boolean) {
        this.messagesService.editMessageDialog = value;
    }

    get selectedEtatMessage(): EtatMessageVo {
        return this.etatMessageService.selectedEtatMessage;
    }

    set selectedEtatMessage(value: EtatMessageVo) {
        this.etatMessageService.selectedEtatMessage = value;
    }

    get etatMessages(): Array<EtatMessageVo> {
        return this.etatMessageService.etatMessages;
    }

    set etatMessages(value: Array<EtatMessageVo>) {
        this.etatMessageService.etatMessages = value;
    }

    get createEtatMessageDialog(): boolean {
        return this.etatMessageService.editEtatMessageDialog;
    }

    set createEtatMessageDialog(value: boolean) {
        this.etatMessageService.editEtatMessageDialog = value;
    }

    get dateFormat() {
        return environment.dateFormatEdit;
    }

    get dateFormatColumn() {
        return environment.dateFormatEdit;
    }

    get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }


    get errorMessages(): string[] {
        return this._errorMessages;
    }

    set errorMessages(value: string[]) {
        this._errorMessages = value;
    }


}
