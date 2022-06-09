import {Component, OnInit, Input} from '@angular/core';
import {JourService} from 'src/app/controller/service/Jour.service';
import {JourVo} from 'src/app/controller/model/Jour.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


@Component({
    selector: 'app-jour-create-chercheur',
    templateUrl: './jour-create-chercheur.component.html',
    styleUrls: ['./jour-create-chercheur.component.css']
})
export class JourCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    constructor(private datePipe: DatePipe, private jourService: JourService
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
        this.jourService.save().subscribe(jour => {
            this.jours.push({...jour});
            this.createJourDialog = false;
            this.submitted = false;
            this.selectedJour = new JourVo();


        }, error => {
            console.log(error);
        });
    }

    private validateForm(): void {
        this.errorMessages = new Array<string>();

    }


    hideCreateDialog() {
        this.createJourDialog = false;
        this.setValidation(true);
    }

    get jours(): Array<JourVo> {
        return this.jourService.jours;
    }

    set jours(value: Array<JourVo>) {
        this.jourService.jours = value;
    }

    get selectedJour(): JourVo {
        return this.jourService.selectedJour;
    }

    set selectedJour(value: JourVo) {
        this.jourService.selectedJour = value;
    }

    get createJourDialog(): boolean {
        return this.jourService.createJourDialog;

    }

    set createJourDialog(value: boolean) {
        this.jourService.createJourDialog = value;
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
