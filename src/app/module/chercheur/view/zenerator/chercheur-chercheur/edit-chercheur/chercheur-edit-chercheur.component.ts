import {Component, OnInit, Input} from '@angular/core';
import {ChercheurService} from 'src/app/controller/service/Chercheur.service';
import {ChercheurVo} from 'src/app/controller/model/Chercheur.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


@Component({
    selector: 'app-chercheur-edit-chercheur',
    templateUrl: './chercheur-edit-chercheur.component.html',
    styleUrls: ['./chercheur-edit-chercheur.component.css']
})
export class ChercheurEditChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    constructor(private datePipe: DatePipe, private chercheurService: ChercheurService
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
        this.chercheurService.edit().subscribe(chercheur => {
            const myIndex = this.chercheurs.findIndex(e => e.id === this.selectedChercheur.id);
            this.chercheurs[myIndex] = this.selectedChercheur;
            this.editChercheurDialog = false;
            this.submitted = false;
            this.selectedChercheur = new ChercheurVo();


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
        this.editChercheurDialog = false;
        this.setValidation(true);
    }

// getters and setters

    get chercheurs(): Array<ChercheurVo> {
        return this.chercheurService.chercheurs;
    }

    set chercheurs(value: Array<ChercheurVo>) {
        this.chercheurService.chercheurs = value;
    }

    get selectedChercheur(): ChercheurVo {
        return this.chercheurService.selectedChercheur;
    }

    set selectedChercheur(value: ChercheurVo) {
        this.chercheurService.selectedChercheur = value;
    }

    get editChercheurDialog(): boolean {
        return this.chercheurService.createChercheurDialog;

    }

    set editChercheurDialog(value: boolean) {
        this.chercheurService.createChercheurDialog = value;
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
