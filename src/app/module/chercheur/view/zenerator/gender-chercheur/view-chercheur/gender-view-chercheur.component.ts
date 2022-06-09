import {Component, OnInit} from '@angular/core';
import {GenderService} from 'src/app/controller/service/Gender.service';
import {GenderVo} from 'src/app/controller/model/Gender.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-gender-view-chercheur',
    templateUrl: './gender-view-chercheur.component.html',
    styleUrls: ['./gender-view-chercheur.component.css']
})
export class GenderViewChercheurComponent implements OnInit {


    constructor(private datePipe: DatePipe, private genderService: GenderService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
    ) {
    }

// methods
    ngOnInit(): void {
    }

    hideViewDialog() {
        this.viewGenderDialog = false;
    }

// getters and setters

    get genders(): Array<GenderVo> {
        return this.genderService.genders;
    }

    set genders(value: Array<GenderVo>) {
        this.genderService.genders = value;
    }

    get selectedGender(): GenderVo {
        return this.genderService.selectedGender;
    }

    set selectedGender(value: GenderVo) {
        this.genderService.selectedGender = value;
    }

    get viewGenderDialog(): boolean {
        return this.genderService.viewGenderDialog;

    }

    set viewGenderDialog(value: boolean) {
        this.genderService.viewGenderDialog = value;
    }


    get dateFormat() {
        return environment.dateFormatView;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }
}
