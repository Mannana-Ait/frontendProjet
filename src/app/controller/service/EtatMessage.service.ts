import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {RoleService} from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {EtatMessageVo} from '../model/EtatMessage.model';


@Injectable({
    providedIn: 'root'
})
export class EtatMessageService {
    private API = '';

    constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl + role.toLowerCase() + '/etatMessage/';
        });
    }

    private _etatMessages: Array<EtatMessageVo>;
    private _selectedEtatMessage: EtatMessageVo;
    private _etatMessageSelections: Array<EtatMessageVo>;
    private _createEtatMessageDialog: boolean;
    private _editEtatMessageDialog: boolean;
    private _viewEtatMessageDialog: boolean;
    public editEtatMessage$ = new BehaviorSubject<boolean>(false);
    private role$: Observable<string>;
    private _searchEtatMessage: EtatMessageVo;

    // methods

    public findAll() {
        return this.http.get<Array<EtatMessageVo>>(this.API);
    }

    public save(): Observable<EtatMessageVo> {
        return this.http.post<EtatMessageVo>(this.API, this.selectedEtatMessage);
    }

    delete(etatMessage: EtatMessageVo) {
        return this.http.delete<number>(this.API + 'id/' + etatMessage.id);
    }


    public edit(): Observable<EtatMessageVo> {
        return this.http.put<EtatMessageVo>(this.API, this.selectedEtatMessage);
    }


    public findByCriteria(etatMessage: EtatMessageVo): Observable<Array<EtatMessageVo>> {
        return this.http.post<Array<EtatMessageVo>>(this.API + 'search', etatMessage);
    }

    public findByIdWithAssociatedList(etatMessage: EtatMessageVo): Observable<EtatMessageVo> {
        return this.http.get<EtatMessageVo>(this.API + 'detail/id/' + etatMessage.id);
    }

    // getters and setters


    get etatMessages(): Array<EtatMessageVo> {
        if (this._etatMessages == null) {
            this._etatMessages = new Array<EtatMessageVo>();
        }
        return this._etatMessages;
    }

    set etatMessages(value: Array<EtatMessageVo>) {
        this._etatMessages = value;
    }

    get selectedEtatMessage(): EtatMessageVo {
        if (this._selectedEtatMessage == null) {
            this._selectedEtatMessage = new EtatMessageVo();
        }
        return this._selectedEtatMessage;
    }

    set selectedEtatMessage(value: EtatMessageVo) {
        this._selectedEtatMessage = value;
    }

    get etatMessageSelections(): Array<EtatMessageVo> {
        if (this._etatMessageSelections == null) {
            this._etatMessageSelections = new Array<EtatMessageVo>();
        }
        return this._etatMessageSelections;
    }


    set etatMessageSelections(value: Array<EtatMessageVo>) {
        this._etatMessageSelections = value;
    }

    get createEtatMessageDialog(): boolean {
        return this._createEtatMessageDialog;
    }

    set createEtatMessageDialog(value: boolean) {
        this._createEtatMessageDialog = value;
    }

    get editEtatMessageDialog(): boolean {
        return this._editEtatMessageDialog;
    }

    set editEtatMessageDialog(value: boolean) {
        this._editEtatMessageDialog = value;
    }

    get viewEtatMessageDialog(): boolean {
        return this._viewEtatMessageDialog;
    }

    set viewEtatMessageDialog(value: boolean) {
        this._viewEtatMessageDialog = value;
    }

    get searchEtatMessage(): EtatMessageVo {
        if (this._searchEtatMessage == null) {
            this._searchEtatMessage = new EtatMessageVo();
        }
        return this._searchEtatMessage;
    }

    set searchEtatMessage(value: EtatMessageVo) {
        this._searchEtatMessage = value;
    }

}
