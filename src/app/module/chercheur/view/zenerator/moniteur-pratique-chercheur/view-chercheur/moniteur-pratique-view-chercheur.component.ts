import {Component, OnInit} from '@angular/core';
import {MoniteurPratiqueService} from 'src/app/controller/service/MoniteurPratique.service';
import {MoniteurPratiqueVo} from 'src/app/controller/model/MoniteurPratique.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {GenderVo} from 'src/app/controller/model/Gender.model';
import {GenderService} from 'src/app/controller/service/Gender.service';

@Component({
    selector: 'app-moniteur-pratique-view-chercheur',
    templateUrl: './moniteur-pratique-view-chercheur.component.html',
    styleUrls: ['./moniteur-pratique-view-chercheur.component.css']
})
export class MoniteurPratiqueViewChercheurComponent implements OnInit {


    constructor(private datePipe: DatePipe, private moniteurPratiqueService: MoniteurPratiqueService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
        , private genderService: GenderService
    ) {
    }

// methods
    ngOnInit(): void {
        this.selectedGender = new GenderVo();
        this.genderService.findAll().subscribe((data) => this.genders = data);
    }

    hideViewDialog() {
        this.viewMoniteurPratiqueDialog = false;
    }

// getters and setters

    get moniteurPratiques(): Array<MoniteurPratiqueVo> {
        return this.moniteurPratiqueService.moniteurPratiques;
    }

    set moniteurPratiques(value: Array<MoniteurPratiqueVo>) {
        this.moniteurPratiqueService.moniteurPratiques = value;
    }

    get selectedMoniteurPratique(): MoniteurPratiqueVo {
        return this.moniteurPratiqueService.selectedMoniteurPratique;
    }

    set selectedMoniteurPratique(value: MoniteurPratiqueVo) {
        this.moniteurPratiqueService.selectedMoniteurPratique = value;
    }

    get viewMoniteurPratiqueDialog(): boolean {
        return this.moniteurPratiqueService.viewMoniteurPratiqueDialog;

    }

    set viewMoniteurPratiqueDialog(value: boolean) {
        this.moniteurPratiqueService.viewMoniteurPratiqueDialog = value;
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

    get dateFormat() {
        return environment.dateFormatView;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }
}
