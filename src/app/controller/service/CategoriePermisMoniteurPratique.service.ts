import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { RoleService } from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {CategoriePermisMoniteurPratiqueVo} from '../model/CategoriePermisMoniteurPratique.model';
import {MoniteurPratiqueVo} from '../model/MoniteurPratique.model';
import {CategoriePermisVo} from '../model/CategoriePermis.model';


@Injectable({
  providedIn: 'root'
})
export class CategoriePermisMoniteurPratiqueService {
    private API = ''
     constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl  + role.toLowerCase() + '/categoriePermisMoniteurPratique/';
        })
    }
     private _categoriePermisMoniteurPratiques: Array<CategoriePermisMoniteurPratiqueVo> ;
     private _selectedCategoriePermisMoniteurPratique: CategoriePermisMoniteurPratiqueVo;
     private _categoriePermisMoniteurPratiqueSelections: Array<CategoriePermisMoniteurPratiqueVo>;
     private _createCategoriePermisMoniteurPratiqueDialog: boolean;
     private _editCategoriePermisMoniteurPratiqueDialog: boolean;
     private _viewCategoriePermisMoniteurPratiqueDialog: boolean;
     public editCategoriePermisMoniteurPratique$ = new BehaviorSubject<boolean>(false);
     private role$: Observable<string>;
     private _searchCategoriePermisMoniteurPratique: CategoriePermisMoniteurPratiqueVo ;

    // methods

    public findAll(){
     return this.http.get<Array<CategoriePermisMoniteurPratiqueVo>>(this.API);
    }

    public save(): Observable<CategoriePermisMoniteurPratiqueVo> {
         return this.http.post<CategoriePermisMoniteurPratiqueVo>(this.API, this.selectedCategoriePermisMoniteurPratique);
    }

    delete(categoriePermisMoniteurPratique: CategoriePermisMoniteurPratiqueVo) {
         return this.http.delete<number>(this.API + 'id/' + categoriePermisMoniteurPratique.id);
    }


    public edit(): Observable<CategoriePermisMoniteurPratiqueVo> {
        return this.http.put<CategoriePermisMoniteurPratiqueVo>(this.API, this.selectedCategoriePermisMoniteurPratique);
    }


     public findByCriteria(categoriePermisMoniteurPratique:CategoriePermisMoniteurPratiqueVo):Observable<Array<CategoriePermisMoniteurPratiqueVo>>{
           return this.http.post<Array<CategoriePermisMoniteurPratiqueVo>>(this.API +'search', categoriePermisMoniteurPratique);
    }

   public findByIdWithAssociatedList(categoriePermisMoniteurPratique:CategoriePermisMoniteurPratiqueVo):Observable<CategoriePermisMoniteurPratiqueVo>{
         return this.http.get<CategoriePermisMoniteurPratiqueVo>(this.API + 'detail/id/' +categoriePermisMoniteurPratique.id);
    }

    // getters and setters


    get categoriePermisMoniteurPratiques(): Array<CategoriePermisMoniteurPratiqueVo> {
    if(this._categoriePermisMoniteurPratiques==null){
    this._categoriePermisMoniteurPratiques=new Array<CategoriePermisMoniteurPratiqueVo>();
    }
return this._categoriePermisMoniteurPratiques;
       }

    set categoriePermisMoniteurPratiques(value: Array<CategoriePermisMoniteurPratiqueVo>) {
        this._categoriePermisMoniteurPratiques = value;
       }

    get selectedCategoriePermisMoniteurPratique(): CategoriePermisMoniteurPratiqueVo {
    if(this._selectedCategoriePermisMoniteurPratique==null){
    this._selectedCategoriePermisMoniteurPratique=new CategoriePermisMoniteurPratiqueVo();
    }
           return this._selectedCategoriePermisMoniteurPratique;
       }

    set selectedCategoriePermisMoniteurPratique(value: CategoriePermisMoniteurPratiqueVo) {
        this._selectedCategoriePermisMoniteurPratique = value;
       }

    get categoriePermisMoniteurPratiqueSelections(): Array<CategoriePermisMoniteurPratiqueVo> {
    if(this._categoriePermisMoniteurPratiqueSelections==null){
    this._categoriePermisMoniteurPratiqueSelections=new Array<CategoriePermisMoniteurPratiqueVo>();
    }
        return this._categoriePermisMoniteurPratiqueSelections;
       }


    set categoriePermisMoniteurPratiqueSelections(value: Array<CategoriePermisMoniteurPratiqueVo>) {
        this._categoriePermisMoniteurPratiqueSelections = value;
       }

    get createCategoriePermisMoniteurPratiqueDialog(): boolean {
        return this._createCategoriePermisMoniteurPratiqueDialog;
       }

    set createCategoriePermisMoniteurPratiqueDialog(value: boolean) {
        this._createCategoriePermisMoniteurPratiqueDialog = value;
       }

    get editCategoriePermisMoniteurPratiqueDialog(): boolean {
        return this._editCategoriePermisMoniteurPratiqueDialog;
       }

    set editCategoriePermisMoniteurPratiqueDialog(value: boolean) {
        this._editCategoriePermisMoniteurPratiqueDialog = value;
       }

    get viewCategoriePermisMoniteurPratiqueDialog(): boolean {
        return this._viewCategoriePermisMoniteurPratiqueDialog;
       }

    set viewCategoriePermisMoniteurPratiqueDialog(value: boolean) {
        this._viewCategoriePermisMoniteurPratiqueDialog = value;
       }

     get searchCategoriePermisMoniteurPratique(): CategoriePermisMoniteurPratiqueVo {
     if(this._searchCategoriePermisMoniteurPratique==null){
    this._searchCategoriePermisMoniteurPratique=new CategoriePermisMoniteurPratiqueVo();
    }
        return this._searchCategoriePermisMoniteurPratique;
    }

    set searchCategoriePermisMoniteurPratique(value: CategoriePermisMoniteurPratiqueVo) {
        this._searchCategoriePermisMoniteurPratique = value;
       }

}
