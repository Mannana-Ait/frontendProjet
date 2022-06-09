import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {PlanningVo} from '../model/Planning.model';
import {JourVo} from '../model/Jour.model';
import {EcoleVo} from '../model/Ecole.model';


@Injectable({
  providedIn: 'root'
})
export class PlanningService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/planning/';
        })
    }
     private _plannings: Array<PlanningVo> ;
     private _selectedPlanning: PlanningVo;
     private _planningSelections: Array<PlanningVo>;
     private _createPlanningDialog: boolean;
     private _editPlanningDialog: boolean;
     private _viewPlanningDialog: boolean;
     public editPlanning$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchPlanning: PlanningVo ;

    // methods

    public findAll(){
     return this.http.get<Array<PlanningVo>>(this.API);
    }

    public save(): Observable<PlanningVo> {
           return this.http.post<PlanningVo>(this.API, {...this.selectedPlanning,dateFermeture: moment(this.selectedPlanning.dateFermeture).format("YYYY-MM-DD")});
    }

    delete(planning: PlanningVo) {
         return this.http.delete<number>(this.API + 'id/' + planning.id);
    }


    public edit(): Observable<PlanningVo> {
        return this.http.put<PlanningVo>(this.API, this.selectedPlanning);
    }


     public findByCriteria(planning:PlanningVo):Observable<Array<PlanningVo>>{
           return this.http.post<Array<PlanningVo>>(this.API +'search', planning);
    }

   public findByIdWithAssociatedList(planning:PlanningVo):Observable<PlanningVo>{
         return this.http.get<PlanningVo>(this.API + 'detail/id/' +planning.id);
    }

    // getters and setters


    get plannings(): Array<PlanningVo> {
    if(this._plannings==null){
    this._plannings=new Array<PlanningVo>();
    }
return this._plannings;
       }

    set plannings(value: Array<PlanningVo>) {
        this._plannings = value;
       }

    get selectedPlanning(): PlanningVo {
    if(this._selectedPlanning==null){
    this._selectedPlanning=new PlanningVo();
    }
           return this._selectedPlanning;
       }

    set selectedPlanning(value: PlanningVo) {
        this._selectedPlanning = value;
       }

    get planningSelections(): Array<PlanningVo> {
    if(this._planningSelections==null){
    this._planningSelections=new Array<PlanningVo>();
    }
        return this._planningSelections;
       }


    set planningSelections(value: Array<PlanningVo>) {
        this._planningSelections = value;
       }

    get createPlanningDialog(): boolean {
        return this._createPlanningDialog;
       }

    set createPlanningDialog(value: boolean) {
        this._createPlanningDialog = value;
       }

    get editPlanningDialog(): boolean {
        return this._editPlanningDialog;
       }

    set editPlanningDialog(value: boolean) {
        this._editPlanningDialog = value;
       }

    get viewPlanningDialog(): boolean {
        return this._viewPlanningDialog;
       }

    set viewPlanningDialog(value: boolean) {
        this._viewPlanningDialog = value;
       }

     get searchPlanning(): PlanningVo {
     if(this._searchPlanning==null){
    this._searchPlanning=new PlanningVo();
    }
        return this._searchPlanning;
    }

    set searchPlanning(value: PlanningVo) {
        this._searchPlanning = value;
       }

}
