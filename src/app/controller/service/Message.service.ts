import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {RoleService} from './role.service';
import * as moment from 'moment';
import {environment} from '../../../environments/environment';


import {MessageVo} from '../model/Message.model';
import {EtatMessageVo} from '../model/EtatMessage.model';


@Injectable({
    providedIn: 'root'
})
export class MessagesService {
    private API = '';

    constructor(private http: HttpClient, private roleService: RoleService) {
        this.role$ = this.roleService.role$;
        this.role$.subscribe(role => {
            this.API = environment.apiUrl + role.toLowerCase() + '/message/';
        });
    }

    private _messages: Array<MessageVo>;
    private _selectedMessage: MessageVo;
    private _messageSelections: Array<MessageVo>;
    private _createMessageDialog: boolean;
    private _editMessageDialog: boolean;
    private _viewMessageDialog: boolean;
    public editMessage$ = new BehaviorSubject<boolean>(false);
    private role$: Observable<string>;
    private _searchMessage: MessageVo;

    // methods

    public findAll() {
        return this.http.get<Array<MessageVo>>(this.API);
    }

    public save(): Observable<MessageVo> {
        return this.http.post<MessageVo>(this.API, {
            ...this.selectedMessage,
            dateEnvoi: moment(this.selectedMessage.dateEnvoi).format('YYYY-MM-DD')
        });
    }

    delete(message: MessageVo) {
        return this.http.delete<number>(this.API + 'id/' + message.id);
    }


    public edit(): Observable<MessageVo> {
        return this.http.put<MessageVo>(this.API, this.selectedMessage);
    }


    public findByCriteria(message: MessageVo): Observable<Array<MessageVo>> {
        return this.http.post<Array<MessageVo>>(this.API + 'search', message);
    }

    public findByIdWithAssociatedList(message: MessageVo): Observable<MessageVo> {
        return this.http.get<MessageVo>(this.API + 'detail/id/' + message.id);
    }

    // getters and setters


    get messages(): Array<MessageVo> {
        if (this._messages == null) {
            this._messages = new Array<MessageVo>();
        }
        return this._messages;
    }

    set messages(value: Array<MessageVo>) {
        this._messages = value;
    }

    get selectedMessage(): MessageVo {
        if (this._selectedMessage == null) {
            this._selectedMessage = new MessageVo();
        }
        return this._selectedMessage;
    }

    set selectedMessage(value: MessageVo) {
        this._selectedMessage = value;
    }

    get messageSelections(): Array<MessageVo> {
        if (this._messageSelections == null) {
            this._messageSelections = new Array<MessageVo>();
        }
        return this._messageSelections;
    }


    set messageSelections(value: Array<MessageVo>) {
        this._messageSelections = value;
    }

    get createMessageDialog(): boolean {
        return this._createMessageDialog;
    }

    set createMessageDialog(value: boolean) {
        this._createMessageDialog = value;
    }

    get editMessageDialog(): boolean {
        return this._editMessageDialog;
    }

    set editMessageDialog(value: boolean) {
        this._editMessageDialog = value;
    }

    get viewMessageDialog(): boolean {
        return this._viewMessageDialog;
    }

    set viewMessageDialog(value: boolean) {
        this._viewMessageDialog = value;
    }

    get searchMessage(): MessageVo {
        if (this._searchMessage == null) {
            this._searchMessage = new MessageVo();
        }
        return this._searchMessage;
    }

    set searchMessage(value: MessageVo) {
        this._searchMessage = value;
    }

}
