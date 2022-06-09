import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {RoleService} from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {JourVo} from '../model/Jour.model';


@Injectable({
    providedIn: 'root'
})
export class JourService {
    private API = '';

    constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl + role.toLowerCase() + '/jour/';
        });
    }

    private _jours: Array<JourVo>;
    private _selectedJour: JourVo;
    private _jourSelections: Array<JourVo>;
    private _createJourDialog: boolean;
    private _editJourDialog: boolean;
    private _viewJourDialog: boolean;
    public editJour$ = new BehaviorSubject<boolean>(false);
    private role$: Observable<string>;
    private _searchJour: JourVo;

    // methods

    public findAll() {
        return this.http.get<Array<JourVo>>(this.API);
    }

    public save(): Observable<JourVo> {
        return this.http.post<JourVo>(this.API, this.selectedJour);
    }

    delete(jour: JourVo) {
        return this.http.delete<number>(this.API + 'id/' + jour.id);
    }


    public edit(): Observable<JourVo> {
        return this.http.put<JourVo>(this.API, this.selectedJour);
    }


    public findByCriteria(jour: JourVo): Observable<Array<JourVo>> {
        return this.http.post<Array<JourVo>>(this.API + 'search', jour);
    }

    public findByIdWithAssociatedList(jour: JourVo): Observable<JourVo> {
        return this.http.get<JourVo>(this.API + 'detail/id/' + jour.id);
    }

    // getters and setters


    get jours(): Array<JourVo> {
        if (this._jours == null) {
            this._jours = new Array<JourVo>();
        }
        return this._jours;
    }

    set jours(value: Array<JourVo>) {
        this._jours = value;
    }

    get selectedJour(): JourVo {
        if (this._selectedJour == null) {
            this._selectedJour = new JourVo();
        }
        return this._selectedJour;
    }

    set selectedJour(value: JourVo) {
        this._selectedJour = value;
    }

    get jourSelections(): Array<JourVo> {
        if (this._jourSelections == null) {
            this._jourSelections = new Array<JourVo>();
        }
        return this._jourSelections;
    }


    set jourSelections(value: Array<JourVo>) {
        this._jourSelections = value;
    }

    get createJourDialog(): boolean {
        return this._createJourDialog;
    }

    set createJourDialog(value: boolean) {
        this._createJourDialog = value;
    }

    get editJourDialog(): boolean {
        return this._editJourDialog;
    }

    set editJourDialog(value: boolean) {
        this._editJourDialog = value;
    }

    get viewJourDialog(): boolean {
        return this._viewJourDialog;
    }

    set viewJourDialog(value: boolean) {
        this._viewJourDialog = value;
    }

    get searchJour(): JourVo {
        if (this._searchJour == null) {
            this._searchJour = new JourVo();
        }
        return this._searchJour;
    }

    set searchJour(value: JourVo) {
        this._searchJour = value;
    }

}
