import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {InscriptionCandidatVo} from '../model/InscriptionCandidat.model';
import {EcoleVo} from '../model/Ecole.model';
import {CandidatVo} from '../model/Candidat.model';
import {CategoriePermisVo} from '../model/CategoriePermis.model';
import {EtatInscriptionCandidatVo} from '../model/EtatInscriptionCandidat.model';


@Injectable({
  providedIn: 'root'
})
export class InscriptionCandidatService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/inscriptionCandidat/';
        })
    }
     private _inscriptionCandidats: Array<InscriptionCandidatVo> ;
     private _selectedInscriptionCandidat: InscriptionCandidatVo;
     private _inscriptionCandidatSelections: Array<InscriptionCandidatVo>;
     private _createInscriptionCandidatDialog: boolean;
     private _editInscriptionCandidatDialog: boolean;
     private _viewInscriptionCandidatDialog: boolean;
     public editInscriptionCandidat$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchInscriptionCandidat: InscriptionCandidatVo ;

    // methods

    public findAll(){
     return this.http.get<Array<InscriptionCandidatVo>>(this.API);
    }

    public save(): Observable<InscriptionCandidatVo> {
           return this.http.post<InscriptionCandidatVo>(this.API, {...this.selectedInscriptionCandidat,dateDelivancePermis: moment(this.selectedInscriptionCandidat.dateDelivancePermis).format("YYYY-MM-DD")});
    }

    delete(inscriptionCandidat: InscriptionCandidatVo) {
         return this.http.delete<number>(this.API + 'id/' + inscriptionCandidat.id);
    }


    public edit(): Observable<InscriptionCandidatVo> {
        return this.http.put<InscriptionCandidatVo>(this.API, this.selectedInscriptionCandidat);
    }


     public findByCriteria(inscriptionCandidat:InscriptionCandidatVo):Observable<Array<InscriptionCandidatVo>>{
           return this.http.post<Array<InscriptionCandidatVo>>(this.API +'search', inscriptionCandidat);
    }

   public findByIdWithAssociatedList(inscriptionCandidat:InscriptionCandidatVo):Observable<InscriptionCandidatVo>{
         return this.http.get<InscriptionCandidatVo>(this.API + 'detail/id/' +inscriptionCandidat.id);
    }

    // getters and setters


    get inscriptionCandidats(): Array<InscriptionCandidatVo> {
    if(this._inscriptionCandidats==null){
    this._inscriptionCandidats=new Array<InscriptionCandidatVo>();
    }
return this._inscriptionCandidats;
       }

    set inscriptionCandidats(value: Array<InscriptionCandidatVo>) {
        this._inscriptionCandidats = value;
       }

    get selectedInscriptionCandidat(): InscriptionCandidatVo {
    if(this._selectedInscriptionCandidat==null){
    this._selectedInscriptionCandidat=new InscriptionCandidatVo();
    }
           return this._selectedInscriptionCandidat;
       }

    set selectedInscriptionCandidat(value: InscriptionCandidatVo) {
        this._selectedInscriptionCandidat = value;
       }

    get inscriptionCandidatSelections(): Array<InscriptionCandidatVo> {
    if(this._inscriptionCandidatSelections==null){
    this._inscriptionCandidatSelections=new Array<InscriptionCandidatVo>();
    }
        return this._inscriptionCandidatSelections;
       }


    set inscriptionCandidatSelections(value: Array<InscriptionCandidatVo>) {
        this._inscriptionCandidatSelections = value;
       }

    get createInscriptionCandidatDialog(): boolean {
        return this._createInscriptionCandidatDialog;
       }

    set createInscriptionCandidatDialog(value: boolean) {
        this._createInscriptionCandidatDialog = value;
       }

    get editInscriptionCandidatDialog(): boolean {
        return this._editInscriptionCandidatDialog;
       }

    set editInscriptionCandidatDialog(value: boolean) {
        this._editInscriptionCandidatDialog = value;
       }

    get viewInscriptionCandidatDialog(): boolean {
        return this._viewInscriptionCandidatDialog;
       }

    set viewInscriptionCandidatDialog(value: boolean) {
        this._viewInscriptionCandidatDialog = value;
       }

     get searchInscriptionCandidat(): InscriptionCandidatVo {
     if(this._searchInscriptionCandidat==null){
    this._searchInscriptionCandidat=new InscriptionCandidatVo();
    }
        return this._searchInscriptionCandidat;
    }

    set searchInscriptionCandidat(value: InscriptionCandidatVo) {
        this._searchInscriptionCandidat = value;
       }

}
