import {Component, OnInit} from '@angular/core';
import {TypeVehiculeService} from 'src/app/controller/service/TypeVehicule.service';
import {TypeVehiculeVo} from 'src/app/controller/model/TypeVehicule.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-type-vehicule-view-chercheur',
    templateUrl: './type-vehicule-view-chercheur.component.html',
    styleUrls: ['./type-vehicule-view-chercheur.component.css']
})
export class TypeVehiculeViewChercheurComponent implements OnInit {


    constructor(private datePipe: DatePipe, private typeVehiculeService: TypeVehiculeService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
    ) {
    }

// methods
    ngOnInit(): void {
    }

    hideViewDialog() {
        this.viewTypeVehiculeDialog = false;
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

    get viewTypeVehiculeDialog(): boolean {
        return this.typeVehiculeService.viewTypeVehiculeDialog;

    }

    set viewTypeVehiculeDialog(value: boolean) {
        this.typeVehiculeService.viewTypeVehiculeDialog = value;
    }


    get dateFormat() {
        return environment.dateFormatView;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }
}
