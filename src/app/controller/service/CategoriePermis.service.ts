import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {RoleService} from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {CategoriePermisVo} from '../model/CategoriePermis.model';


@Injectable({
    providedIn: 'root'
})
export class CategoriePermisService {
    private API = '';

    constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl + role.toLowerCase() + '/categoriePermis/';
        });
    }

    private _categoriePermiss: Array<CategoriePermisVo>;
    private _selectedCategoriePermis: CategoriePermisVo;
    private _categoriePermisSelections: Array<CategoriePermisVo>;
    private _createCategoriePermisDialog: boolean;
    private _editCategoriePermisDialog: boolean;
    private _viewCategoriePermisDialog: boolean;
    public editCategoriePermis$ = new BehaviorSubject<boolean>(false);
    private role$: Observable<string>;
    private _searchCategoriePermis: CategoriePermisVo;

    // methods

    public findAll() {
        return this.http.get<Array<CategoriePermisVo>>(this.API);
    }

    public save(): Observable<CategoriePermisVo> {
        return this.http.post<CategoriePermisVo>(this.API, this.selectedCategoriePermis);
    }

    delete(categoriePermis: CategoriePermisVo) {
        return this.http.delete<number>(this.API + 'id/' + categoriePermis.id);
    }


    public edit(): Observable<CategoriePermisVo> {
        return this.http.put<CategoriePermisVo>(this.API, this.selectedCategoriePermis);
    }


    public findByCriteria(categoriePermis: CategoriePermisVo): Observable<Array<CategoriePermisVo>> {
        return this.http.post<Array<CategoriePermisVo>>(this.API + 'search', categoriePermis);
    }

    public findByIdWithAssociatedList(categoriePermis: CategoriePermisVo): Observable<CategoriePermisVo> {
        return this.http.get<CategoriePermisVo>(this.API + 'detail/id/' + categoriePermis.id);
    }

    // getters and setters


    get categoriePermiss(): Array<CategoriePermisVo> {
        if (this._categoriePermiss == null) {
            this._categoriePermiss = new Array<CategoriePermisVo>();
        }
        return this._categoriePermiss;
    }

    set categoriePermiss(value: Array<CategoriePermisVo>) {
        this._categoriePermiss = value;
    }

    get selectedCategoriePermis(): CategoriePermisVo {
        if (this._selectedCategoriePermis == null) {
            this._selectedCategoriePermis = new CategoriePermisVo();
        }
        return this._selectedCategoriePermis;
    }

    set selectedCategoriePermis(value: CategoriePermisVo) {
        this._selectedCategoriePermis = value;
    }

    get categoriePermisSelections(): Array<CategoriePermisVo> {
        if (this._categoriePermisSelections == null) {
            this._categoriePermisSelections = new Array<CategoriePermisVo>();
        }
        return this._categoriePermisSelections;
    }


    set categoriePermisSelections(value: Array<CategoriePermisVo>) {
        this._categoriePermisSelections = value;
    }

    get createCategoriePermisDialog(): boolean {
        return this._createCategoriePermisDialog;
    }

    set createCategoriePermisDialog(value: boolean) {
        this._createCategoriePermisDialog = value;
    }

    get editCategoriePermisDialog(): boolean {
        return this._editCategoriePermisDialog;
    }

    set editCategoriePermisDialog(value: boolean) {
        this._editCategoriePermisDialog = value;
    }

    get viewCategoriePermisDialog(): boolean {
        return this._viewCategoriePermisDialog;
    }

    set viewCategoriePermisDialog(value: boolean) {
        this._viewCategoriePermisDialog = value;
    }

    get searchCategoriePermis(): CategoriePermisVo {
        if (this._searchCategoriePermis == null) {
            this._searchCategoriePermis = new CategoriePermisVo();
        }
        return this._searchCategoriePermis;
    }

    set searchCategoriePermis(value: CategoriePermisVo) {
        this._searchCategoriePermis = value;
    }

}
