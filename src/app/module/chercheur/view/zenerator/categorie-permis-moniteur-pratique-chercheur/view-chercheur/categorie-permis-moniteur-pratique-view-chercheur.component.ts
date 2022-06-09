import {Component, OnInit} from '@angular/core';
import {CategoriePermisMoniteurPratiqueService} from 'src/app/controller/service/CategoriePermisMoniteurPratique.service';
import {CategoriePermisMoniteurPratiqueVo} from 'src/app/controller/model/CategoriePermisMoniteurPratique.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {MoniteurPratiqueVo} from 'src/app/controller/model/MoniteurPratique.model';
import {MoniteurPratiqueService} from 'src/app/controller/service/MoniteurPratique.service';
import {CategoriePermisVo} from 'src/app/controller/model/CategoriePermis.model';
import {CategoriePermisService} from 'src/app/controller/service/CategoriePermis.service';

@Component({
  selector: 'app-categorie-permis-moniteur-pratique-view-chercheur',
  templateUrl: './categorie-permis-moniteur-pratique-view-chercheur.component.html',
  styleUrls: ['./categorie-permis-moniteur-pratique-view-chercheur.component.css']
})
export class CategoriePermisMoniteurPratiqueViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private categoriePermisMoniteurPratiqueService: CategoriePermisMoniteurPratiqueService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private moniteurPratiqueService: MoniteurPratiqueService
    ,private categoriePermisService: CategoriePermisService
) {
}

// methods
ngOnInit(): void {
    this.selectedCategoriePermis = new CategoriePermisVo();
    this.categoriePermisService.findAll().subscribe((data) => this.categoriePermiss = data);
    this.selectedMoniteurPratique = new MoniteurPratiqueVo();
    this.moniteurPratiqueService.findAll().subscribe((data) => this.moniteurPratiques = data);
}

hideViewDialog(){
    this.viewCategoriePermisMoniteurPratiqueDialog  = false;
}

// getters and setters

get categoriePermisMoniteurPratiques(): Array<CategoriePermisMoniteurPratiqueVo> {
    return this.categoriePermisMoniteurPratiqueService.categoriePermisMoniteurPratiques;
       }
set categoriePermisMoniteurPratiques(value: Array<CategoriePermisMoniteurPratiqueVo>) {
        this.categoriePermisMoniteurPratiqueService.categoriePermisMoniteurPratiques = value;
       }

 get selectedCategoriePermisMoniteurPratique(): CategoriePermisMoniteurPratiqueVo {
           return this.categoriePermisMoniteurPratiqueService.selectedCategoriePermisMoniteurPratique;
       }
    set selectedCategoriePermisMoniteurPratique(value: CategoriePermisMoniteurPratiqueVo) {
        this.categoriePermisMoniteurPratiqueService.selectedCategoriePermisMoniteurPratique = value;
       }

   get viewCategoriePermisMoniteurPratiqueDialog(): boolean {
           return this.categoriePermisMoniteurPratiqueService.viewCategoriePermisMoniteurPratiqueDialog;

       }
    set viewCategoriePermisMoniteurPratiqueDialog(value: boolean) {
        this.categoriePermisMoniteurPratiqueService.viewCategoriePermisMoniteurPratiqueDialog= value;
       }

       get selectedMoniteurPratique(): MoniteurPratiqueVo {
           return this.moniteurPratiqueService.selectedMoniteurPratique;
       }
      set selectedMoniteurPratique(value: MoniteurPratiqueVo) {
        this.moniteurPratiqueService.selectedMoniteurPratique = value;
       }
       get moniteurPratiques():Array<MoniteurPratiqueVo> {
           return this.moniteurPratiqueService.moniteurPratiques;
       }
       set moniteurPratiques(value: Array<MoniteurPratiqueVo>) {
        this.moniteurPratiqueService.moniteurPratiques = value;
       }
       get editMoniteurPratiqueDialog(): boolean {
           return this.moniteurPratiqueService.editMoniteurPratiqueDialog;
       }
      set editMoniteurPratiqueDialog(value: boolean) {
        this.moniteurPratiqueService.editMoniteurPratiqueDialog= value;
       }
       get selectedCategoriePermis(): CategoriePermisVo {
           return this.categoriePermisService.selectedCategoriePermis;
       }
      set selectedCategoriePermis(value: CategoriePermisVo) {
        this.categoriePermisService.selectedCategoriePermis = value;
       }
       get categoriePermiss():Array<CategoriePermisVo> {
           return this.categoriePermisService.categoriePermiss;
       }
       set categoriePermiss(value: Array<CategoriePermisVo>) {
        this.categoriePermisService.categoriePermiss = value;
       }
       get editCategoriePermisDialog(): boolean {
           return this.categoriePermisService.editCategoriePermisDialog;
       }
      set editCategoriePermisDialog(value: boolean) {
        this.categoriePermisService.editCategoriePermisDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
