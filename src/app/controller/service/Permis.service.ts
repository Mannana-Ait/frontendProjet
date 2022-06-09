import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {RoleService} from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {PermisVo} from '../model/Permis.model';
import {CategoriePermisVo} from '../model/CategoriePermis.model';


@Injectable({
    providedIn: 'root'
})
export class PermisService {
    private API = '';

    constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl + role.toLowerCase() + '/permis/';
        });
    }

    private _permiss: Array<PermisVo>;
    private _selectedPermis: PermisVo;
    private _permisSelections: Array<PermisVo>;
    private _createPermisDialog: boolean;
    private _editPermisDialog: boolean;
    private _viewPermisDialog: boolean;
    public editPermis$ = new BehaviorSubject<boolean>(false);
    private role$: Observable<string>;
    private _searchPermis: PermisVo;

    // methods

    public findAll() {
        return this.http.get<Array<PermisVo>>(this.API);
    }

    public save(): Observable<PermisVo> {
        return this.http.post<PermisVo>(this.API, {
            ...this.selectedPermis,
            dateDelivre: moment(this.selectedPermis.dateDelivre).format('YYYY-MM-DD')
        });
    }

    delete(permis: PermisVo) {
        return this.http.delete<number>(this.API + 'id/' + permis.id);
    }


    public edit(): Observable<PermisVo> {
        return this.http.put<PermisVo>(this.API, this.selectedPermis);
    }


    public findByCriteria(permis: PermisVo): Observable<Array<PermisVo>> {
        return this.http.post<Array<PermisVo>>(this.API + 'search', permis);
    }

    public findByIdWithAssociatedList(permis: PermisVo): Observable<PermisVo> {
        return this.http.get<PermisVo>(this.API + 'detail/id/' + permis.id);
    }

    // getters and setters


    get permiss(): Array<PermisVo> {
        if (this._permiss == null) {
            this._permiss = new Array<PermisVo>();
        }
        return this._permiss;
    }

    set permiss(value: Array<PermisVo>) {
        this._permiss = value;
    }

    get selectedPermis(): PermisVo {
        if (this._selectedPermis == null) {
            this._selectedPermis = new PermisVo();
        }
        return this._selectedPermis;
    }

    set selectedPermis(value: PermisVo) {
        this._selectedPermis = value;
    }

    get permisSelections(): Array<PermisVo> {
        if (this._permisSelections == null) {
            this._permisSelections = new Array<PermisVo>();
        }
        return this._permisSelections;
    }


    set permisSelections(value: Array<PermisVo>) {
        this._permisSelections = value;
    }

    get createPermisDialog(): boolean {
        return this._createPermisDialog;
    }

    set createPermisDialog(value: boolean) {
        this._createPermisDialog = value;
    }

    get editPermisDialog(): boolean {
        return this._editPermisDialog;
    }

    set editPermisDialog(value: boolean) {
        this._editPermisDialog = value;
    }

    get viewPermisDialog(): boolean {
        return this._viewPermisDialog;
    }

    set viewPermisDialog(value: boolean) {
        this._viewPermisDialog = value;
    }

    get searchPermis(): PermisVo {
        if (this._searchPermis == null) {
            this._searchPermis = new PermisVo();
        }
        return this._searchPermis;
    }

    set searchPermis(value: PermisVo) {
        this._searchPermis = value;
    }

}
