import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {RoleService} from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {TypeVehiculeVo} from '../model/TypeVehicule.model';


@Injectable({
    providedIn: 'root'
})
export class TypeVehiculeService {
    private API = '';

    constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl + role.toLowerCase() + '/typeVehicule/';
        });
    }

    private _typeVehicules: Array<TypeVehiculeVo>;
    private _selectedTypeVehicule: TypeVehiculeVo;
    private _typeVehiculeSelections: Array<TypeVehiculeVo>;
    private _createTypeVehiculeDialog: boolean;
    private _editTypeVehiculeDialog: boolean;
    private _viewTypeVehiculeDialog: boolean;
    public editTypeVehicule$ = new BehaviorSubject<boolean>(false);
    private role$: Observable<string>;
    private _searchTypeVehicule: TypeVehiculeVo;

    // methods

    public findAll() {
        return this.http.get<Array<TypeVehiculeVo>>(this.API);
    }

    public save(): Observable<TypeVehiculeVo> {
        return this.http.post<TypeVehiculeVo>(this.API, this.selectedTypeVehicule);
    }

    delete(typeVehicule: TypeVehiculeVo) {
        return this.http.delete<number>(this.API + 'id/' + typeVehicule.id);
    }


    public edit(): Observable<TypeVehiculeVo> {
        return this.http.put<TypeVehiculeVo>(this.API, this.selectedTypeVehicule);
    }


    public findByCriteria(typeVehicule: TypeVehiculeVo): Observable<Array<TypeVehiculeVo>> {
        return this.http.post<Array<TypeVehiculeVo>>(this.API + 'search', typeVehicule);
    }

    public findByIdWithAssociatedList(typeVehicule: TypeVehiculeVo): Observable<TypeVehiculeVo> {
        return this.http.get<TypeVehiculeVo>(this.API + 'detail/id/' + typeVehicule.id);
    }

    // getters and setters


    get typeVehicules(): Array<TypeVehiculeVo> {
        if (this._typeVehicules == null) {
            this._typeVehicules = new Array<TypeVehiculeVo>();
        }
        return this._typeVehicules;
    }

    set typeVehicules(value: Array<TypeVehiculeVo>) {
        this._typeVehicules = value;
    }

    get selectedTypeVehicule(): TypeVehiculeVo {
        if (this._selectedTypeVehicule == null) {
            this._selectedTypeVehicule = new TypeVehiculeVo();
        }
        return this._selectedTypeVehicule;
    }

    set selectedTypeVehicule(value: TypeVehiculeVo) {
        this._selectedTypeVehicule = value;
    }

    get typeVehiculeSelections(): Array<TypeVehiculeVo> {
        if (this._typeVehiculeSelections == null) {
            this._typeVehiculeSelections = new Array<TypeVehiculeVo>();
        }
        return this._typeVehiculeSelections;
    }


    set typeVehiculeSelections(value: Array<TypeVehiculeVo>) {
        this._typeVehiculeSelections = value;
    }

    get createTypeVehiculeDialog(): boolean {
        return this._createTypeVehiculeDialog;
    }

    set createTypeVehiculeDialog(value: boolean) {
        this._createTypeVehiculeDialog = value;
    }

    get editTypeVehiculeDialog(): boolean {
        return this._editTypeVehiculeDialog;
    }

    set editTypeVehiculeDialog(value: boolean) {
        this._editTypeVehiculeDialog = value;
    }

    get viewTypeVehiculeDialog(): boolean {
        return this._viewTypeVehiculeDialog;
    }

    set viewTypeVehiculeDialog(value: boolean) {
        this._viewTypeVehiculeDialog = value;
    }

    get searchTypeVehicule(): TypeVehiculeVo {
        if (this._searchTypeVehicule == null) {
            this._searchTypeVehicule = new TypeVehiculeVo();
        }
        return this._searchTypeVehicule;
    }

    set searchTypeVehicule(value: TypeVehiculeVo) {
        this._searchTypeVehicule = value;
    }

}
