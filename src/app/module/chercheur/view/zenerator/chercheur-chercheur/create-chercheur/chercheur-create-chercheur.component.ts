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
    selector: 'app-chercheur-create-chercheur',
    templateUrl: './chercheur-create-chercheur.component.html',
    styleUrls: ['./chercheur-create-chercheur.component.css']
})
export class ChercheurCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    constructor(private datePipe: DatePipe, private chercheurService: ChercheurService
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
        this.chercheurService.save().subscribe(chercheur => {
            this.chercheurs.push({...chercheur});
            this.createChercheurDialog = false;
            this.submitted = false;
            this.selectedChercheur = new ChercheurVo();


        }, error => {
            console.log(error);
        });
    }

    private validateForm(): void {
        this.errorMessages = new Array<string>();

    }


    hideCreateDialog() {
        this.createChercheurDialog = false;
        this.setValidation(true);
    }

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

    get createChercheurDialog(): boolean {
        return this.chercheurService.createChercheurDialog;

    }

    set createChercheurDialog(value: boolean) {
        this.chercheurService.createChercheurDialog = value;
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
