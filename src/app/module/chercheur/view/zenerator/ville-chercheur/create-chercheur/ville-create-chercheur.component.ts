import {Component, OnInit, Input} from '@angular/core';
import {VilleService} from 'src/app/controller/service/Ville.service';
import {VilleVo} from 'src/app/controller/model/Ville.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


@Component({
    selector: 'app-ville-create-chercheur',
    templateUrl: './ville-create-chercheur.component.html',
    styleUrls: ['./ville-create-chercheur.component.css']
})
export class VilleCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    constructor(private datePipe: DatePipe, private villeService: VilleService
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
        this.villeService.save().subscribe(ville => {
            this.villes.push({...ville});
            this.createVilleDialog = false;
            this.submitted = false;
            this.selectedVille = new VilleVo();


        }, error => {
            console.log(error);
        });
    }

    private validateForm(): void {
        this.errorMessages = new Array<string>();

    }


    hideCreateDialog() {
        this.createVilleDialog = false;
        this.setValidation(true);
    }

    get villes(): Array<VilleVo> {
        return this.villeService.villes;
    }

    set villes(value: Array<VilleVo>) {
        this.villeService.villes = value;
    }

    get selectedVille(): VilleVo {
        return this.villeService.selectedVille;
    }

    set selectedVille(value: VilleVo) {
        this.villeService.selectedVille = value;
    }

    get createVilleDialog(): boolean {
        return this.villeService.createVilleDialog;

    }

    set createVilleDialog(value: boolean) {
        this.villeService.createVilleDialog = value;
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
