import {Component, OnInit, Input} from '@angular/core';
import {MoniteurPratiqueService} from 'src/app/controller/service/MoniteurPratique.service';
import {MoniteurPratiqueVo} from 'src/app/controller/model/MoniteurPratique.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


import {GenderVo} from 'src/app/controller/model/Gender.model';
import {GenderService} from 'src/app/controller/service/Gender.service';

@Component({
    selector: 'app-moniteur-pratique-edit-admin',
    templateUrl: './moniteur-pratique-edit-admin.component.html',
    styleUrls: ['./moniteur-pratique-edit-admin.component.css']
})
export class MoniteurPratiqueEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    constructor(private datePipe: DatePipe, private moniteurPratiqueService: MoniteurPratiqueService
        , private stringUtilService: StringUtilService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
        , private genderService: GenderService
    ) {

    }


// methods
    ngOnInit(): void {

        this.selectedGender = new GenderVo();
        this.genderService.findAll().subscribe((data) => this.genders = data);
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
        this.moniteurPratiqueService.edit().subscribe(moniteurPratique => {
            const myIndex = this.moniteurPratiques.findIndex(e => e.id === this.selectedMoniteurPratique.id);
            this.moniteurPratiques[myIndex] = this.selectedMoniteurPratique;
            this.editMoniteurPratiqueDialog = false;
            this.submitted = false;
            this.selectedMoniteurPratique = new MoniteurPratiqueVo();


        }, error => {
            console.log(error);
        });

    }

//validation methods
    private validateForm(): void {
        this.errorMessages = new Array<string>();

    }


//openPopup
    public async openCreateGender(gender: string) {
        const isPermistted = await this.roleService.isPermitted('Gender', 'edit');
        if (isPermistted) {
            this.selectedGender = new GenderVo();
            this.createGenderDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

// methods

    hideEditDialog() {
        this.editMoniteurPratiqueDialog = false;
        this.setValidation(true);
    }

// getters and setters

    get moniteurPratiques(): Array<MoniteurPratiqueVo> {
        return this.moniteurPratiqueService.moniteurPratiques;
    }

    set moniteurPratiques(value: Array<MoniteurPratiqueVo>) {
        this.moniteurPratiqueService.moniteurPratiques = value;
    }

    get selectedMoniteurPratique(): MoniteurPratiqueVo {
        return this.moniteurPratiqueService.selectedMoniteurPratique;
    }

    set selectedMoniteurPratique(value: MoniteurPratiqueVo) {
        this.moniteurPratiqueService.selectedMoniteurPratique = value;
    }

    get editMoniteurPratiqueDialog(): boolean {
        return this.moniteurPratiqueService.editMoniteurPratiqueDialog;

    }

    set editMoniteurPratiqueDialog(value: boolean) {
        this.moniteurPratiqueService.editMoniteurPratiqueDialog = value;
    }

    get selectedGender(): GenderVo {
        return this.genderService.selectedGender;
    }

    set selectedGender(value: GenderVo) {
        this.genderService.selectedGender = value;
    }

    get genders(): Array<GenderVo> {
        return this.genderService.genders;
    }

    set genders(value: Array<GenderVo>) {
        this.genderService.genders = value;
    }

    get createGenderDialog(): boolean {
        return this.genderService.editGenderDialog;
    }

    set createGenderDialog(value: boolean) {
        this.genderService.editGenderDialog = value;
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
