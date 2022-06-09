import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {RoleService} from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {GerantVo} from '../model/Gerant.model';
import {GenderVo} from '../model/Gender.model';


@Injectable({
    providedIn: 'root'
})
export class GerantService {
    private API = '';

    constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl + role.toLowerCase() + '/gerant/';
        });
    }

    private _gerants: Array<GerantVo>;
    private _selectedGerant: GerantVo;
    private _gerantSelections: Array<GerantVo>;
    private _createGerantDialog: boolean;
    private _editGerantDialog: boolean;
    private _viewGerantDialog: boolean;
    public editGerant$ = new BehaviorSubject<boolean>(false);
    private role$: Observable<string>;
    private _searchGerant: GerantVo;

    // methods

    public findAll() {
        return this.http.get<Array<GerantVo>>(this.API);
    }

    public save(): Observable<GerantVo> {
        return this.http.post<GerantVo>(this.API, {
            ...this.selectedGerant,
            dateJoin: moment(this.selectedGerant.dateJoin).format('YYYY-MM-DD')
        });
    }

    delete(gerant: GerantVo) {
        return this.http.delete<number>(this.API + 'id/' + gerant.id);
    }


    public edit(): Observable<GerantVo> {
        return this.http.put<GerantVo>(this.API, this.selectedGerant);
    }


    public findByCriteria(gerant: GerantVo): Observable<Array<GerantVo>> {
        return this.http.post<Array<GerantVo>>(this.API + 'search', gerant);
    }

    public findByIdWithAssociatedList(gerant: GerantVo): Observable<GerantVo> {
        return this.http.get<GerantVo>(this.API + 'detail/id/' + gerant.id);
    }

    // getters and setters


    get gerants(): Array<GerantVo> {
        if (this._gerants == null) {
            this._gerants = new Array<GerantVo>();
        }
        return this._gerants;
    }

    set gerants(value: Array<GerantVo>) {
        this._gerants = value;
    }

    get selectedGerant(): GerantVo {
        if (this._selectedGerant == null) {
            this._selectedGerant = new GerantVo();
        }
        return this._selectedGerant;
    }

    set selectedGerant(value: GerantVo) {
        this._selectedGerant = value;
    }

    get gerantSelections(): Array<GerantVo> {
        if (this._gerantSelections == null) {
            this._gerantSelections = new Array<GerantVo>();
        }
        return this._gerantSelections;
    }


    set gerantSelections(value: Array<GerantVo>) {
        this._gerantSelections = value;
    }

    get createGerantDialog(): boolean {
        return this._createGerantDialog;
    }

    set createGerantDialog(value: boolean) {
        this._createGerantDialog = value;
    }

    get editGerantDialog(): boolean {
        return this._editGerantDialog;
    }

    set editGerantDialog(value: boolean) {
        this._editGerantDialog = value;
    }

    get viewGerantDialog(): boolean {
        return this._viewGerantDialog;
    }

    set viewGerantDialog(value: boolean) {
        this._viewGerantDialog = value;
    }

    get searchGerant(): GerantVo {
        if (this._searchGerant == null) {
            this._searchGerant = new GerantVo();
        }
        return this._searchGerant;
    }

    set searchGerant(value: GerantVo) {
        this._searchGerant = value;
    }

}
