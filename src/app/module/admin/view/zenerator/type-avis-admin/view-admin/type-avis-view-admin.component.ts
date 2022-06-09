import {Component, OnInit} from '@angular/core';
import {TypeAvisService} from 'src/app/controller/service/TypeAvis.service';
import {TypeAvisVo} from 'src/app/controller/model/TypeAvis.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-type-avis-view-admin',
    templateUrl: './type-avis-view-admin.component.html',
    styleUrls: ['./type-avis-view-admin.component.css']
})
export class TypeAvisViewAdminComponent implements OnInit {


    constructor(private datePipe: DatePipe, private typeAvisService: TypeAvisService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
    ) {
    }

// methods
    ngOnInit(): void {
    }

    hideViewDialog() {
        this.viewTypeAvisDialog = false;
    }

// getters and setters

    get typeAviss(): Array<TypeAvisVo> {
        return this.typeAvisService.typeAviss;
    }

    set typeAviss(value: Array<TypeAvisVo>) {
        this.typeAvisService.typeAviss = value;
    }

    get selectedTypeAvis(): TypeAvisVo {
        return this.typeAvisService.selectedTypeAvis;
    }

    set selectedTypeAvis(value: TypeAvisVo) {
        this.typeAvisService.selectedTypeAvis = value;
    }

    get viewTypeAvisDialog(): boolean {
        return this.typeAvisService.viewTypeAvisDialog;

    }

    set viewTypeAvisDialog(value: boolean) {
        this.typeAvisService.viewTypeAvisDialog = value;
    }


    get dateFormat() {
        return environment.dateFormatView;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }
}
