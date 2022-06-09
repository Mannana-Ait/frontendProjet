import {Component, OnInit} from '@angular/core';
import {MoniteurTheoriqueService} from 'src/app/controller/service/MoniteurTheorique.service';
import {MoniteurTheoriqueVo} from 'src/app/controller/model/MoniteurTheorique.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {GenderVo} from 'src/app/controller/model/Gender.model';
import {GenderService} from 'src/app/controller/service/Gender.service';

@Component({
    selector: 'app-moniteur-theorique-view-admin',
    templateUrl: './moniteur-theorique-view-admin.component.html',
    styleUrls: ['./moniteur-theorique-view-admin.component.css']
})
export class MoniteurTheoriqueViewAdminComponent implements OnInit {


    constructor(private datePipe: DatePipe, private moniteurTheoriqueService: MoniteurTheoriqueService
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
        this.viewMoniteurTheoriqueDialog = false;
    }

// getters and setters

    get moniteurTheoriques(): Array<MoniteurTheoriqueVo> {
        return this.moniteurTheoriqueService.moniteurTheoriques;
    }

    set moniteurTheoriques(value: Array<MoniteurTheoriqueVo>) {
        this.moniteurTheoriqueService.moniteurTheoriques = value;
    }

    get selectedMoniteurTheorique(): MoniteurTheoriqueVo {
        return this.moniteurTheoriqueService.selectedMoniteurTheorique;
    }

    set selectedMoniteurTheorique(value: MoniteurTheoriqueVo) {
        this.moniteurTheoriqueService.selectedMoniteurTheorique = value;
    }

    get viewMoniteurTheoriqueDialog(): boolean {
        return this.moniteurTheoriqueService.viewMoniteurTheoriqueDialog;

    }

    set viewMoniteurTheoriqueDialog(value: boolean) {
        this.moniteurTheoriqueService.viewMoniteurTheoriqueDialog = value;
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
