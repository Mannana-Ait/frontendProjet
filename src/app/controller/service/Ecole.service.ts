import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {RoleService} from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {EcoleVo} from '../model/Ecole.model';
import {VehiculeVo} from '../model/Vehicule.model';
import {PlanningItemVo} from '../model/PlanningItem.model';
import {MoniteurPratiqueVo} from '../model/MoniteurPratique.model';
import {MoniteurTheoriqueVo} from '../model/MoniteurTheorique.model';
import {VilleVo} from '../model/Ville.model';
import {GerantVo} from '../model/Gerant.model';


@Injectable({
    providedIn: 'root'
})
export class EcoleService {
    private API = '';

    constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl + role.toLowerCase() + '/ecole/';
        });
    }

    private _ecoles: Array<EcoleVo>;
    private _selectedEcole: EcoleVo;
    private _ecoleSelections: Array<EcoleVo>;
    private _createEcoleDialog: boolean;
    private _editEcoleDialog: boolean;
    private _viewEcoleDialog: boolean;
    public editEcole$ = new BehaviorSubject<boolean>(false);
    private role$: Observable<string>;
    private _searchEcole: EcoleVo;

    // methods

    public findAll() {
        return this.http.get<Array<EcoleVo>>(this.API);
    }

    public save(): Observable<EcoleVo> {
        return this.http.post<EcoleVo>(this.API, {
            ...this.selectedEcole,
            dateAbonnement: moment(this.selectedEcole.dateAbonnement).format('YYYY-MM-DD')
        });
    }

    delete(ecole: EcoleVo) {
        return this.http.delete<number>(this.API + 'id/' + ecole.id);
    }


    public edit(): Observable<EcoleVo> {
        return this.http.put<EcoleVo>(this.API, this.selectedEcole);
    }


    public findByCriteria(ecole: EcoleVo): Observable<Array<EcoleVo>> {
        return this.http.post<Array<EcoleVo>>(this.API + 'search', ecole);
    }

    public findByIdWithAssociatedList(ecole: EcoleVo): Observable<EcoleVo> {
        return this.http.get<EcoleVo>(this.API + 'detail/id/' + ecole.id);
    }

    // getters and setters


    get ecoles(): Array<EcoleVo> {
        if (this._ecoles == null) {
            this._ecoles = new Array<EcoleVo>();
        }
        return this._ecoles;
    }

    set ecoles(value: Array<EcoleVo>) {
        this._ecoles = value;
    }

    get selectedEcole(): EcoleVo {
        if (this._selectedEcole == null) {
            this._selectedEcole = new EcoleVo();
        }
        return this._selectedEcole;
    }

    set selectedEcole(value: EcoleVo) {
        this._selectedEcole = value;
    }

    get ecoleSelections(): Array<EcoleVo> {
        if (this._ecoleSelections == null) {
            this._ecoleSelections = new Array<EcoleVo>();
        }
        return this._ecoleSelections;
    }


    set ecoleSelections(value: Array<EcoleVo>) {
        this._ecoleSelections = value;
    }

    get createEcoleDialog(): boolean {
        return this._createEcoleDialog;
    }

    set createEcoleDialog(value: boolean) {
        this._createEcoleDialog = value;
    }

    get editEcoleDialog(): boolean {
        return this._editEcoleDialog;
    }

    set editEcoleDialog(value: boolean) {
        this._editEcoleDialog = value;
    }

    get viewEcoleDialog(): boolean {
        return this._viewEcoleDialog;
    }

    set viewEcoleDialog(value: boolean) {
        this._viewEcoleDialog = value;
    }

    get searchEcole(): EcoleVo {
        if (this._searchEcole == null) {
            this._searchEcole = new EcoleVo();
        }
        return this._searchEcole;
    }

    set searchEcole(value: EcoleVo) {
        this._searchEcole = value;
    }

}
