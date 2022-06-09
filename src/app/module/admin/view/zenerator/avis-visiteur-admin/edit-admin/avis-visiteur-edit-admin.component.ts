import {Component, OnInit, Input} from '@angular/core';
import {AvisVisiteurService} from 'src/app/controller/service/AvisVisiteur.service';
import {AvisVisiteurVo} from 'src/app/controller/model/AvisVisiteur.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


import {TypeAvisVo} from 'src/app/controller/model/TypeAvis.model';
import {TypeAvisService} from 'src/app/controller/service/TypeAvis.service';

@Component({
    selector: 'app-avis-visiteur-edit-admin',
    templateUrl: './avis-visiteur-edit-admin.component.html',
    styleUrls: ['./avis-visiteur-edit-admin.component.css']
})
export class AvisVisiteurEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    constructor(private datePipe: DatePipe, private avisVisiteurService: AvisVisiteurService
        , private stringUtilService: StringUtilService
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
        this.avisVisiteurService.edit().subscribe(avisVisiteur => {
            const myIndex = this.avisVisiteurs.findIndex(e => e.id === this.selectedAvisVisiteur.id);
            this.avisVisiteurs[myIndex] = this.selectedAvisVisiteur;
            this.editAvisVisiteurDialog = false;
            this.submitted = false;
            this.selectedAvisVisiteur = new AvisVisiteurVo();


        }, error => {
            console.log(error);
        });

    }

//validation methods
    private validateForm(): void {
        this.errorMessages = new Array<string>();

    }


//openPopup
    public async openCreateTypeAvis(typeAvis: string) {
        const isPermistted = await this.roleService.isPermitted('TypeAvis', 'edit');
        if (isPermistted) {
            this.selectedTypeAvis = new TypeAvisVo();
            this.createTypeAvisDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

// methods

    hideEditDialog() {
        this.editAvisVisiteurDialog = false;
        this.setValidation(true);
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

    get editAvisVisiteurDialog(): boolean {
        return this.avisVisiteurService.editAvisVisiteurDialog;

    }

    set editAvisVisiteurDialog(value: boolean) {
        this.avisVisiteurService.editAvisVisiteurDialog = value;
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

    get createTypeAvisDialog(): boolean {
        return this.typeAvisService.editTypeAvisDialog;
    }

    set createTypeAvisDialog(value: boolean) {
        this.typeAvisService.editTypeAvisDialog = value;
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
