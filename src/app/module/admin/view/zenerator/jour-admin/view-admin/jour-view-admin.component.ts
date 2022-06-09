import {Component, OnInit} from '@angular/core';
import {JourService} from 'src/app/controller/service/Jour.service';
import {JourVo} from 'src/app/controller/model/Jour.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-jour-view-admin',
    templateUrl: './jour-view-admin.component.html',
    styleUrls: ['./jour-view-admin.component.css']
})
export class JourViewAdminComponent implements OnInit {


    constructor(private datePipe: DatePipe, private jourService: JourService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
    ) {
    }

// methods
    ngOnInit(): void {
    }

    hideViewDialog() {
        this.viewJourDialog = false;
    }

// getters and setters

    get jours(): Array<JourVo> {
        return this.jourService.jours;
    }

    set jours(value: Array<JourVo>) {
        this.jourService.jours = value;
    }

    get selectedJour(): JourVo {
        return this.jourService.selectedJour;
    }

    set selectedJour(value: JourVo) {
        this.jourService.selectedJour = value;
    }

    get viewJourDialog(): boolean {
        return this.jourService.viewJourDialog;

    }

    set viewJourDialog(value: boolean) {
        this.jourService.viewJourDialog = value;
    }


    get dateFormat() {
        return environment.dateFormatView;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }
}
