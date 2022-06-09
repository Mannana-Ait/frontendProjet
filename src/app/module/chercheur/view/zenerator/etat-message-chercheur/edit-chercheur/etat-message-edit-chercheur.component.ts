import {Component, OnInit, Input} from '@angular/core';
import {EtatMessageService} from 'src/app/controller/service/EtatMessage.service';
import {EtatMessageVo} from 'src/app/controller/model/EtatMessage.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


@Component({
    selector: 'app-etat-message-edit-chercheur',
    templateUrl: './etat-message-edit-chercheur.component.html',
    styleUrls: ['./etat-message-edit-chercheur.component.css']
})
export class EtatMessageEditChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    constructor(private datePipe: DatePipe, private etatMessageService: EtatMessageService
        , private stringUtilService: StringUtilService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
    ) {

    }


// methods
    ngOnInit(): void {

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
        this.etatMessageService.edit().subscribe(etatMessage => {
            const myIndex = this.etatMessages.findIndex(e => e.id === this.selectedEtatMessage.id);
            this.etatMessages[myIndex] = this.selectedEtatMessage;
            this.editEtatMessageDialog = false;
            this.submitted = false;
            this.selectedEtatMessage = new EtatMessageVo();


        }, error => {
            console.log(error);
        });

    }

//validation methods
    private validateForm(): void {
        this.errorMessages = new Array<string>();

    }


//openPopup
// methods

    hideEditDialog() {
        this.editEtatMessageDialog = false;
        this.setValidation(true);
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

    get editEtatMessageDialog(): boolean {
        return this.etatMessageService.createEtatMessageDialog;

    }

    set editEtatMessageDialog(value: boolean) {
        this.etatMessageService.createEtatMessageDialog = value;
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
