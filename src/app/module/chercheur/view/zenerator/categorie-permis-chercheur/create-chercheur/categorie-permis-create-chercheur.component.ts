import {Component, OnInit, Input} from '@angular/core';
import {CategoriePermisService} from 'src/app/controller/service/CategoriePermis.service';
import {CategoriePermisVo} from 'src/app/controller/model/CategoriePermis.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


@Component({
    selector: 'app-categorie-permis-create-chercheur',
    templateUrl: './categorie-permis-create-chercheur.component.html',
    styleUrls: ['./categorie-permis-create-chercheur.component.css']
})
export class CategoriePermisCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    constructor(private datePipe: DatePipe, private categoriePermisService: CategoriePermisService
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
        this.categoriePermisService.save().subscribe(categoriePermis => {
            this.categoriePermiss.push({...categoriePermis});
            this.createCategoriePermisDialog = false;
            this.submitted = false;
            this.selectedCategoriePermis = new CategoriePermisVo();


        }, error => {
            console.log(error);
        });
    }

    private validateForm(): void {
        this.errorMessages = new Array<string>();

    }


    hideCreateDialog() {
        this.createCategoriePermisDialog = false;
        this.setValidation(true);
    }

    get categoriePermiss(): Array<CategoriePermisVo> {
        return this.categoriePermisService.categoriePermiss;
    }

    set categoriePermiss(value: Array<CategoriePermisVo>) {
        this.categoriePermisService.categoriePermiss = value;
    }

    get selectedCategoriePermis(): CategoriePermisVo {
        return this.categoriePermisService.selectedCategoriePermis;
    }

    set selectedCategoriePermis(value: CategoriePermisVo) {
        this.categoriePermisService.selectedCategoriePermis = value;
    }

    get createCategoriePermisDialog(): boolean {
        return this.categoriePermisService.createCategoriePermisDialog;

    }

    set createCategoriePermisDialog(value: boolean) {
        this.categoriePermisService.createCategoriePermisDialog = value;
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
