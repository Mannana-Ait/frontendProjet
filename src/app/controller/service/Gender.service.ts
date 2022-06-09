import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {RoleService} from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {GenderVo} from '../model/Gender.model';


@Injectable({
    providedIn: 'root'
})
export class GenderService {
    private API = '';

    constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl + role.toLowerCase() + '/gender/';
        });
    }

    private _genders: Array<GenderVo>;
    private _selectedGender: GenderVo;
    private _genderSelections: Array<GenderVo>;
    private _createGenderDialog: boolean;
    private _editGenderDialog: boolean;
    private _viewGenderDialog: boolean;
    public editGender$ = new BehaviorSubject<boolean>(false);
    private role$: Observable<string>;
    private _searchGender: GenderVo;

    // methods

    public findAll() {
        return this.http.get<Array<GenderVo>>(this.API);
    }

    public save(): Observable<GenderVo> {
        return this.http.post<GenderVo>(this.API, this.selectedGender);
    }

    delete(gender: GenderVo) {
        return this.http.delete<number>(this.API + 'id/' + gender.id);
    }


    public edit(): Observable<GenderVo> {
        return this.http.put<GenderVo>(this.API, this.selectedGender);
    }


    public findByCriteria(gender: GenderVo): Observable<Array<GenderVo>> {
        return this.http.post<Array<GenderVo>>(this.API + 'search', gender);
    }

    public findByIdWithAssociatedList(gender: GenderVo): Observable<GenderVo> {
        return this.http.get<GenderVo>(this.API + 'detail/id/' + gender.id);
    }

    // getters and setters


    get genders(): Array<GenderVo> {
        if (this._genders == null) {
            this._genders = new Array<GenderVo>();
        }
        return this._genders;
    }

    set genders(value: Array<GenderVo>) {
        this._genders = value;
    }

    get selectedGender(): GenderVo {
        if (this._selectedGender == null) {
            this._selectedGender = new GenderVo();
        }
        return this._selectedGender;
    }

    set selectedGender(value: GenderVo) {
        this._selectedGender = value;
    }

    get genderSelections(): Array<GenderVo> {
        if (this._genderSelections == null) {
            this._genderSelections = new Array<GenderVo>();
        }
        return this._genderSelections;
    }


    set genderSelections(value: Array<GenderVo>) {
        this._genderSelections = value;
    }

    get createGenderDialog(): boolean {
        return this._createGenderDialog;
    }

    set createGenderDialog(value: boolean) {
        this._createGenderDialog = value;
    }

    get editGenderDialog(): boolean {
        return this._editGenderDialog;
    }

    set editGenderDialog(value: boolean) {
        this._editGenderDialog = value;
    }

    get viewGenderDialog(): boolean {
        return this._viewGenderDialog;
    }

    set viewGenderDialog(value: boolean) {
        this._viewGenderDialog = value;
    }

    get searchGender(): GenderVo {
        if (this._searchGender == null) {
            this._searchGender = new GenderVo();
        }
        return this._searchGender;
    }

    set searchGender(value: GenderVo) {
        this._searchGender = value;
    }

}
