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
    selector: 'app-etat-message-create-admin',
    templateUrl: './etat-message-create-admin.component.html',
    styleUrls: ['./etat-message-create-admin.component.css']
})
export class EtatMessageCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    constructor(private datePipe: DatePipe, private etatMessageService: EtatMessageService
        , private stringUtilService: StringUtilService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
    ) {

    }


    ngOnInit(): void {

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
        this.etatMessageService.save().subscribe(etatMessage => {
            this.etatMessages.push({...etatMessage});
            this.createEtatMessageDialog = false;
            this.submitted = false;
            this.selectedEtatMessage = new EtatMessageVo();


        }, error => {
            console.log(error);
        });
    }

    private validateForm(): void {
        this.errorMessages = new Array<string>();

    }


    hideCreateDialog() {
        this.createEtatMessageDialog = false;
        this.setValidation(true);
    }

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
