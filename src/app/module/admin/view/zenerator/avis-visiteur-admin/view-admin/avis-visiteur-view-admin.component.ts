import {Component, OnInit} from '@angular/core';
import {AvisVisiteurService} from 'src/app/controller/service/AvisVisiteur.service';
import {AvisVisiteurVo} from 'src/app/controller/model/AvisVisiteur.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {TypeAvisVo} from 'src/app/controller/model/TypeAvis.model';
import {TypeAvisService} from 'src/app/controller/service/TypeAvis.service';

@Component({
    selector: 'app-avis-visiteur-view-admin',
    templateUrl: './avis-visiteur-view-admin.component.html',
    styleUrls: ['./avis-visiteur-view-admin.component.css']
})
export class AvisVisiteurViewAdminComponent implements OnInit {


    constructor(private datePipe: DatePipe, private avisVisiteurService: AvisVisiteurService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
        , private typeAvisService: TypeAvisService
    ) {
    }

// methods
    ngOnInit(): void {
        this.selectedTypeAvis = new TypeAvisVo();
        this.typeAvisService.findAll().subscribe((data) => this.typeAviss = data);
    }

    hideViewDialog() {
        this.viewAvisVisiteurDialog = false;
    }

// getters and setters

    get avisVisiteurs(): Array<AvisVisiteurVo> {
        return this.avisVisiteurService.avisVisiteurs;
    }

    set avisVisiteurs(value: Array<AvisVisiteurVo>) {
        this.avisVisiteurService.avisVisiteurs = value;
    }

    get selectedAvisVisiteur(): AvisVisiteurVo {
        return this.avisVisiteurService.selectedAvisVisiteur;
    }

    set selectedAvisVisiteur(value: AvisVisiteurVo) {
        this.avisVisiteurService.selectedAvisVisiteur = value;
    }

    get viewAvisVisiteurDialog(): boolean {
        return this.avisVisiteurService.viewAvisVisiteurDialog;

    }

    set viewAvisVisiteurDialog(value: boolean) {
        this.avisVisiteurService.viewAvisVisiteurDialog = value;
    }

    get selectedTypeAvis(): TypeAvisVo {
        return this.typeAvisService.selectedTypeAvis;
    }

    set selectedTypeAvis(value: TypeAvisVo) {
        this.typeAvisService.selectedTypeAvis = value;
    }

    get typeAviss(): Array<TypeAvisVo> {
        return this.typeAvisService.typeAviss;
    }

    set typeAviss(value: Array<TypeAvisVo>) {
        this.typeAvisService.typeAviss = value;
    }

    get editTypeAvisDialog(): boolean {
        return this.typeAvisService.editTypeAvisDialog;
    }

    set editTypeAvisDialog(value: boolean) {
        this.typeAvisService.editTypeAvisDialog = value;
    }

    get dateFormat() {
        return environment.dateFormatView;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }
}
