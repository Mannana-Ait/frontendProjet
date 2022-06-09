import {Component, OnInit} from '@angular/core';
import {GerantService} from 'src/app/controller/service/Gerant.service';
import {GerantVo} from 'src/app/controller/model/Gerant.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {GenderVo} from 'src/app/controller/model/Gender.model';
import {GenderService} from 'src/app/controller/service/Gender.service';

@Component({
    selector: 'app-gerant-view-admin',
    templateUrl: './gerant-view-admin.component.html',
    styleUrls: ['./gerant-view-admin.component.css']
})
export class GerantViewAdminComponent implements OnInit {


    constructor(private datePipe: DatePipe, private gerantService: GerantService
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
        this.viewGerantDialog = false;
    }

// getters and setters

    get gerants(): Array<GerantVo> {
        return this.gerantService.gerants;
    }

    set gerants(value: Array<GerantVo>) {
        this.gerantService.gerants = value;
    }

    get selectedGerant(): GerantVo {
        return this.gerantService.selectedGerant;
    }

    set selectedGerant(value: GerantVo) {
        this.gerantService.selectedGerant = value;
    }

    get viewGerantDialog(): boolean {
        return this.gerantService.viewGerantDialog;

    }

    set viewGerantDialog(value: boolean) {
        this.gerantService.viewGerantDialog = value;
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
