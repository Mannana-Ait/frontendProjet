import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {RoleService} from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {MoniteurPratiqueVo} from '../model/MoniteurPratique.model';
import {GenderVo} from '../model/Gender.model';


@Injectable({
    providedIn: 'root'
})
export class MoniteurPratiqueService {
    private API = '';

    constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl + role.toLowerCase() + '/moniteurPratique/';
        });
    }

    private _moniteurPratiques: Array<MoniteurPratiqueVo>;
    private _selectedMoniteurPratique: MoniteurPratiqueVo;
    private _moniteurPratiqueSelections: Array<MoniteurPratiqueVo>;
    private _createMoniteurPratiqueDialog: boolean;
    private _editMoniteurPratiqueDialog: boolean;
    private _viewMoniteurPratiqueDialog: boolean;
    public editMoniteurPratique$ = new BehaviorSubject<boolean>(false);
    private role$: Observable<string>;
    private _searchMoniteurPratique: MoniteurPratiqueVo;

    // methods

    public findAll() {
        return this.http.get<Array<MoniteurPratiqueVo>>(this.API);
    }

    public save(): Observable<MoniteurPratiqueVo> {
        return this.http.post<MoniteurPratiqueVo>(this.API, {
            ...this.selectedMoniteurPratique,
            dateNaissance: moment(this.selectedMoniteurPratique.dateNaissance).format('YYYY-MM-DD')
        });
    }

    delete(moniteurPratique: MoniteurPratiqueVo) {
        return this.http.delete<number>(this.API + 'id/' + moniteurPratique.id);
    }


    public edit(): Observable<MoniteurPratiqueVo> {
        return this.http.put<MoniteurPratiqueVo>(this.API, this.selectedMoniteurPratique);
    }


    public findByCriteria(moniteurPratique: MoniteurPratiqueVo): Observable<Array<MoniteurPratiqueVo>> {
        return this.http.post<Array<MoniteurPratiqueVo>>(this.API + 'search', moniteurPratique);
    }

    public findByIdWithAssociatedList(moniteurPratique: MoniteurPratiqueVo): Observable<MoniteurPratiqueVo> {
        return this.http.get<MoniteurPratiqueVo>(this.API + 'detail/id/' + moniteurPratique.id);
    }

    // getters and setters


    get moniteurPratiques(): Array<MoniteurPratiqueVo> {
        if (this._moniteurPratiques == null) {
            this._moniteurPratiques = new Array<MoniteurPratiqueVo>();
        }
        return this._moniteurPratiques;
    }

    set moniteurPratiques(value: Array<MoniteurPratiqueVo>) {
        this._moniteurPratiques = value;
    }

    get selectedMoniteurPratique(): MoniteurPratiqueVo {
        if (this._selectedMoniteurPratique == null) {
            this._selectedMoniteurPratique = new MoniteurPratiqueVo();
        }
        return this._selectedMoniteurPratique;
    }

    set selectedMoniteurPratique(value: MoniteurPratiqueVo) {
        this._selectedMoniteurPratique = value;
    }

    get moniteurPratiqueSelections(): Array<MoniteurPratiqueVo> {
        if (this._moniteurPratiqueSelections == null) {
            this._moniteurPratiqueSelections = new Array<MoniteurPratiqueVo>();
        }
        return this._moniteurPratiqueSelections;
    }


    set moniteurPratiqueSelections(value: Array<MoniteurPratiqueVo>) {
        this._moniteurPratiqueSelections = value;
    }

    get createMoniteurPratiqueDialog(): boolean {
        return this._createMoniteurPratiqueDialog;
    }

    set createMoniteurPratiqueDialog(value: boolean) {
        this._createMoniteurPratiqueDialog = value;
    }

    get editMoniteurPratiqueDialog(): boolean {
        return this._editMoniteurPratiqueDialog;
    }

    set editMoniteurPratiqueDialog(value: boolean) {
        this._editMoniteurPratiqueDialog = value;
    }

    get viewMoniteurPratiqueDialog(): boolean {
        return this._viewMoniteurPratiqueDialog;
    }

    set viewMoniteurPratiqueDialog(value: boolean) {
        this._viewMoniteurPratiqueDialog = value;
    }

    get searchMoniteurPratique(): MoniteurPratiqueVo {
        if (this._searchMoniteurPratique == null) {
            this._searchMoniteurPratique = new MoniteurPratiqueVo();
        }
        return this._searchMoniteurPratique;
    }

    set searchMoniteurPratique(value: MoniteurPratiqueVo) {
        this._searchMoniteurPratique = value;
    }

}
