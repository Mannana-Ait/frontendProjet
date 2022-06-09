import {Component, OnInit} from '@angular/core';
import {PermisService} from 'src/app/controller/service/Permis.service';
import {PermisVo} from 'src/app/controller/model/Permis.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {CategoriePermisVo} from 'src/app/controller/model/CategoriePermis.model';
import {CategoriePermisService} from 'src/app/controller/service/CategoriePermis.service';

@Component({
    selector: 'app-permis-view-chercheur',
    templateUrl: './permis-view-chercheur.component.html',
    styleUrls: ['./permis-view-chercheur.component.css']
})
export class PermisViewChercheurComponent implements OnInit {


    constructor(private datePipe: DatePipe, private permisService: PermisService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
        , private categoriePermisService: CategoriePermisService
    ) {
    }

// methods
    ngOnInit(): void {
        this.selectedCategoriePermis = new CategoriePermisVo();
        this.categoriePermisService.findAll().subscribe((data) => this.categoriePermiss = data);
    }

    hideViewDialog() {
        this.viewPermisDialog = false;
    }

// getters and setters

    get permiss(): Array<PermisVo> {
        return this.permisService.permiss;
    }

    set permiss(value: Array<PermisVo>) {
        this.permisService.permiss = value;
    }

    get selectedPermis(): PermisVo {
        return this.permisService.selectedPermis;
    }

    set selectedPermis(value: PermisVo) {
        this.permisService.selectedPermis = value;
    }

    get viewPermisDialog(): boolean {
        return this.permisService.viewPermisDialog;

    }

    set viewPermisDialog(value: boolean) {
        this.permisService.viewPermisDialog = value;
    }

    get selectedCategoriePermis(): CategoriePermisVo {
        return this.categoriePermisService.selectedCategoriePermis;
    }

    set selectedCategoriePermis(value: CategoriePermisVo) {
        this.categoriePermisService.selectedCategoriePermis = value;
    }

    get categoriePermiss(): Array<CategoriePermisVo> {
        return this.categoriePermisService.categoriePermiss;
    }

    set categoriePermiss(value: Array<CategoriePermisVo>) {
        this.categoriePermisService.categoriePermiss = value;
    }

    get editCategoriePermisDialog(): boolean {
        return this.categoriePermisService.editCategoriePermisDialog;
    }

    set editCategoriePermisDialog(value: boolean) {
        this.categoriePermisService.editCategoriePermisDialog = value;
    }

    get dateFormat() {
        return environment.dateFormatView;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }
}
