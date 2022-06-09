import {Component, OnInit, Input} from '@angular/core';
import {MoniteurTheoriqueService} from 'src/app/controller/service/MoniteurTheorique.service';
import {MoniteurTheoriqueVo} from 'src/app/controller/model/MoniteurTheorique.model';
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
    selector: 'app-moniteur-theorique-edit-admin',
    templateUrl: './moniteur-theorique-edit-admin.component.html',
    styleUrls: ['./moniteur-theorique-edit-admin.component.css']
})
export class MoniteurTheoriqueEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    constructor(private datePipe: DatePipe, private moniteurTheoriqueService: MoniteurTheoriqueService
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
        this.moniteurTheoriqueService.edit().subscribe(moniteurTheorique => {
            const myIndex = this.moniteurTheoriques.findIndex(e => e.id === this.selectedMoniteurTheorique.id);
            this.moniteurTheoriques[myIndex] = this.selectedMoniteurTheorique;
            this.editMoniteurTheoriqueDialog = false;
            this.submitted = false;
            this.selectedMoniteurTheorique = new MoniteurTheoriqueVo();


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
        this.editMoniteurTheoriqueDialog = false;
        this.setValidation(true);
    }

// getters and setters

    get moniteurTheoriques(): Array<MoniteurTheoriqueVo> {
        return this.moniteurTheoriqueService.moniteurTheoriques;
    }

    set moniteurTheoriques(value: Array<MoniteurTheoriqueVo>) {
        this.moniteurTheoriqueService.moniteurTheoriques = value;
    }

    get selectedMoniteurTheorique(): MoniteurTheoriqueVo {
        return this.moniteurTheoriqueService.selectedMoniteurTheorique;
    }

    set selectedMoniteurTheorique(value: MoniteurTheoriqueVo) {
        this.moniteurTheoriqueService.selectedMoniteurTheorique = value;
    }

    get editMoniteurTheoriqueDialog(): boolean {
        return this.moniteurTheoriqueService.editMoniteurTheoriqueDialog;

    }

    set editMoniteurTheoriqueDialog(value: boolean) {
        this.moniteurTheoriqueService.editMoniteurTheoriqueDialog = value;
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
