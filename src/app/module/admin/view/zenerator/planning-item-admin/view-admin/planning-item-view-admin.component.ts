import {Component, OnInit} from '@angular/core';
import {PlanningItemService} from 'src/app/controller/service/PlanningItem.service';
import {PlanningItemVo} from 'src/app/controller/model/PlanningItem.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {JourVo} from 'src/app/controller/model/Jour.model';
import {JourService} from 'src/app/controller/service/Jour.service';

@Component({
    selector: 'app-planning-item-view-admin',
    templateUrl: './planning-item-view-admin.component.html',
    styleUrls: ['./planning-item-view-admin.component.css']
})
export class PlanningItemViewAdminComponent implements OnInit {


    constructor(private datePipe: DatePipe, private planningItemService: PlanningItemService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
        , private jourService: JourService
    ) {
    }

// methods
    ngOnInit(): void {
        this.selectedJour = new JourVo();
        this.jourService.findAll().subscribe((data) => this.jours = data);
    }

    hideViewDialog() {
        this.viewPlanningItemDialog = false;
    }

// getters and setters

    get planningItems(): Array<PlanningItemVo> {
        return this.planningItemService.planningItems;
    }

    set planningItems(value: Array<PlanningItemVo>) {
        this.planningItemService.planningItems = value;
    }

    get selectedPlanningItem(): PlanningItemVo {
        return this.planningItemService.selectedPlanningItem;
    }

    set selectedPlanningItem(value: PlanningItemVo) {
        this.planningItemService.selectedPlanningItem = value;
    }

    get viewPlanningItemDialog(): boolean {
        return this.planningItemService.viewPlanningItemDialog;

    }

    set viewPlanningItemDialog(value: boolean) {
        this.planningItemService.viewPlanningItemDialog = value;
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
