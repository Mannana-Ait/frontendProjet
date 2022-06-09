import {Component, OnInit} from '@angular/core';
import {EcoleService} from 'src/app/controller/service/Ecole.service';
import {EcoleVo} from 'src/app/controller/model/Ecole.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {JourVo} from 'src/app/controller/model/Jour.model';
import {JourService} from 'src/app/controller/service/Jour.service';
import {VehiculeVo} from 'src/app/controller/model/Vehicule.model';
import {VehiculeService} from 'src/app/controller/service/Vehicule.service';
import {PlanningItemVo} from 'src/app/controller/model/PlanningItem.model';
import {PlanningItemService} from 'src/app/controller/service/PlanningItem.service';
import {TypeVehiculeVo} from 'src/app/controller/model/TypeVehicule.model';
import {TypeVehiculeService} from 'src/app/controller/service/TypeVehicule.service';
import {GenderVo} from 'src/app/controller/model/Gender.model';
import {GenderService} from 'src/app/controller/service/Gender.service';
import {MoniteurPratiqueVo} from 'src/app/controller/model/MoniteurPratique.model';
import {MoniteurPratiqueService} from 'src/app/controller/service/MoniteurPratique.service';
import {MoniteurTheoriqueVo} from 'src/app/controller/model/MoniteurTheorique.model';
import {MoniteurTheoriqueService} from 'src/app/controller/service/MoniteurTheorique.service';
import {VilleVo} from 'src/app/controller/model/Ville.model';
import {VilleService} from 'src/app/controller/service/Ville.service';
import {GerantVo} from 'src/app/controller/model/Gerant.model';
import {GerantService} from 'src/app/controller/service/Gerant.service';
import {MarqueVo} from 'src/app/controller/model/Marque.model';
import {MarqueService} from 'src/app/controller/service/Marque.service';

@Component({
    selector: 'app-ecole-view-admin',
    templateUrl: './ecole-view-admin.component.html',
    styleUrls: ['./ecole-view-admin.component.css']
})
export class EcoleViewAdminComponent implements OnInit {

    selectedVehicules: VehiculeVo = new VehiculeVo();
    vehiculesListe: Array<VehiculeVo> = [];

    myMarques: Array<MarqueVo> = [];
    myTypeVehicules: Array<TypeVehiculeVo> = [];

    selectedMoniteurTheoriques: MoniteurTheoriqueVo = new MoniteurTheoriqueVo();
    moniteurTheoriquesListe: Array<MoniteurTheoriqueVo> = [];

    myGenders: Array<GenderVo> = [];

    selectedMoniteurPratiques: MoniteurPratiqueVo = new MoniteurPratiqueVo();
    moniteurPratiquesListe: Array<MoniteurPratiqueVo> = [];


    selectedPlanningItems: PlanningItemVo = new PlanningItemVo();
    planningItemsListe: Array<PlanningItemVo> = [];

    myJours: Array<JourVo> = [];


    constructor(private datePipe: DatePipe, private ecoleService: EcoleService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
        , private jourService: JourService
        , private vehiculeService: VehiculeService
        , private planningItemService: PlanningItemService
        , private typeVehiculeService: TypeVehiculeService
        , private genderService: GenderService
        , private moniteurPratiqueService: MoniteurPratiqueService
        , private moniteurTheoriqueService: MoniteurTheoriqueService
        , private villeService: VilleService
        , private gerantService: GerantService
        , private marqueService: MarqueService
    ) {
    }

// methods
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

    hideViewDialog() {
        this.viewEcoleDialog = false;
    }

// getters and setters

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

    get viewEcoleDialog(): boolean {
        return this.ecoleService.viewEcoleDialog;

    }

    set viewEcoleDialog(value: boolean) {
        this.ecoleService.viewEcoleDialog = value;
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

    get editVilleDialog(): boolean {
        return this.villeService.editVilleDialog;
    }

    set editVilleDialog(value: boolean) {
        this.villeService.editVilleDialog = value;
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

    get editGenderDialog(): boolean {
        return this.genderService.editGenderDialog;
    }

    set editGenderDialog(value: boolean) {
        this.genderService.editGenderDialog = value;
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

    get editGerantDialog(): boolean {
        return this.gerantService.editGerantDialog;
    }

    set editGerantDialog(value: boolean) {
        this.gerantService.editGerantDialog = value;
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

    get editJourDialog(): boolean {
        return this.jourService.editJourDialog;
    }

    set editJourDialog(value: boolean) {
        this.jourService.editJourDialog = value;
    }

    get dateFormat() {
        return environment.dateFormatView;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }
}
