import {Component, OnInit} from '@angular/core';
import {MessagesService} from 'src/app/controller/service/Message.service';
import {MessageVo} from 'src/app/controller/model/Message.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {EtatMessageVo} from 'src/app/controller/model/EtatMessage.model';
import {EtatMessageService} from 'src/app/controller/service/EtatMessage.service';

@Component({
    selector: 'app-message-view-chercheur',
    templateUrl: './message-view-chercheur.component.html',
    styleUrls: ['./message-view-chercheur.component.css']
})
export class MessageViewChercheurComponent implements OnInit {


    constructor(private datePipe: DatePipe, private messagesService: MessagesService
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

    hideViewDialog() {
        this.viewMessageDialog = false;
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

    get viewMessageDialog(): boolean {
        return this.messagesService.viewMessageDialog;

    }

    set viewMessageDialog(value: boolean) {
        this.messagesService.viewMessageDialog = value;
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

    get editEtatMessageDialog(): boolean {
        return this.etatMessageService.editEtatMessageDialog;
    }

    set editEtatMessageDialog(value: boolean) {
        this.etatMessageService.editEtatMessageDialog = value;
    }

    get dateFormat() {
        return environment.dateFormatView;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }
}
