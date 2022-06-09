import {Component, OnInit} from '@angular/core';
import {EtatMessageService} from 'src/app/controller/service/EtatMessage.service';
import {EtatMessageVo} from 'src/app/controller/model/EtatMessage.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-etat-message-view-chercheur',
    templateUrl: './etat-message-view-chercheur.component.html',
    styleUrls: ['./etat-message-view-chercheur.component.css']
})
export class EtatMessageViewChercheurComponent implements OnInit {


    constructor(private datePipe: DatePipe, private etatMessageService: EtatMessageService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
    ) {
    }

// methods
    ngOnInit(): void {
    }

    hideViewDialog() {
        this.viewEtatMessageDialog = false;
    }

// getters and setters

    get etatMessages(): Array<EtatMessageVo> {
        return this.etatMessageService.etatMessages;
    }

    set etatMessages(value: Array<EtatMessageVo>) {
        this.etatMessageService.etatMessages = value;
    }

    get selectedEtatMessage(): EtatMessageVo {
        return this.etatMessageService.selectedEtatMessage;
    }

    set selectedEtatMessage(value: EtatMessageVo) {
        this.etatMessageService.selectedEtatMessage = value;
    }

    get viewEtatMessageDialog(): boolean {
        return this.etatMessageService.viewEtatMessageDialog;

    }

    set viewEtatMessageDialog(value: boolean) {
        this.etatMessageService.viewEtatMessageDialog = value;
    }


    get dateFormat() {
        return environment.dateFormatView;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }
}
