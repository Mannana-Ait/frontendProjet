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
    selector: 'app-categorie-permis-edit-chercheur',
    templateUrl: './categorie-permis-edit-chercheur.component.html',
    styleUrls: ['./categorie-permis-edit-chercheur.component.css']
})
export class CategoriePermisEditChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    constructor(private datePipe: DatePipe, private categoriePermisService: CategoriePermisService
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
        this.categoriePermisService.edit().subscribe(categoriePermis => {
            const myIndex = this.categoriePermiss.findIndex(e => e.id === this.selectedCategoriePermis.id);
            this.categoriePermiss[myIndex] = this.selectedCategoriePermis;
            this.editCategoriePermisDialog = false;
            this.submitted = false;
            this.selectedCategoriePermis = new CategoriePermisVo();


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
        this.editCategoriePermisDialog = false;
        this.setValidation(true);
    }

// getters and setters

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

    get editCategoriePermisDialog(): boolean {
        return this.categoriePermisService.createCategoriePermisDialog;

    }

    set editCategoriePermisDialog(value: boolean) {
        this.categoriePermisService.createCategoriePermisDialog = value;
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
