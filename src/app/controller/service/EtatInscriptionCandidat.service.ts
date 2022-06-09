import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {EtatInscriptionCandidatVo} from '../model/EtatInscriptionCandidat.model';


@Injectable({
  providedIn: 'root'
})
export class EtatInscriptionCandidatService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/etatInscriptionCandidat/';
        })
    }
     private _etatInscriptionCandidats: Array<EtatInscriptionCandidatVo> ;
     private _selectedEtatInscriptionCandidat: EtatInscriptionCandidatVo;
     private _etatInscriptionCandidatSelections: Array<EtatInscriptionCandidatVo>;
     private _createEtatInscriptionCandidatDialog: boolean;
     private _editEtatInscriptionCandidatDialog: boolean;
     private _viewEtatInscriptionCandidatDialog: boolean;
     public editEtatInscriptionCandidat$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchEtatInscriptionCandidat: EtatInscriptionCandidatVo ;

    // methods

    public findAll(){
     return this.http.get<Array<EtatInscriptionCandidatVo>>(this.API);
    }

    public save(): Observable<EtatInscriptionCandidatVo> {
         return this.http.post<EtatInscriptionCandidatVo>(this.API, this.selectedEtatInscriptionCandidat);
    }

    delete(etatInscriptionCandidat: EtatInscriptionCandidatVo) {
         return this.http.delete<number>(this.API + 'id/' + etatInscriptionCandidat.id);
    }


    public edit(): Observable<EtatInscriptionCandidatVo> {
        return this.http.put<EtatInscriptionCandidatVo>(this.API, this.selectedEtatInscriptionCandidat);
    }


     public findByCriteria(etatInscriptionCandidat:EtatInscriptionCandidatVo):Observable<Array<EtatInscriptionCandidatVo>>{
           return this.http.post<Array<EtatInscriptionCandidatVo>>(this.API +'search', etatInscriptionCandidat);
    }

   public findByIdWithAssociatedList(etatInscriptionCandidat:EtatInscriptionCandidatVo):Observable<EtatInscriptionCandidatVo>{
         return this.http.get<EtatInscriptionCandidatVo>(this.API + 'detail/id/' +etatInscriptionCandidat.id);
    }

    // getters and setters


    get etatInscriptionCandidats(): Array<EtatInscriptionCandidatVo> {
    if(this._etatInscriptionCandidats==null){
    this._etatInscriptionCandidats=new Array<EtatInscriptionCandidatVo>();
    }
return this._etatInscriptionCandidats;
       }

    set etatInscriptionCandidats(value: Array<EtatInscriptionCandidatVo>) {
        this._etatInscriptionCandidats = value;
       }

    get selectedEtatInscriptionCandidat(): EtatInscriptionCandidatVo {
    if(this._selectedEtatInscriptionCandidat==null){
    this._selectedEtatInscriptionCandidat=new EtatInscriptionCandidatVo();
    }
           return this._selectedEtatInscriptionCandidat;
       }

    set selectedEtatInscriptionCandidat(value: EtatInscriptionCandidatVo) {
        this._selectedEtatInscriptionCandidat = value;
       }

    get etatInscriptionCandidatSelections(): Array<EtatInscriptionCandidatVo> {
    if(this._etatInscriptionCandidatSelections==null){
    this._etatInscriptionCandidatSelections=new Array<EtatInscriptionCandidatVo>();
    }
        return this._etatInscriptionCandidatSelections;
       }


    set etatInscriptionCandidatSelections(value: Array<EtatInscriptionCandidatVo>) {
        this._etatInscriptionCandidatSelections = value;
       }

    get createEtatInscriptionCandidatDialog(): boolean {
        return this._createEtatInscriptionCandidatDialog;
       }

    set createEtatInscriptionCandidatDialog(value: boolean) {
        this._createEtatInscriptionCandidatDialog = value;
       }

    get editEtatInscriptionCandidatDialog(): boolean {
        return this._editEtatInscriptionCandidatDialog;
       }

    set editEtatInscriptionCandidatDialog(value: boolean) {
        this._editEtatInscriptionCandidatDialog = value;
       }

    get viewEtatInscriptionCandidatDialog(): boolean {
        return this._viewEtatInscriptionCandidatDialog;
       }

    set viewEtatInscriptionCandidatDialog(value: boolean) {
        this._viewEtatInscriptionCandidatDialog = value;
       }

     get searchEtatInscriptionCandidat(): EtatInscriptionCandidatVo {
     if(this._searchEtatInscriptionCandidat==null){
    this._searchEtatInscriptionCandidat=new EtatInscriptionCandidatVo();
    }
        return this._searchEtatInscriptionCandidat;
    }

    set searchEtatInscriptionCandidat(value: EtatInscriptionCandidatVo) {
        this._searchEtatInscriptionCandidat = value;
       }

}
