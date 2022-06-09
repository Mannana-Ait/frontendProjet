import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {RoleService} from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {TypeAvisVo} from '../model/TypeAvis.model';


@Injectable({
    providedIn: 'root'
})
export class TypeAvisService {
    private API = '';

    constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl + role.toLowerCase() + '/typeAvis/';
        });
    }

    private _typeAviss: Array<TypeAvisVo>;
    private _selectedTypeAvis: TypeAvisVo;
    private _typeAvisSelections: Array<TypeAvisVo>;
    private _createTypeAvisDialog: boolean;
    private _editTypeAvisDialog: boolean;
    private _viewTypeAvisDialog: boolean;
    public editTypeAvis$ = new BehaviorSubject<boolean>(false);
    private role$: Observable<string>;
    private _searchTypeAvis: TypeAvisVo;

    // methods

    public findAll() {
        return this.http.get<Array<TypeAvisVo>>(this.API);
    }

    public save(): Observable<TypeAvisVo> {
        return this.http.post<TypeAvisVo>(this.API, this.selectedTypeAvis);
    }

    delete(typeAvis: TypeAvisVo) {
        return this.http.delete<number>(this.API + 'id/' + typeAvis.id);
    }


    public edit(): Observable<TypeAvisVo> {
        return this.http.put<TypeAvisVo>(this.API, this.selectedTypeAvis);
    }


    public findByCriteria(typeAvis: TypeAvisVo): Observable<Array<TypeAvisVo>> {
        return this.http.post<Array<TypeAvisVo>>(this.API + 'search', typeAvis);
    }

    public findByIdWithAssociatedList(typeAvis: TypeAvisVo): Observable<TypeAvisVo> {
        return this.http.get<TypeAvisVo>(this.API + 'detail/id/' + typeAvis.id);
    }

    // getters and setters


    get typeAviss(): Array<TypeAvisVo> {
        if (this._typeAviss == null) {
            this._typeAviss = new Array<TypeAvisVo>();
        }
        return this._typeAviss;
    }

    set typeAviss(value: Array<TypeAvisVo>) {
        this._typeAviss = value;
    }

    get selectedTypeAvis(): TypeAvisVo {
        if (this._selectedTypeAvis == null) {
            this._selectedTypeAvis = new TypeAvisVo();
        }
        return this._selectedTypeAvis;
    }

    set selectedTypeAvis(value: TypeAvisVo) {
        this._selectedTypeAvis = value;
    }

    get typeAvisSelections(): Array<TypeAvisVo> {
        if (this._typeAvisSelections == null) {
            this._typeAvisSelections = new Array<TypeAvisVo>();
        }
        return this._typeAvisSelections;
    }


    set typeAvisSelections(value: Array<TypeAvisVo>) {
        this._typeAvisSelections = value;
    }

    get createTypeAvisDialog(): boolean {
        return this._createTypeAvisDialog;
    }

    set createTypeAvisDialog(value: boolean) {
        this._createTypeAvisDialog = value;
    }

    get editTypeAvisDialog(): boolean {
        return this._editTypeAvisDialog;
    }

    set editTypeAvisDialog(value: boolean) {
        this._editTypeAvisDialog = value;
    }

    get viewTypeAvisDialog(): boolean {
        return this._viewTypeAvisDialog;
    }

    set viewTypeAvisDialog(value: boolean) {
        this._viewTypeAvisDialog = value;
    }

    get searchTypeAvis(): TypeAvisVo {
        if (this._searchTypeAvis == null) {
            this._searchTypeAvis = new TypeAvisVo();
        }
        return this._searchTypeAvis;
    }

    set searchTypeAvis(value: TypeAvisVo) {
        this._searchTypeAvis = value;
    }

}
