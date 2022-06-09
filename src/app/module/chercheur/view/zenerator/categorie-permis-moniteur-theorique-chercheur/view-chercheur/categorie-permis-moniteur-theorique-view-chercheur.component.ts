import {Component, OnInit} from '@angular/core';
import {CategoriePermisMoniteurTheoriqueService} from 'src/app/controller/service/CategoriePermisMoniteurTheorique.service';
import {CategoriePermisMoniteurTheoriqueVo} from 'src/app/controller/model/CategoriePermisMoniteurTheorique.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {CategoriePermisVo} from 'src/app/controller/model/CategoriePermis.model';
import {CategoriePermisService} from 'src/app/controller/service/CategoriePermis.service';
import {MoniteurTheoriqueVo} from 'src/app/controller/model/MoniteurTheorique.model';
import {MoniteurTheoriqueService} from 'src/app/controller/service/MoniteurTheorique.service';

@Component({
  selector: 'app-categorie-permis-moniteur-theorique-view-chercheur',
  templateUrl: './categorie-permis-moniteur-theorique-view-chercheur.component.html',
  styleUrls: ['./categorie-permis-moniteur-theorique-view-chercheur.component.css']
})
export class CategoriePermisMoniteurTheoriqueViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private categoriePermisMoniteurTheoriqueService: CategoriePermisMoniteurTheoriqueService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private categoriePermisService: CategoriePermisService
    ,private moniteurTheoriqueService: MoniteurTheoriqueService
) {
}

// methods
ngOnInit(): void {
    this.selectedCategoriePermis = new CategoriePermisVo();
    this.categoriePermisService.findAll().subscribe((data) => this.categoriePermiss = data);
    this.selectedMoniteurTheorique = new MoniteurTheoriqueVo();
    this.moniteurTheoriqueService.findAll().subscribe((data) => this.moniteurTheoriques = data);
}

hideViewDialog(){
    this.viewCategoriePermisMoniteurTheoriqueDialog  = false;
}

// getters and setters

get categoriePermisMoniteurTheoriques(): Array<CategoriePermisMoniteurTheoriqueVo> {
    return this.categoriePermisMoniteurTheoriqueService.categoriePermisMoniteurTheoriques;
       }
set categoriePermisMoniteurTheoriques(value: Array<CategoriePermisMoniteurTheoriqueVo>) {
        this.categoriePermisMoniteurTheoriqueService.categoriePermisMoniteurTheoriques = value;
       }

 get selectedCategoriePermisMoniteurTheorique(): CategoriePermisMoniteurTheoriqueVo {
           return this.categoriePermisMoniteurTheoriqueService.selectedCategoriePermisMoniteurTheorique;
       }
    set selectedCategoriePermisMoniteurTheorique(value: CategoriePermisMoniteurTheoriqueVo) {
        this.categoriePermisMoniteurTheoriqueService.selectedCategoriePermisMoniteurTheorique = value;
       }

   get viewCategoriePermisMoniteurTheoriqueDialog(): boolean {
           return this.categoriePermisMoniteurTheoriqueService.viewCategoriePermisMoniteurTheoriqueDialog;

       }
    set viewCategoriePermisMoniteurTheoriqueDialog(value: boolean) {
        this.categoriePermisMoniteurTheoriqueService.viewCategoriePermisMoniteurTheoriqueDialog= value;
       }

       get selectedMoniteurTheorique(): MoniteurTheoriqueVo {
           return this.moniteurTheoriqueService.selectedMoniteurTheorique;
       }
      set selectedMoniteurTheorique(value: MoniteurTheoriqueVo) {
        this.moniteurTheoriqueService.selectedMoniteurTheorique = value;
       }
       get moniteurTheoriques():Array<MoniteurTheoriqueVo> {
           return this.moniteurTheoriqueService.moniteurTheoriques;
       }
       set moniteurTheoriques(value: Array<MoniteurTheoriqueVo>) {
        this.moniteurTheoriqueService.moniteurTheoriques = value;
       }
       get editMoniteurTheoriqueDialog(): boolean {
           return this.moniteurTheoriqueService.editMoniteurTheoriqueDialog;
       }
      set editMoniteurTheoriqueDialog(value: boolean) {
        this.moniteurTheoriqueService.editMoniteurTheoriqueDialog= value;
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
