import {Component, OnInit, Input} from '@angular/core';
import {VehiculeService} from 'src/app/controller/service/Vehicule.service';
import {VehiculeVo} from 'src/app/controller/model/Vehicule.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


import {TypeVehiculeVo} from 'src/app/controller/model/TypeVehicule.model';
import {TypeVehiculeService} from 'src/app/controller/service/TypeVehicule.service';
import {EcoleVo} from 'src/app/controller/model/Ecole.model';
import {EcoleService} from 'src/app/controller/service/Ecole.service';
import {MarqueVo} from 'src/app/controller/model/Marque.model';
import {MarqueService} from 'src/app/controller/service/Marque.service';

@Component({
    selector: 'app-vehicule-edit-admin',
    templateUrl: './vehicule-edit-admin.component.html',
    styleUrls: ['./vehicule-edit-admin.component.css']
})
export class VehiculeEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    constructor(private datePipe: DatePipe, private vehiculeService: VehiculeService
        , private stringUtilService: StringUtilService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
        , private typeVehiculeService: TypeVehiculeService
        , private ecoleService: EcoleService
        , private marqueService: MarqueService
    ) {

    }


// methods
    ngOnInit(): void {

        this.selectedMarque = new MarqueVo();
        this.marqueService.findAll().subscribe((data) => this.marques = data);
        this.selectedTypeVehicule = new TypeVehiculeVo();
        this.typeVehiculeService.findAll().subscribe((data) => this.typeVehicules = data);
        this.selectedEcole = new EcoleVo();
        this.ecoleService.findAll().subscribe((data) => this.ecoles = data);
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
        this.vehiculeService.edit().subscribe(vehicule => {
            const myIndex = this.vehicules.findIndex(e => e.id === this.selectedVehicule.id);
            this.vehicules[myIndex] = this.selectedVehicule;
            this.editVehiculeDialog = false;
            this.submitted = false;
            this.selectedVehicule = new VehiculeVo();


        }, error => {
            console.log(error);
        });

    }

//validation methods
    private validateForm(): void {
        this.errorMessages = new Array<string>();

    }


//openPopup
    public async openCreateMarque(marque: string) {
        const isPermistted = await this.roleService.isPermitted('Marque', 'edit');
        if (isPermistted) {
            this.selectedMarque = new MarqueVo();
            this.createMarqueDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    public async openCreateEcole(ecole: string) {
        const isPermistted = await this.roleService.isPermitted('Ecole', 'edit');
        if (isPermistted) {
            this.selectedEcole = new EcoleVo();
            this.createEcoleDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    public async openCreateTypeVehicule(typeVehicule: string) {
        const isPermistted = await this.roleService.isPermitted('TypeVehicule', 'edit');
        if (isPermistted) {
            this.selectedTypeVehicule = new TypeVehiculeVo();
            this.createTypeVehiculeDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

// methods

    hideEditDialog() {
        this.editVehiculeDialog = false;
        this.setValidation(true);
    }

// getters and setters

    get vehicules(): Array<VehiculeVo> {
        return this.vehiculeService.vehicules;
    }

    set vehicules(value: Array<VehiculeVo>) {
        this.vehiculeService.vehicules = value;
    }

    get selectedVehicule(): VehiculeVo {
        return this.vehiculeService.selectedVehicule;
    }

    set selectedVehicule(value: VehiculeVo) {
        this.vehiculeService.selectedVehicule = value;
    }

    get editVehiculeDialog(): boolean {
        return this.vehiculeService.editVehiculeDialog;

    }

    set editVehiculeDialog(value: boolean) {
        this.vehiculeService.editVehiculeDialog = value;
    }

    get selectedMarque(): MarqueVo {
        return this.marqueService.selectedMarque;
    }

    set selectedMarque(value: MarqueVo) {
        this.marqueService.selectedMarque = value;
    }

    get marques(): Array<MarqueVo> {
        return this.marqueService.marques;
    }

    set marques(value: Array<MarqueVo>) {
        this.marqueService.marques = value;
    }

    get createMarqueDialog(): boolean {
        return this.marqueService.editMarqueDialog;
    }

    set createMarqueDialog(value: boolean) {
        this.marqueService.editMarqueDialog = value;
    }

    get selectedEcole(): EcoleVo {
        return this.ecoleService.selectedEcole;
    }

    set selectedEcole(value: EcoleVo) {
        this.ecoleService.selectedEcole = value;
    }

    get ecoles(): Array<EcoleVo> {
        return this.ecoleService.ecoles;
    }

    set ecoles(value: Array<EcoleVo>) {
        this.ecoleService.ecoles = value;
    }

    get createEcoleDialog(): boolean {
        return this.ecoleService.editEcoleDialog;
    }

    set createEcoleDialog(value: boolean) {
        this.ecoleService.editEcoleDialog = value;
    }

    get selectedTypeVehicule(): TypeVehiculeVo {
        return this.typeVehiculeService.selectedTypeVehicule;
    }

    set selectedTypeVehicule(value: TypeVehiculeVo) {
        this.typeVehiculeService.selectedTypeVehicule = value;
    }

    get typeVehicules(): Array<TypeVehiculeVo> {
        return this.typeVehiculeService.typeVehicules;
    }

    set typeVehicules(value: Array<TypeVehiculeVo>) {
        this.typeVehiculeService.typeVehicules = value;
    }

    get createTypeVehiculeDialog(): boolean {
        return this.typeVehiculeService.editTypeVehiculeDialog;
    }

    set createTypeVehiculeDialog(value: boolean) {
        this.typeVehiculeService.editTypeVehiculeDialog = value;
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
