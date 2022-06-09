import {Component, OnInit} from '@angular/core';
import {VehiculeService} from 'src/app/controller/service/Vehicule.service';
import {VehiculeVo} from 'src/app/controller/model/Vehicule.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {EcoleVo} from 'src/app/controller/model/Ecole.model';
import {EcoleService} from 'src/app/controller/service/Ecole.service';
import {MarqueVo} from 'src/app/controller/model/Marque.model';
import {MarqueService} from 'src/app/controller/service/Marque.service';
import {TypeVehiculeVo} from 'src/app/controller/model/TypeVehicule.model';
import {TypeVehiculeService} from 'src/app/controller/service/TypeVehicule.service';

@Component({
    selector: 'app-vehicule-view-chercheur',
    templateUrl: './vehicule-view-chercheur.component.html',
    styleUrls: ['./vehicule-view-chercheur.component.css']
})
export class VehiculeViewChercheurComponent implements OnInit {


    constructor(private datePipe: DatePipe, private vehiculeService: VehiculeService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
        , private ecoleService: EcoleService
        , private marqueService: MarqueService
        , private typeVehiculeService: TypeVehiculeService
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

    hideViewDialog() {
        this.viewVehiculeDialog = false;
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

    get viewVehiculeDialog(): boolean {
        return this.vehiculeService.viewVehiculeDialog;

    }

    set viewVehiculeDialog(value: boolean) {
        this.vehiculeService.viewVehiculeDialog = value;
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

    get editMarqueDialog(): boolean {
        return this.marqueService.editMarqueDialog;
    }

    set editMarqueDialog(value: boolean) {
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

    get editEcoleDialog(): boolean {
        return this.ecoleService.editEcoleDialog;
    }

    set editEcoleDialog(value: boolean) {
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

    get editTypeVehiculeDialog(): boolean {
        return this.typeVehiculeService.editTypeVehiculeDialog;
    }

    set editTypeVehiculeDialog(value: boolean) {
        this.typeVehiculeService.editTypeVehiculeDialog = value;
    }

    get dateFormat() {
        return environment.dateFormatView;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }
}
