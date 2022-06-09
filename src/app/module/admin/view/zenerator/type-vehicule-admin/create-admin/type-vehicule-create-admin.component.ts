import {Component, OnInit, Input} from '@angular/core';
import {TypeVehiculeService} from 'src/app/controller/service/TypeVehicule.service';
import {TypeVehiculeVo} from 'src/app/controller/model/TypeVehicule.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


@Component({
    selector: 'app-type-vehicule-create-admin',
    templateUrl: './type-vehicule-create-admin.component.html',
    styleUrls: ['./type-vehicule-create-admin.component.css']
})
export class TypeVehiculeCreateAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    constructor(private datePipe: DatePipe, private typeVehiculeService: TypeVehiculeService
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
        this.typeVehiculeService.save().subscribe(typeVehicule => {
            this.typeVehicules.push({...typeVehicule});
            this.createTypeVehiculeDialog = false;
            this.submitted = false;
            this.selectedTypeVehicule = new TypeVehiculeVo();


        }, error => {
            console.log(error);
        });
    }

    private validateForm(): void {
        this.errorMessages = new Array<string>();

    }


    hideCreateDialog() {
        this.createTypeVehiculeDialog = false;
        this.setValidation(true);
    }

    get typeVehicules(): Array<TypeVehiculeVo> {
        return this.typeVehiculeService.typeVehicules;
    }

    set typeVehicules(value: Array<TypeVehiculeVo>) {
        this.typeVehiculeService.typeVehicules = value;
    }

    get selectedTypeVehicule(): TypeVehiculeVo {
        return this.typeVehiculeService.selectedTypeVehicule;
    }

    set selectedTypeVehicule(value: TypeVehiculeVo) {
        this.typeVehiculeService.selectedTypeVehicule = value;
    }

    get createTypeVehiculeDialog(): boolean {
        return this.typeVehiculeService.createTypeVehiculeDialog;

    }

    set createTypeVehiculeDialog(value: boolean) {
        this.typeVehiculeService.createTypeVehiculeDialog = value;
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
