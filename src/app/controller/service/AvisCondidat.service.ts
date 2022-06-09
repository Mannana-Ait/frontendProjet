import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {AvisCondidatVo} from '../model/AvisCondidat.model';
import {EcoleVo} from '../model/Ecole.model';
import {TypeAvisVo} from '../model/TypeAvis.model';


@Injectable({
  providedIn: 'root'
})
export class AvisCondidatService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/avisCondidat/';
        })
    }
     private _avisCondidats: Array<AvisCondidatVo> ;
     private _selectedAvisCondidat: AvisCondidatVo;
     private _avisCondidatSelections: Array<AvisCondidatVo>;
     private _createAvisCondidatDialog: boolean;
     private _editAvisCondidatDialog: boolean;
     private _viewAvisCondidatDialog: boolean;
     public editAvisCondidat$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchAvisCondidat: AvisCondidatVo ;

    // methods

    public findAll(){
     return this.http.get<Array<AvisCondidatVo>>(this.API);
    }

    public save(): Observable<AvisCondidatVo> {
         return this.http.post<AvisCondidatVo>(this.API, this.selectedAvisCondidat);
    }

    delete(avisCondidat: AvisCondidatVo) {
         return this.http.delete<number>(this.API + 'id/' + avisCondidat.id);
    }


    public edit(): Observable<AvisCondidatVo> {
        return this.http.put<AvisCondidatVo>(this.API, this.selectedAvisCondidat);
    }


     public findByCriteria(avisCondidat:AvisCondidatVo):Observable<Array<AvisCondidatVo>>{
           return this.http.post<Array<AvisCondidatVo>>(this.API +'search', avisCondidat);
    }

   public findByIdWithAssociatedList(avisCondidat:AvisCondidatVo):Observable<AvisCondidatVo>{
         return this.http.get<AvisCondidatVo>(this.API + 'detail/id/' +avisCondidat.id);
    }

    // getters and setters


    get avisCondidats(): Array<AvisCondidatVo> {
    if(this._avisCondidats==null){
    this._avisCondidats=new Array<AvisCondidatVo>();
    }
return this._avisCondidats;
       }

    set avisCondidats(value: Array<AvisCondidatVo>) {
        this._avisCondidats = value;
       }

    get selectedAvisCondidat(): AvisCondidatVo {
    if(this._selectedAvisCondidat==null){
    this._selectedAvisCondidat=new AvisCondidatVo();
    }
           return this._selectedAvisCondidat;
       }

    set selectedAvisCondidat(value: AvisCondidatVo) {
        this._selectedAvisCondidat = value;
       }

    get avisCondidatSelections(): Array<AvisCondidatVo> {
    if(this._avisCondidatSelections==null){
    this._avisCondidatSelections=new Array<AvisCondidatVo>();
    }
        return this._avisCondidatSelections;
       }


    set avisCondidatSelections(value: Array<AvisCondidatVo>) {
        this._avisCondidatSelections = value;
       }

    get createAvisCondidatDialog(): boolean {
        return this._createAvisCondidatDialog;
       }

    set createAvisCondidatDialog(value: boolean) {
        this._createAvisCondidatDialog = value;
       }

    get editAvisCondidatDialog(): boolean {
        return this._editAvisCondidatDialog;
       }

    set editAvisCondidatDialog(value: boolean) {
        this._editAvisCondidatDialog = value;
       }

    get viewAvisCondidatDialog(): boolean {
        return this._viewAvisCondidatDialog;
       }

    set viewAvisCondidatDialog(value: boolean) {
        this._viewAvisCondidatDialog = value;
       }

     get searchAvisCondidat(): AvisCondidatVo {
     if(this._searchAvisCondidat==null){
    this._searchAvisCondidat=new AvisCondidatVo();
    }
        return this._searchAvisCondidat;
    }

    set searchAvisCondidat(value: AvisCondidatVo) {
        this._searchAvisCondidat = value;
       }

}
