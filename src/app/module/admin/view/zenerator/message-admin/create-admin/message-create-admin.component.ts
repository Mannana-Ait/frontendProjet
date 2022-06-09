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
    selector: 'app-message-create-admin',
    templateUrl: './message-create-admin.component.html',
    styleUrls: ['./message-create-admin.component.css']
})
export class MessageCreateAdminComponent implements OnInit {

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


    ngOnInit(): void {

        this.selectedEtatMessage = new EtatMessageVo();
        this.etatMessageService.findAll().subscribe((data) => this.etatMessages = data);
    }


    private setValidation(value: boolean) {
    }


    public save() {
        this.submitted = true;
        this.validateForm();
        if (this.errorMessages.length === 0) {
            this.saveWithShowOption(false);
        } else {
            this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire'});
        }
    }

    public saveWithShowOption(showList: boolean) {
        this.messagesService.save().subscribe(message => {
            this.messages.push({...message});
            this.createMessageDialog = false;
            this.submitted = false;
            this.selectedMessage = new MessageVo();


        }, error => {
            console.log(error);
        });
    }

    private validateForm(): void {
        this.errorMessages = new Array<string>();

    }


    public async openCreateEtatMessage(etatMessage: string) {
        const isPermistted = await this.roleService.isPermitted('EtatMessage', 'add');
        if (isPermistted) {
            this.selectedEtatMessage = new EtatMessageVo();
            this.createEtatMessageDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    hideCreateDialog() {
        this.createMessageDialog = false;
        this.setValidation(true);
    }

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

    get createMessageDialog(): boolean {
        return this.messagesService.createMessageDialog;

    }

    set createMessageDialog(value: boolean) {
        this.messagesService.createMessageDialog = value;
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
        return this.etatMessageService.createEtatMessageDialog;
    }

    set createEtatMessageDialog(value: boolean) {
        this.etatMessageService.createEtatMessageDialog = value;
    }

    get dateFormat() {
        return environment.dateFormatCreate;
    }

    get dateFormatColumn() {
        return environment.dateFormatCreate;
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
