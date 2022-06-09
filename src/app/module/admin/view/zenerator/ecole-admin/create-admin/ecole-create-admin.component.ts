import {Component, OnInit, Input} from '@angular/core';
import {EcoleService} from 'src/app/controller/service/Ecole.service';
import {EcoleVo} from 'src/app/controller/model/Ecole.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


import {GenderVo} from 'src/app/controller/model/Gender.model';
import {GenderService} from 'src/app/controller/service/Gender.service';
import {GerantVo} from 'src/app/controller/model/Gerant.model';
import {GerantService} from 'src/app/controller/service/Gerant.service';
import {TypeVehiculeVo} from 'src/app/controller/model/TypeVehicule.model';
import {TypeVehiculeService} from 'src/app/controller/service/TypeVehicule.service';
import {VehiculeVo} from 'src/app/controller/model/Vehicule.model';
import {VehiculeService} from 'src/app/controller/service/Vehicule.service';
import {PlanningItemVo} from 'src/app/controller/model/PlanningItem.model';
import {PlanningItemService} from 'src/app/controller/service/PlanningItem.service';
import {MarqueVo} from 'src/app/controller/model/Marque.model';
import {MarqueService} from 'src/app/controller/service/Marque.service';
import {VilleVo} from 'src/app/controller/model/Ville.model';
import {VilleService} from 'src/app/controller/service/Ville.service';
import {MoniteurPratiqueVo} from 'src/app/controller/model/MoniteurPratique.model';
import {MoniteurPratiqueService} from 'src/app/controller/service/MoniteurPratique.service';
import {MoniteurTheoriqueVo} from 'src/app/controller/model/MoniteurTheorique.model';
import {MoniteurTheoriqueService} from 'src/app/controller/service/MoniteurTheorique.service';
import {JourVo} from 'src/app/controller/model/Jour.model';
import {JourService} from 'src/app/controller/service/Jour.service';

@Component({
    selector: 'app-ecole-create-admin',
    templateUrl: './ecole-create-admin.component.html',
    styleUrls: ['./ecole-create-admin.component.css']
})
export class EcoleCreateAdminComponent implements OnInit {

    selectedVehicules: VehiculeVo = new VehiculeVo();
    selectedMoniteurTheoriques: MoniteurTheoriqueVo = new MoniteurTheoriqueVo();
    selectedMoniteurPratiques: MoniteurPratiqueVo = new MoniteurPratiqueVo();
    selectedPlanningItems: PlanningItemVo = new PlanningItemVo();
    _submitted = false;
    private _errorMessages = new Array<string>();


    constructor(private datePipe: DatePipe, private ecoleService: EcoleService
        , private stringUtilService: StringUtilService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
        , private genderService: GenderService
        , private vehiculeService: VehiculeService
        , private villeService: VilleService
        , private gerantService: GerantService
        , private planningItemService: PlanningItemService
        , private jourService: JourService
        , private typeVehiculeService: TypeVehiculeService
        , private moniteurPratiqueService: MoniteurPratiqueService
        , private marqueService: MarqueService
        , private moniteurTheoriqueService: MoniteurTheoriqueService
    ) {

    }


    ngOnInit(): void {


        this.selectedVehicules.marqueVo = new MarqueVo();
        this.marqueService.findAll().subscribe((data) => this.marques = data);
        this.selectedVehicules.typeVehiculeVo = new TypeVehiculeVo();
        this.typeVehiculeService.findAll().subscribe((data) => this.typeVehicules = data);


        this.selectedMoniteurTheoriques.genderVo = new GenderVo();
        this.genderService.findAll().subscribe((data) => this.genders = data);


        this.selectedMoniteurPratiques.genderVo = new GenderVo();
        this.genderService.findAll().subscribe((data) => this.genders = data);


        this.selectedPlanningItems.jourVo = new JourVo();
        this.jourService.findAll().subscribe((data) => this.jours = data);


        this.selectedVille = new VilleVo();
        this.villeService.findAll().subscribe((data) => this.villes = data);
        this.selectedGerant = new GerantVo();
        this.gerantService.findAll().subscribe((data) => this.gerants = data);
    }


    validateVehicules() {
        this.errorMessages = new Array();
    }

    validateMoniteurTheoriques() {
        this.errorMessages = new Array();
    }

