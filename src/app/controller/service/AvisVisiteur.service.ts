import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {RoleService} from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {AvisVisiteurVo} from '../model/AvisVisiteur.model';
import {TypeAvisVo} from '../model/TypeAvis.model';


@Injectable({
    providedIn: 'root'
})
export class AvisVisiteurService {
    private API = '';

    constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl + role.toLowerCase() + '/avisVisiteur/';
        });
    }

    private _avisVisiteurs: Array<AvisVisiteurVo>;
    private _selectedAvisVisiteur: AvisVisiteurVo;
    private _avisVisiteurSelections: Array<AvisVisiteurVo>;
    private _createAvisVisiteurDialog: boolean;
    private _editAvisVisiteurDialog: boolean;
    private _viewAvisVisiteurDialog: boolean;
    public editAvisVisiteur$ = new BehaviorSubject<boolean>(false);
    private role$: Observable<string>;
    private _searchAvisVisiteur: AvisVisiteurVo;

    // methods

    public findAll() {
        return this.http.get<Array<AvisVisiteurVo>>(this.API);
    }

    public save(): Observable<AvisVisiteurVo> {
        return this.http.post<AvisVisiteurVo>(this.API, this.selectedAvisVisiteur);
    }

    delete(avisVisiteur: AvisVisiteurVo) {
        return this.http.delete<number>(this.API + 'id/' + avisVisiteur.id);
    }


    public edit(): Observable<AvisVisiteurVo> {
        return this.http.put<AvisVisiteurVo>(this.API, this.selectedAvisVisiteur);
    }


    public findByCriteria(avisVisiteur: AvisVisiteurVo): Observable<Array<AvisVisiteurVo>> {
        return this.http.post<Array<AvisVisiteurVo>>(this.API + 'search', avisVisiteur);
    }

    public findByIdWithAssociatedList(avisVisiteur: AvisVisiteurVo): Observable<AvisVisiteurVo> {
        return this.http.get<AvisVisiteurVo>(this.API + 'detail/id/' + avisVisiteur.id);
    }

    // getters and setters


    get avisVisiteurs(): Array<AvisVisiteurVo> {
        if (this._avisVisiteurs == null) {
            this._avisVisiteurs = new Array<AvisVisiteurVo>();
        }
        return this._avisVisiteurs;
    }

    set avisVisiteurs(value: Array<AvisVisiteurVo>) {
        this._avisVisiteurs = value;
    }

    get selectedAvisVisiteur(): AvisVisiteurVo {
        if (this._selectedAvisVisiteur == null) {
            this._selectedAvisVisiteur = new AvisVisiteurVo();
        }
        return this._selectedAvisVisiteur;
    }

    set selectedAvisVisiteur(value: AvisVisiteurVo) {
        this._selectedAvisVisiteur = value;
    }

    get avisVisiteurSelections(): Array<AvisVisiteurVo> {
        if (this._avisVisiteurSelections == null) {
            this._avisVisiteurSelections = new Array<AvisVisiteurVo>();
        }
        return this._avisVisiteurSelections;
    }


    set avisVisiteurSelections(value: Array<AvisVisiteurVo>) {
        this._avisVisiteurSelections = value;
    }

    get createAvisVisiteurDialog(): boolean {
        return this._createAvisVisiteurDialog;
    }

    set createAvisVisiteurDialog(value: boolean) {
        this._createAvisVisiteurDialog = value;
    }

    get editAvisVisiteurDialog(): boolean {
        return this._editAvisVisiteurDialog;
    }

    set editAvisVisiteurDialog(value: boolean) {
        this._editAvisVisiteurDialog = value;
    }

    get viewAvisVisiteurDialog(): boolean {
        return this._viewAvisVisiteurDialog;
    }

    set viewAvisVisiteurDialog(value: boolean) {
        this._viewAvisVisiteurDialog = value;
    }

    get searchAvisVisiteur(): AvisVisiteurVo {
        if (this._searchAvisVisiteur == null) {
            this._searchAvisVisiteur = new AvisVisiteurVo();
        }
        return this._searchAvisVisiteur;
    }

    set searchAvisVisiteur(value: AvisVisiteurVo) {
        this._searchAvisVisiteur = value;
    }

}
