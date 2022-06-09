import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {RoleService} from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {MoniteurTheoriqueVo} from '../model/MoniteurTheorique.model';
import {GenderVo} from '../model/Gender.model';


@Injectable({
    providedIn: 'root'
})
export class MoniteurTheoriqueService {
    private API = '';

    constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl + role.toLowerCase() + '/moniteurTheorique/';
        });
    }

    private _moniteurTheoriques: Array<MoniteurTheoriqueVo>;
    private _selectedMoniteurTheorique: MoniteurTheoriqueVo;
    private _moniteurTheoriqueSelections: Array<MoniteurTheoriqueVo>;
    private _createMoniteurTheoriqueDialog: boolean;
    private _editMoniteurTheoriqueDialog: boolean;
    private _viewMoniteurTheoriqueDialog: boolean;
    public editMoniteurTheorique$ = new BehaviorSubject<boolean>(false);
    private role$: Observable<string>;
    private _searchMoniteurTheorique: MoniteurTheoriqueVo;

    // methods

    public findAll() {
        return this.http.get<Array<MoniteurTheoriqueVo>>(this.API);
    }

    public save(): Observable<MoniteurTheoriqueVo> {
        return this.http.post<MoniteurTheoriqueVo>(this.API, {
            ...this.selectedMoniteurTheorique,
            dateNaissance: moment(this.selectedMoniteurTheorique.dateNaissance).format('YYYY-MM-DD')
        });
    }

    delete(moniteurTheorique: MoniteurTheoriqueVo) {
        return this.http.delete<number>(this.API + 'id/' + moniteurTheorique.id);
    }


    public edit(): Observable<MoniteurTheoriqueVo> {
        return this.http.put<MoniteurTheoriqueVo>(this.API, this.selectedMoniteurTheorique);
    }


    public findByCriteria(moniteurTheorique: MoniteurTheoriqueVo): Observable<Array<MoniteurTheoriqueVo>> {
        return this.http.post<Array<MoniteurTheoriqueVo>>(this.API + 'search', moniteurTheorique);
    }

    public findByIdWithAssociatedList(moniteurTheorique: MoniteurTheoriqueVo): Observable<MoniteurTheoriqueVo> {
        return this.http.get<MoniteurTheoriqueVo>(this.API + 'detail/id/' + moniteurTheorique.id);
    }

    // getters and setters


    get moniteurTheoriques(): Array<MoniteurTheoriqueVo> {
        if (this._moniteurTheoriques == null) {
            this._moniteurTheoriques = new Array<MoniteurTheoriqueVo>();
        }
        return this._moniteurTheoriques;
    }

    set moniteurTheoriques(value: Array<MoniteurTheoriqueVo>) {
        this._moniteurTheoriques = value;
    }

    get selectedMoniteurTheorique(): MoniteurTheoriqueVo {
        if (this._selectedMoniteurTheorique == null) {
            this._selectedMoniteurTheorique = new MoniteurTheoriqueVo();
        }
        return this._selectedMoniteurTheorique;
    }

    set selectedMoniteurTheorique(value: MoniteurTheoriqueVo) {
        this._selectedMoniteurTheorique = value;
    }

    get moniteurTheoriqueSelections(): Array<MoniteurTheoriqueVo> {
        if (this._moniteurTheoriqueSelections == null) {
            this._moniteurTheoriqueSelections = new Array<MoniteurTheoriqueVo>();
        }
        return this._moniteurTheoriqueSelections;
    }


    set moniteurTheoriqueSelections(value: Array<MoniteurTheoriqueVo>) {
        this._moniteurTheoriqueSelections = value;
    }

    get createMoniteurTheoriqueDialog(): boolean {
        return this._createMoniteurTheoriqueDialog;
    }

    set createMoniteurTheoriqueDialog(value: boolean) {
        this._createMoniteurTheoriqueDialog = value;
    }

    get editMoniteurTheoriqueDialog(): boolean {
        return this._editMoniteurTheoriqueDialog;
    }

    set editMoniteurTheoriqueDialog(value: boolean) {
        this._editMoniteurTheoriqueDialog = value;
    }

    get viewMoniteurTheoriqueDialog(): boolean {
        return this._viewMoniteurTheoriqueDialog;
    }

    set viewMoniteurTheoriqueDialog(value: boolean) {
        this._viewMoniteurTheoriqueDialog = value;
    }

    get searchMoniteurTheorique(): MoniteurTheoriqueVo {
        if (this._searchMoniteurTheorique == null) {
            this._searchMoniteurTheorique = new MoniteurTheoriqueVo();
        }
        return this._searchMoniteurTheorique;
    }

    set searchMoniteurTheorique(value: MoniteurTheoriqueVo) {
        this._searchMoniteurTheorique = value;
    }

}
