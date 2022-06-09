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
    selector: 'app-jour-edit-chercheur',
    templateUrl: './jour-edit-chercheur.component.html',
    styleUrls: ['./jour-edit-chercheur.component.css']
})
export class JourEditChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    constructor(private datePipe: DatePipe, private jourService: JourService
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
        this.jourService.edit().subscribe(jour => {
            const myIndex = this.jours.findIndex(e => e.id === this.selectedJour.id);
            this.jours[myIndex] = this.selectedJour;
            this.editJourDialog = false;
            this.submitted = false;
            this.selectedJour = new JourVo();


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
        this.editJourDialog = false;
        this.setValidation(true);
    }

// getters and setters

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

    get editJourDialog(): boolean {
        return this.jourService.createJourDialog;

    }

    set editJourDialog(value: boolean) {
        this.jourService.createJourDialog = value;
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
