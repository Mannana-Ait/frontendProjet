import {Component, OnInit, Input} from '@angular/core';
import {GerantService} from 'src/app/controller/service/Gerant.service';
import {GerantVo} from 'src/app/controller/model/Gerant.model';
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
    selector: 'app-gerant-create-admin',
    templateUrl: './gerant-create-admin.component.html',
    styleUrls: ['./gerant-create-admin.component.css']
})
export class GerantCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    constructor(private datePipe: DatePipe, private gerantService: GerantService
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
        this.gerantService.save().subscribe(gerant => {
            this.gerants.push({...gerant});
            this.createGerantDialog = false;
            this.submitted = false;
            this.selectedGerant = new GerantVo();


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
        this.createGerantDialog = false;
        this.setValidation(true);
    }

    get gerants(): Array<GerantVo> {
        return this.gerantService.gerants;
    }

    set gerants(value: Array<GerantVo>) {
        this.gerantService.gerants = value;
    }

    get selectedGerant(): GerantVo {
        return this.gerantService.selectedGerant;
    }

    set selectedGerant(value: GerantVo) {
        this.gerantService.selectedGerant = value;
    }

    get createGerantDialog(): boolean {
        return this.gerantService.createGerantDialog;

    }

    set createGerantDialog(value: boolean) {
        this.gerantService.createGerantDialog = value;
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
