import {Component, OnInit} from '@angular/core';
import {VilleService} from 'src/app/controller/service/Ville.service';
import {VilleVo} from 'src/app/controller/model/Ville.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-ville-view-admin',
    templateUrl: './ville-view-admin.component.html',
    styleUrls: ['./ville-view-admin.component.css']
})
export class VilleViewAdminComponent implements OnInit {


    constructor(private datePipe: DatePipe, private villeService: VilleService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
    ) {
    }

// methods
    ngOnInit(): void {
    }

    hideViewDialog() {
        this.viewVilleDialog = false;
    }

// getters and setters

    get villes(): Array<VilleVo> {
        return this.villeService.villes;
    }

    set villes(value: Array<VilleVo>) {
        this.villeService.villes = value;
    }

    get selectedVille(): VilleVo {
        return this.villeService.selectedVille;
    }

    set selectedVille(value: VilleVo) {
        this.villeService.selectedVille = value;
    }

    get viewVilleDialog(): boolean {
        return this.villeService.viewVilleDialog;

    }

    set viewVilleDialog(value: boolean) {
        this.villeService.viewVilleDialog = value;
    }


    get dateFormat() {
        return environment.dateFormatView;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }
}
