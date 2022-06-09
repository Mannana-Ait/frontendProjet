import {Component, OnInit} from '@angular/core';
import {CategoriePermisService} from 'src/app/controller/service/CategoriePermis.service';
import {CategoriePermisVo} from 'src/app/controller/model/CategoriePermis.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-categorie-permis-view-chercheur',
    templateUrl: './categorie-permis-view-chercheur.component.html',
    styleUrls: ['./categorie-permis-view-chercheur.component.css']
})
export class CategoriePermisViewChercheurComponent implements OnInit {


    constructor(private datePipe: DatePipe, private categoriePermisService: CategoriePermisService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
    ) {
    }

// methods
    ngOnInit(): void {
    }

    hideViewDialog() {
        this.viewCategoriePermisDialog = false;
    }

// getters and setters

    get categoriePermiss(): Array<CategoriePermisVo> {
        return this.categoriePermisService.categoriePermiss;
    }

    set categoriePermiss(value: Array<CategoriePermisVo>) {
        this.categoriePermisService.categoriePermiss = value;
    }

    get selectedCategoriePermis(): CategoriePermisVo {
        return this.categoriePermisService.selectedCategoriePermis;
    }

    set selectedCategoriePermis(value: CategoriePermisVo) {
        this.categoriePermisService.selectedCategoriePermis = value;
    }

    get viewCategoriePermisDialog(): boolean {
        return this.categoriePermisService.viewCategoriePermisDialog;

    }

    set viewCategoriePermisDialog(value: boolean) {
        this.categoriePermisService.viewCategoriePermisDialog = value;
    }


    get dateFormat() {
        return environment.dateFormatView;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }
}
