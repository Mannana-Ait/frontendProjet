import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {CandidatVo} from '../model/Candidat.model';


@Injectable({
  providedIn: 'root'
})
export class CandidatService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/candidat/';
        })
    }
     private _candidats: Array<CandidatVo> ;
     private _selectedCandidat: CandidatVo;
     private _candidatSelections: Array<CandidatVo>;
     private _createCandidatDialog: boolean;
     private _editCandidatDialog: boolean;
     private _viewCandidatDialog: boolean;
     public editCandidat$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchCandidat: CandidatVo ;

    // methods

    public findAll(){
     return this.http.get<Array<CandidatVo>>(this.API);
    }

    public save(): Observable<CandidatVo> {
         return this.http.post<CandidatVo>(this.API, this.selectedCandidat);
    }

    delete(candidat: CandidatVo) {
         return this.http.delete<number>(this.API + 'id/' + candidat.id);
    }


    public edit(): Observable<CandidatVo> {
        return this.http.put<CandidatVo>(this.API, this.selectedCandidat);
    }


     public findByCriteria(candidat:CandidatVo):Observable<Array<CandidatVo>>{
           return this.http.post<Array<CandidatVo>>(this.API +'search', candidat);
    }

   public findByIdWithAssociatedList(candidat:CandidatVo):Observable<CandidatVo>{
         return this.http.get<CandidatVo>(this.API + 'detail/id/' +candidat.id);
    }

    // getters and setters


    get candidats(): Array<CandidatVo> {
    if(this._candidats==null){
    this._candidats=new Array<CandidatVo>();
    }
return this._candidats;
       }

    set candidats(value: Array<CandidatVo>) {
        this._candidats = value;
       }

    get selectedCandidat(): CandidatVo {
    if(this._selectedCandidat==null){
    this._selectedCandidat=new CandidatVo();
    }
           return this._selectedCandidat;
       }

    set selectedCandidat(value: CandidatVo) {
        this._selectedCandidat = value;
       }

    get candidatSelections(): Array<CandidatVo> {
    if(this._candidatSelections==null){
    this._candidatSelections=new Array<CandidatVo>();
    }
        return this._candidatSelections;
       }


    set candidatSelections(value: Array<CandidatVo>) {
        this._candidatSelections = value;
       }

    get createCandidatDialog(): boolean {
        return this._createCandidatDialog;
       }

    set createCandidatDialog(value: boolean) {
        this._createCandidatDialog = value;
       }

    get editCandidatDialog(): boolean {
        return this._editCandidatDialog;
       }

    set editCandidatDialog(value: boolean) {
        this._editCandidatDialog = value;
       }

    get viewCandidatDialog(): boolean {
        return this._viewCandidatDialog;
       }

    set viewCandidatDialog(value: boolean) {
        this._viewCandidatDialog = value;
       }

     get searchCandidat(): CandidatVo {
     if(this._searchCandidat==null){
    this._searchCandidat=new CandidatVo();
    }
        return this._searchCandidat;
    }

    set searchCandidat(value: CandidatVo) {
        this._searchCandidat = value;
       }

}