    validateMoniteurPratiques() {
        this.errorMessages = new Array();
    }

    validatePlanningItems() {
        this.errorMessages = new Array();
    }


    private setValidation(value: boolean) {
    }

    addVehicules() {
        if (this.selectedEcole.vehiculesVo == null) {
            this.selectedEcole.vehiculesVo = new Array<VehiculeVo>();
        }
        this.validateVehicules();
        if (this.errorMessages.length === 0) {
            this.selectedEcole.vehiculesVo.push(this.selectedVehicules);
            this.selectedVehicules = new VehiculeVo();
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
    }

    deleteVehicules(p: VehiculeVo) {
        this.selectedEcole.vehiculesVo.forEach((element, index) => {
            if (element === p) {
                this.selectedEcole.vehiculesVo.splice(index, 1);
            }
        });
    }

    addMoniteurTheoriques() {
        if (this.selectedEcole.moniteurTheoriquesVo == null) {
            this.selectedEcole.moniteurTheoriquesVo = new Array<MoniteurTheoriqueVo>();
        }
        this.validateMoniteurTheoriques();
        if (this.errorMessages.length === 0) {
            this.selectedEcole.moniteurTheoriquesVo.push(this.selectedMoniteurTheoriques);
            this.selectedMoniteurTheoriques = new MoniteurTheoriqueVo();
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
    }

    deleteMoniteurTheoriques(p: MoniteurTheoriqueVo) {
        this.selectedEcole.moniteurTheoriquesVo.forEach((element, index) => {
            if (element === p) {
                this.selectedEcole.moniteurTheoriquesVo.splice(index, 1);
            }
        });
    }

    addMoniteurPratiques() {
        if (this.selectedEcole.moniteurPratiquesVo == null) {
            this.selectedEcole.moniteurPratiquesVo = new Array<MoniteurPratiqueVo>();
        }
        this.validateMoniteurPratiques();
        if (this.errorMessages.length === 0) {
            this.selectedEcole.moniteurPratiquesVo.push(this.selectedMoniteurPratiques);
            this.selectedMoniteurPratiques = new MoniteurPratiqueVo();
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
    }

    deleteMoniteurPratiques(p: MoniteurPratiqueVo) {
        this.selectedEcole.moniteurPratiquesVo.forEach((element, index) => {
            if (element === p) {
                this.selectedEcole.moniteurPratiquesVo.splice(index, 1);
            }
        });
    }

    addPlanningItems() {
        if (this.selectedEcole.planningItemsVo == null) {
            this.selectedEcole.planningItemsVo = new Array<PlanningItemVo>();
        }
        this.validatePlanningItems();
        if (this.errorMessages.length === 0) {
            this.selectedEcole.planningItemsVo.push(this.selectedPlanningItems);
            this.selectedPlanningItems = new PlanningItemVo();
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Erreurs',
                detail: 'Merci de corrigé les erreurs suivant : ' + this.errorMessages
            });
        }
    }

    deletePlanningItems(p: PlanningItemVo) {
        this.selectedEcole.planningItemsVo.forEach((element, index) => {
            if (element === p) {
                this.selectedEcole.planningItemsVo.splice(index, 1);
            }
        });
    }

    public save() {
        this.submitted = true;
        this.validateForm();
        if (this.errorMessages.length === 0) {
            this.saveWithShowOption(false);
        } else {
            this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire'});
        }
    }

    public saveWithShowOption(showList: boolean) {
        this.ecoleService.save().subscribe(ecole => {
            this.ecoles.push({...ecole});
            this.createEcoleDialog = false;
            this.submitted = false;
            this.selectedEcole = new EcoleVo();


        }, error => {
            console.log(error);
        });
    }

    private validateForm(): void {
        this.errorMessages = new Array<string>();

    }


    public async openCreateVille(ville: string) {
        const isPermistted = await this.roleService.isPermitted('Ville', 'add');
        if (isPermistted) {
            this.selectedVille = new VilleVo();
            this.createVilleDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    public async openCreateGender(gender: string) {
        const isPermistted = await this.roleService.isPermitted('Gender', 'add');
        if (isPermistted) {
            this.selectedGender = new GenderVo();
            this.createGenderDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    public async openCreateMarque(marque: string) {
        const isPermistted = await this.roleService.isPermitted('Marque', 'add');
        if (isPermistted) {
            this.selectedMarque = new MarqueVo();
            this.createMarqueDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    public async openCreateGerant(gerant: string) {
        const isPermistted = await this.roleService.isPermitted('Gerant', 'add');
        if (isPermistted) {
            this.selectedGerant = new GerantVo();
            this.createGerantDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    public async openCreateTypeVehicule(typeVehicule: string) {
        const isPermistted = await this.roleService.isPermitted('TypeVehicule', 'add');
        if (isPermistted) {
            this.selectedTypeVehicule = new TypeVehiculeVo();
            this.createTypeVehiculeDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    public async openCreateJour(jour: string) {
        const isPermistted = await this.roleService.isPermitted('Jour', 'add');
        if (isPermistted) {
            this.selectedJour = new JourVo();
            this.createJourDialog = true;
        } else {
            this.messageService.add({
                severity: 'error', summary: 'erreur', detail: 'problème de permission'
            });
        }
    }

    hideCreateDialog() {
        this.createEcoleDialog = false;
        this.setValidation(true);
    }

    get ecoles(): Array<EcoleVo> {
        return this.ecoleService.ecoles;
    }

    set ecoles(value: Array<EcoleVo>) {
        this.ecoleService.ecoles = value;
    }

    get selectedEcole(): EcoleVo {
        return this.ecoleService.selectedEcole;
    }

    set selectedEcole(value: EcoleVo) {
        this.ecoleService.selectedEcole = value;
    }

    get createEcoleDialog(): boolean {
        return this.ecoleService.createEcoleDialog;

    }

    set createEcoleDialog(value: boolean) {
        this.ecoleService.createEcoleDialog = value;
    }

    get selectedVille(): VilleVo {
        return this.villeService.selectedVille;
    }

    set selectedVille(value: VilleVo) {
        this.villeService.selectedVille = value;
    }

    get villes(): Array<VilleVo> {
        return this.villeService.villes;
    }

    set villes(value: Array<VilleVo>) {
        this.villeService.villes = value;
    }

    get createVilleDialog(): boolean {
        return this.villeService.createVilleDialog;
    }

    set createVilleDialog(value: boolean) {
        this.villeService.createVilleDialog = value;
    }

    get selectedGender(): GenderVo {
        return this.genderService.selectedGender;
    }

    set selectedGender(value: GenderVo) {
        this.genderService.selectedGender = value;
    }

    get genders(): Array<GenderVo> {
        return this.genderService.genders;
    }

    set genders(value: Array<GenderVo>) {
        this.genderService.genders = value;
    }

    get createGenderDialog(): boolean {
        return this.genderService.createGenderDialog;
    }

    set createGenderDialog(value: boolean) {
        this.genderService.createGenderDialog = value;
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
        return this.marqueService.createMarqueDialog;
    }

    set createMarqueDialog(value: boolean) {
        this.marqueService.createMarqueDialog = value;
    }

    get selectedGerant(): GerantVo {
        return this.gerantService.selectedGerant;
    }

    set selectedGerant(value: GerantVo) {
        this.gerantService.selectedGerant = value;
    }

    get gerants(): Array<GerantVo> {
        return this.gerantService.gerants;
    }

    set gerants(value: Array<GerantVo>) {
        this.gerantService.gerants = value;
    }

    get createGerantDialog(): boolean {
        return this.gerantService.createGerantDialog;
    }

    set createGerantDialog(value: boolean) {
        this.gerantService.createGerantDialog = value;
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
        return this.typeVehiculeService.createTypeVehiculeDialog;
    }

    set createTypeVehiculeDialog(value: boolean) {
        this.typeVehiculeService.createTypeVehiculeDialog = value;
    }

    get selectedJour(): JourVo {
        return this.jourService.selectedJour;
    }

    set selectedJour(value: JourVo) {
        this.jourService.selectedJour = value;
    }

    get jours(): Array<JourVo> {
        return this.jourService.jours;
    }

    set jours(value: Array<JourVo>) {
        this.jourService.jours = value;
    }

    get createJourDialog(): boolean {
        return this.jourService.createJourDialog;
    }

    set createJourDialog(value: boolean) {
        this.jourService.createJourDialog = value;
    }

    get dateFormat() {
        return environment.dateFormatCreate;
    }

    get dateFormatColumn() {
        return environment.dateFormatCreate;
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
