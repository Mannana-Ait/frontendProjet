import {Component, OnInit} from '@angular/core';
import {MarqueService} from 'src/app/controller/service/Marque.service';
import {MarqueVo} from 'src/app/controller/model/Marque.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-marque-view-admin',
    templateUrl: './marque-view-admin.component.html',
    styleUrls: ['./marque-view-admin.component.css']
})
export class MarqueViewAdminComponent implements OnInit {


    constructor(private datePipe: DatePipe, private marqueService: MarqueService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
    ) {
    }

// methods
    ngOnInit(): void {
    }

    hideViewDialog() {
        this.viewMarqueDialog = false;
    }

// getters and setters

    get marques(): Array<MarqueVo> {
        return this.marqueService.marques;
    }

    set marques(value: Array<MarqueVo>) {
        this.marqueService.marques = value;
    }

    get selectedMarque(): MarqueVo {
        return this.marqueService.selectedMarque;
    }

    set selectedMarque(value: MarqueVo) {
        this.marqueService.selectedMarque = value;
    }

    get viewMarqueDialog(): boolean {
        return this.marqueService.viewMarqueDialog;

    }

    set viewMarqueDialog(value: boolean) {
        this.marqueService.viewMarqueDialog = value;
    }


    get dateFormat() {
        return environment.dateFormatView;
    }

    get dateFormatColumn() {
        return environment.dateFormatList;
    }
}
