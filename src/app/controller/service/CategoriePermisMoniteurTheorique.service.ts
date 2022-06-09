import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {CategoriePermisMoniteurTheoriqueVo} from '../model/CategoriePermisMoniteurTheorique.model';
import {CategoriePermisVo} from '../model/CategoriePermis.model';
import {MoniteurTheoriqueVo} from '../model/MoniteurTheorique.model';


@Injectable({
  providedIn: 'root'
})
export class CategoriePermisMoniteurTheoriqueService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/categoriePermisMoniteurTheorique/';
        })
    }
     private _categoriePermisMoniteurTheoriques: Array<CategoriePermisMoniteurTheoriqueVo> ;
     private _selectedCategoriePermisMoniteurTheorique: CategoriePermisMoniteurTheoriqueVo;
     private _categoriePermisMoniteurTheoriqueSelections: Array<CategoriePermisMoniteurTheoriqueVo>;
     private _createCategoriePermisMoniteurTheoriqueDialog: boolean;
     private _editCategoriePermisMoniteurTheoriqueDialog: boolean;
     private _viewCategoriePermisMoniteurTheoriqueDialog: boolean;
     public editCategoriePermisMoniteurTheorique$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchCategoriePermisMoniteurTheorique: CategoriePermisMoniteurTheoriqueVo ;

    // methods

    public findAll(){
     return this.http.get<Array<CategoriePermisMoniteurTheoriqueVo>>(this.API);
    }

    public save(): Observable<CategoriePermisMoniteurTheoriqueVo> {
         return this.http.post<CategoriePermisMoniteurTheoriqueVo>(this.API, this.selectedCategoriePermisMoniteurTheorique);
    }

    delete(categoriePermisMoniteurTheorique: CategoriePermisMoniteurTheoriqueVo) {
         return this.http.delete<number>(this.API + 'id/' + categoriePermisMoniteurTheorique.id);
    }


    public edit(): Observable<CategoriePermisMoniteurTheoriqueVo> {
        return this.http.put<CategoriePermisMoniteurTheoriqueVo>(this.API, this.selectedCategoriePermisMoniteurTheorique);
    }


     public findByCriteria(categoriePermisMoniteurTheorique:CategoriePermisMoniteurTheoriqueVo):Observable<Array<CategoriePermisMoniteurTheoriqueVo>>{
           return this.http.post<Array<CategoriePermisMoniteurTheoriqueVo>>(this.API +'search', categoriePermisMoniteurTheorique);
    }

   public findByIdWithAssociatedList(categoriePermisMoniteurTheorique:CategoriePermisMoniteurTheoriqueVo):Observable<CategoriePermisMoniteurTheoriqueVo>{
         return this.http.get<CategoriePermisMoniteurTheoriqueVo>(this.API + 'detail/id/' +categoriePermisMoniteurTheorique.id);
    }

    // getters and setters


    get categoriePermisMoniteurTheoriques(): Array<CategoriePermisMoniteurTheoriqueVo> {
    if(this._categoriePermisMoniteurTheoriques==null){
    this._categoriePermisMoniteurTheoriques=new Array<CategoriePermisMoniteurTheoriqueVo>();
    }
return this._categoriePermisMoniteurTheoriques;
       }

    set categoriePermisMoniteurTheoriques(value: Array<CategoriePermisMoniteurTheoriqueVo>) {
        this._categoriePermisMoniteurTheoriques = value;
       }

    get selectedCategoriePermisMoniteurTheorique(): CategoriePermisMoniteurTheoriqueVo {
    if(this._selectedCategoriePermisMoniteurTheorique==null){
    this._selectedCategoriePermisMoniteurTheorique=new CategoriePermisMoniteurTheoriqueVo();
    }
           return this._selectedCategoriePermisMoniteurTheorique;
       }

    set selectedCategoriePermisMoniteurTheorique(value: CategoriePermisMoniteurTheoriqueVo) {
        this._selectedCategoriePermisMoniteurTheorique = value;
       }

    get categoriePermisMoniteurTheoriqueSelections(): Array<CategoriePermisMoniteurTheoriqueVo> {
    if(this._categoriePermisMoniteurTheoriqueSelections==null){
    this._categoriePermisMoniteurTheoriqueSelections=new Array<CategoriePermisMoniteurTheoriqueVo>();
    }
        return this._categoriePermisMoniteurTheoriqueSelections;
       }


    set categoriePermisMoniteurTheoriqueSelections(value: Array<CategoriePermisMoniteurTheoriqueVo>) {
        this._categoriePermisMoniteurTheoriqueSelections = value;
       }

    get createCategoriePermisMoniteurTheoriqueDialog(): boolean {
        return this._createCategoriePermisMoniteurTheoriqueDialog;
       }

    set createCategoriePermisMoniteurTheoriqueDialog(value: boolean) {
        this._createCategoriePermisMoniteurTheoriqueDialog = value;
       }

    get editCategoriePermisMoniteurTheoriqueDialog(): boolean {
        return this._editCategoriePermisMoniteurTheoriqueDialog;
       }

    set editCategoriePermisMoniteurTheoriqueDialog(value: boolean) {
        this._editCategoriePermisMoniteurTheoriqueDialog = value;
       }

    get viewCategoriePermisMoniteurTheoriqueDialog(): boolean {
        return this._viewCategoriePermisMoniteurTheoriqueDialog;
       }

    set viewCategoriePermisMoniteurTheoriqueDialog(value: boolean) {
        this._viewCategoriePermisMoniteurTheoriqueDialog = value;
       }

     get searchCategoriePermisMoniteurTheorique(): CategoriePermisMoniteurTheoriqueVo {
     if(this._searchCategoriePermisMoniteurTheorique==null){
    this._searchCategoriePermisMoniteurTheorique=new CategoriePermisMoniteurTheoriqueVo();
    }
        return this._searchCategoriePermisMoniteurTheorique;
    }

    set searchCategoriePermisMoniteurTheorique(value: CategoriePermisMoniteurTheoriqueVo) {
        this._searchCategoriePermisMoniteurTheorique = value;
       }

}
