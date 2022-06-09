import {Component, OnInit, Input} from '@angular/core';
import {PermisService} from 'src/app/controller/service/Permis.service';
import {PermisVo} from 'src/app/controller/model/Permis.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


import {CategoriePermisVo} from 'src/app/controller/model/CategoriePermis.model';
import {CategoriePermisService} from 'src/app/controller/service/CategoriePermis.service';

@Component({
    selector: 'app-permis-edit-chercheur',
    templateUrl: './permis-edit-chercheur.component.html',
    styleUrls: ['./permis-edit-chercheur.component.css']
})
export class PermisEditChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    constructor(private datePipe: DatePipe, private permisService: PermisService
        , private stringUtilService: StringUtilService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
        , private categoriePermisService: CategoriePermisService
    ) {

    }


// methods
    ngOnInit(): void {

        this.selectedCategoriePermis = new CategoriePermisVo();
        this.categoriePermisService.findAll().subscribe((data) => this.categoriePermiss = data);
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
        this.permisService.edit().subscribe(permis => {
            const myIndex = this.permiss.findIndex(e => e.id === this.selectedPermis.id);
            this.permiss[myIndex] = this.selectedPermis;
            this.editPermisDialog = false;
            this.submitted = false;
            this.selectedPermis = new PermisVo();


        }, error => {
            console.log(error);
        });

    }

//validation methods
    private validateForm(): void {
        this.errorMessages = new Array<string>();

    }


//openPopup
    public async openCreateCategoriePermis(categoriePermis: string) {
        const isPermistted = await this.roleService.isPermitted('CategoriePermis', 'edit');
        if (isPermistted) {
            this.selectedCategoriePermis = new CategoriePermisVo();
            this.createCategoriePermisDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

// methods

    hideEditDialog() {
        this.editPermisDialog = false;
        this.setValidation(true);
    }

// getters and setters

    get permiss(): Array<PermisVo> {
        return this.permisService.permiss;
    }

    set permiss(value: Array<PermisVo>) {
        this.permisService.permiss = value;
    }

    get selectedPermis(): PermisVo {
        return this.permisService.selectedPermis;
    }

    set selectedPermis(value: PermisVo) {
        this.permisService.selectedPermis = value;
    }

    get editPermisDialog(): boolean {
        return this.permisService.createPermisDialog;

    }

    set editPermisDialog(value: boolean) {
        this.permisService.createPermisDialog = value;
    }

    get selectedCategoriePermis(): CategoriePermisVo {
        return this.categoriePermisService.selectedCategoriePermis;
    }

    set selectedCategoriePermis(value: CategoriePermisVo) {
        this.categoriePermisService.selectedCategoriePermis = value;
    }

    get categoriePermiss(): Array<CategoriePermisVo> {
        return this.categoriePermisService.categoriePermiss;
    }

    set categoriePermiss(value: Array<CategoriePermisVo>) {
        this.categoriePermisService.categoriePermiss = value;
    }

    get createCategoriePermisDialog(): boolean {
        return this.categoriePermisService.createCategoriePermisDialog;
    }

    set createCategoriePermisDialog(value: boolean) {
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
