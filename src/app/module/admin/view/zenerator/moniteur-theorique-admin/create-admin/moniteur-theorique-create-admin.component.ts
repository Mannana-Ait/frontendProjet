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
    selector: 'app-moniteur-theorique-create-admin',
    templateUrl: './moniteur-theorique-create-admin.component.html',
    styleUrls: ['./moniteur-theorique-create-admin.component.css']
})
export class MoniteurTheoriqueCreateAdminComponent implements OnInit {

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


    ngOnInit(): void {

        this.selectedGender = new GenderVo();
        this.genderService.findAll().subscribe((data) => this.genders = data);
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
        this.moniteurTheoriqueService.save().subscribe(moniteurTheorique => {
            this.moniteurTheoriques.push({...moniteurTheorique});
            this.createMoniteurTheoriqueDialog = false;
            this.submitted = false;
            this.selectedMoniteurTheorique = new MoniteurTheoriqueVo();


        }, error => {
            console.log(error);
        });
    }

    private validateForm(): void {
        this.errorMessages = new Array<string>();

    }


    public async openCreateGender(gender: string) {
        const isPermistted = await this.roleService.isPermitted('Gender', 'add');
        if (isPermistted) {
            this.selectedGender = new GenderVo();
            this.createGenderDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    hideCreateDialog() {
        this.createMoniteurTheoriqueDialog = false;
        this.setValidation(true);
    }

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

    get createMoniteurTheoriqueDialog(): boolean {
        return this.moniteurTheoriqueService.createMoniteurTheoriqueDialog;

    }

    set createMoniteurTheoriqueDialog(value: boolean) {
        this.moniteurTheoriqueService.createMoniteurTheoriqueDialog = value;
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
        return this.genderService.createGenderDialog;
    }

    set createGenderDialog(value: boolean) {
        this.genderService.createGenderDialog = value;
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
