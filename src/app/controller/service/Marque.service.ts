import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {RoleService} from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {MarqueVo} from '../model/Marque.model';


@Injectable({
    providedIn: 'root'
})
export class MarqueService {
    private API = '';

    constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl + role.toLowerCase() + '/marque/';
        });
    }

    private _marques: Array<MarqueVo>;
    private _selectedMarque: MarqueVo;
    private _marqueSelections: Array<MarqueVo>;
    private _createMarqueDialog: boolean;
    private _editMarqueDialog: boolean;
    private _viewMarqueDialog: boolean;
    public editMarque$ = new BehaviorSubject<boolean>(false);
    private role$: Observable<string>;
    private _searchMarque: MarqueVo;

    // methods

    public findAll() {
        return this.http.get<Array<MarqueVo>>(this.API);
    }

    public save(): Observable<MarqueVo> {
        return this.http.post<MarqueVo>(this.API, this.selectedMarque);
    }

    delete(marque: MarqueVo) {
        return this.http.delete<number>(this.API + 'id/' + marque.id);
    }


    public edit(): Observable<MarqueVo> {
        return this.http.put<MarqueVo>(this.API, this.selectedMarque);
    }


    public findByCriteria(marque: MarqueVo): Observable<Array<MarqueVo>> {
        return this.http.post<Array<MarqueVo>>(this.API + 'search', marque);
    }

    public findByIdWithAssociatedList(marque: MarqueVo): Observable<MarqueVo> {
        return this.http.get<MarqueVo>(this.API + 'detail/id/' + marque.id);
    }

    // getters and setters


    get marques(): Array<MarqueVo> {
        if (this._marques == null) {
            this._marques = new Array<MarqueVo>();
        }
        return this._marques;
    }

    set marques(value: Array<MarqueVo>) {
        this._marques = value;
    }

    get selectedMarque(): MarqueVo {
        if (this._selectedMarque == null) {
            this._selectedMarque = new MarqueVo();
        }
        return this._selectedMarque;
    }

    set selectedMarque(value: MarqueVo) {
        this._selectedMarque = value;
    }

    get marqueSelections(): Array<MarqueVo> {
        if (this._marqueSelections == null) {
            this._marqueSelections = new Array<MarqueVo>();
        }
        return this._marqueSelections;
    }


    set marqueSelections(value: Array<MarqueVo>) {
        this._marqueSelections = value;
    }

    get createMarqueDialog(): boolean {
        return this._createMarqueDialog;
    }

    set createMarqueDialog(value: boolean) {
        this._createMarqueDialog = value;
    }

    get editMarqueDialog(): boolean {
        return this._editMarqueDialog;
    }

    set editMarqueDialog(value: boolean) {
        this._editMarqueDialog = value;
    }

    get viewMarqueDialog(): boolean {
        return this._viewMarqueDialog;
    }

    set viewMarqueDialog(value: boolean) {
        this._viewMarqueDialog = value;
    }

    get searchMarque(): MarqueVo {
        if (this._searchMarque == null) {
            this._searchMarque = new MarqueVo();
        }
        return this._searchMarque;
    }

    set searchMarque(value: MarqueVo) {
        this._searchMarque = value;
    }

}
