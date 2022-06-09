import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {RoleService} from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {PlanningItemVo} from '../model/PlanningItem.model';
import {JourVo} from '../model/Jour.model';


@Injectable({
    providedIn: 'root'
})
export class PlanningItemService {
    private API = '';

    constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl + role.toLowerCase() + '/planningItem/';
        });
    }

    private _planningItems: Array<PlanningItemVo>;
    private _selectedPlanningItem: PlanningItemVo;
    private _planningItemSelections: Array<PlanningItemVo>;
    private _createPlanningItemDialog: boolean;
    private _editPlanningItemDialog: boolean;
    private _viewPlanningItemDialog: boolean;
    public editPlanningItem$ = new BehaviorSubject<boolean>(false);
    private role$: Observable<string>;
    private _searchPlanningItem: PlanningItemVo;

    // methods

    public findAll() {
        return this.http.get<Array<PlanningItemVo>>(this.API);
    }

    public save(): Observable<PlanningItemVo> {
        return this.http.post<PlanningItemVo>(this.API, {
            ...this.selectedPlanningItem,
            dateFermeture: moment(this.selectedPlanningItem.dateFermeture).format('YYYY-MM-DD')
        });
    }

    delete(planningItem: PlanningItemVo) {
        return this.http.delete<number>(this.API + 'id/' + planningItem.id);
    }


    public edit(): Observable<PlanningItemVo> {
        return this.http.put<PlanningItemVo>(this.API, this.selectedPlanningItem);
    }


    public findByCriteria(planningItem: PlanningItemVo): Observable<Array<PlanningItemVo>> {
        return this.http.post<Array<PlanningItemVo>>(this.API + 'search', planningItem);
    }

    public findByIdWithAssociatedList(planningItem: PlanningItemVo): Observable<PlanningItemVo> {
        return this.http.get<PlanningItemVo>(this.API + 'detail/id/' + planningItem.id);
    }

    // getters and setters


    get planningItems(): Array<PlanningItemVo> {
        if (this._planningItems == null) {
            this._planningItems = new Array<PlanningItemVo>();
        }
        return this._planningItems;
    }

    set planningItems(value: Array<PlanningItemVo>) {
        this._planningItems = value;
    }

    get selectedPlanningItem(): PlanningItemVo {
        if (this._selectedPlanningItem == null) {
            this._selectedPlanningItem = new PlanningItemVo();
        }
        return this._selectedPlanningItem;
    }

    set selectedPlanningItem(value: PlanningItemVo) {
        this._selectedPlanningItem = value;
    }

    get planningItemSelections(): Array<PlanningItemVo> {
        if (this._planningItemSelections == null) {
            this._planningItemSelections = new Array<PlanningItemVo>();
        }
        return this._planningItemSelections;
    }


    set planningItemSelections(value: Array<PlanningItemVo>) {
        this._planningItemSelections = value;
    }

    get createPlanningItemDialog(): boolean {
        return this._createPlanningItemDialog;
    }

    set createPlanningItemDialog(value: boolean) {
        this._createPlanningItemDialog = value;
    }

    get editPlanningItemDialog(): boolean {
        return this._editPlanningItemDialog;
    }

    set editPlanningItemDialog(value: boolean) {
        this._editPlanningItemDialog = value;
    }

    get viewPlanningItemDialog(): boolean {
        return this._viewPlanningItemDialog;
    }

    set viewPlanningItemDialog(value: boolean) {
        this._viewPlanningItemDialog = value;
    }

    get searchPlanningItem(): PlanningItemVo {
        if (this._searchPlanningItem == null) {
            this._searchPlanningItem = new PlanningItemVo();
        }
        return this._searchPlanningItem;
    }

    set searchPlanningItem(value: PlanningItemVo) {
        this._searchPlanningItem = value;
    }

}
