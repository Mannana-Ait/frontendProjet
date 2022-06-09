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
    selector: 'app-type-vehicule-edit-chercheur',
    templateUrl: './type-vehicule-edit-chercheur.component.html',
    styleUrls: ['./type-vehicule-edit-chercheur.component.css']
})
export class TypeVehiculeEditChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    constructor(private datePipe: DatePipe, private typeVehiculeService: TypeVehiculeService
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
        this.typeVehiculeService.edit().subscribe(typeVehicule => {
            const myIndex = this.typeVehicules.findIndex(e => e.id === this.selectedTypeVehicule.id);
            this.typeVehicules[myIndex] = this.selectedTypeVehicule;
            this.editTypeVehiculeDialog = false;
            this.submitted = false;
            this.selectedTypeVehicule = new TypeVehiculeVo();


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
        this.editTypeVehiculeDialog = false;
        this.setValidation(true);
    }

// getters and setters

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

    get editTypeVehiculeDialog(): boolean {
        return this.typeVehiculeService.createTypeVehiculeDialog;

    }

    set editTypeVehiculeDialog(value: boolean) {
        this.typeVehiculeService.createTypeVehiculeDialog = value;
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
