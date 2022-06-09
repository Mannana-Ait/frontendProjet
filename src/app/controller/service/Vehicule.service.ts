import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {RoleService} from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {VehiculeVo} from '../model/Vehicule.model';
import {EcoleVo} from '../model/Ecole.model';
import {MarqueVo} from '../model/Marque.model';
import {TypeVehiculeVo} from '../model/TypeVehicule.model';


@Injectable({
    providedIn: 'root'
})
export class VehiculeService {
    private API = '';

    constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl + role.toLowerCase() + '/vehicule/';
        });
    }

    private _vehicules: Array<VehiculeVo>;
    private _selectedVehicule: VehiculeVo;
    private _vehiculeSelections: Array<VehiculeVo>;
    private _createVehiculeDialog: boolean;
    private _editVehiculeDialog: boolean;
    private _viewVehiculeDialog: boolean;
    public editVehicule$ = new BehaviorSubject<boolean>(false);
    private role$: Observable<string>;
    private _searchVehicule: VehiculeVo;

    // methods

    public findAll() {
        return this.http.get<Array<VehiculeVo>>(this.API);
    }

    public save(): Observable<VehiculeVo> {
        return this.http.post<VehiculeVo>(this.API, {
            ...this.selectedVehicule,
            dateAchatVehicule: moment(this.selectedVehicule.dateAchatVehicule).format('YYYY-MM-DD')
        });
    }

    delete(vehicule: VehiculeVo) {
        return this.http.delete<number>(this.API + 'id/' + vehicule.id);
    }


    public edit(): Observable<VehiculeVo> {
        return this.http.put<VehiculeVo>(this.API, this.selectedVehicule);
    }


    public findByCriteria(vehicule: VehiculeVo): Observable<Array<VehiculeVo>> {
        return this.http.post<Array<VehiculeVo>>(this.API + 'search', vehicule);
    }

    public findByIdWithAssociatedList(vehicule: VehiculeVo): Observable<VehiculeVo> {
        return this.http.get<VehiculeVo>(this.API + 'detail/id/' + vehicule.id);
    }

    // getters and setters


    get vehicules(): Array<VehiculeVo> {
        if (this._vehicules == null) {
            this._vehicules = new Array<VehiculeVo>();
        }
        return this._vehicules;
    }

    set vehicules(value: Array<VehiculeVo>) {
        this._vehicules = value;
    }

    get selectedVehicule(): VehiculeVo {
        if (this._selectedVehicule == null) {
            this._selectedVehicule = new VehiculeVo();
        }
        return this._selectedVehicule;
    }

    set selectedVehicule(value: VehiculeVo) {
        this._selectedVehicule = value;
    }

    get vehiculeSelections(): Array<VehiculeVo> {
        if (this._vehiculeSelections == null) {
            this._vehiculeSelections = new Array<VehiculeVo>();
        }
        return this._vehiculeSelections;
    }


    set vehiculeSelections(value: Array<VehiculeVo>) {
        this._vehiculeSelections = value;
    }

    get createVehiculeDialog(): boolean {
        return this._createVehiculeDialog;
    }

    set createVehiculeDialog(value: boolean) {
        this._createVehiculeDialog = value;
    }

    get editVehiculeDialog(): boolean {
        return this._editVehiculeDialog;
    }

    set editVehiculeDialog(value: boolean) {
        this._editVehiculeDialog = value;
    }

    get viewVehiculeDialog(): boolean {
        return this._viewVehiculeDialog;
    }

    set viewVehiculeDialog(value: boolean) {
        this._viewVehiculeDialog = value;
    }

    get searchVehicule(): VehiculeVo {
        if (this._searchVehicule == null) {
            this._searchVehicule = new VehiculeVo();
        }
        return this._searchVehicule;
    }

    set searchVehicule(value: VehiculeVo) {
        this._searchVehicule = value;
    }

}
