import {Component, OnInit, Input} from '@angular/core';
import {PlanningItemService} from 'src/app/controller/service/PlanningItem.service';
import {PlanningItemVo} from 'src/app/controller/model/PlanningItem.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


import {JourVo} from 'src/app/controller/model/Jour.model';
import {JourService} from 'src/app/controller/service/Jour.service';

@Component({
    selector: 'app-planning-item-create-chercheur',
    templateUrl: './planning-item-create-chercheur.component.html',
    styleUrls: ['./planning-item-create-chercheur.component.css']
})
export class PlanningItemCreateChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    constructor(private datePipe: DatePipe, private planningItemService: PlanningItemService
        , private stringUtilService: StringUtilService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
        , private jourService: JourService
    ) {

    }


    ngOnInit(): void {

        this.selectedJour = new JourVo();
        this.jourService.findAll().subscribe((data) => this.jours = data);
    }


    private setValidation(value: boolean) {
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
        this.planningItemService.save().subscribe(planningItem => {
            this.planningItems.push({...planningItem});
            this.createPlanningItemDialog = false;
            this.submitted = false;
            this.selectedPlanningItem = new PlanningItemVo();


        }, error => {
            console.log(error);
        });
    }

    private validateForm(): void {
        this.errorMessages = new Array<string>();

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
        this.createPlanningItemDialog = false;
        this.setValidation(true);
    }

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

    get createPlanningItemDialog(): boolean {
        return this.planningItemService.createPlanningItemDialog;

    }

    set createPlanningItemDialog(value: boolean) {
        this.planningItemService.createPlanningItemDialog = value;
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
