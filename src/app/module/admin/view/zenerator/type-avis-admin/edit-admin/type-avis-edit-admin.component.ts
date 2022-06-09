import {Component, OnInit, Input} from '@angular/core';
import {TypeAvisService} from 'src/app/controller/service/TypeAvis.service';
import {TypeAvisVo} from 'src/app/controller/model/TypeAvis.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


@Component({
    selector: 'app-type-avis-edit-admin',
    templateUrl: './type-avis-edit-admin.component.html',
    styleUrls: ['./type-avis-edit-admin.component.css']
})
export class TypeAvisEditAdminComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    constructor(private datePipe: DatePipe, private typeAvisService: TypeAvisService
        , private stringUtilService: StringUtilService
        , private roleService: RoleService
        , private messageService: MessageService
        , private router: Router
    ) {

    }


// methods
    ngOnInit(): void {

    }


    private setValidation(value: boolean) {
    }


    public edit() {
        this.submitted = true;
        this.validateForm();
        if (this.errorMessages.length === 0) {
            this.editWithShowOption(false);
        } else {
            this.messageService.add({severity: 'error', summary: 'Erreurs', detail: 'Merci de corrigé les erreurs sur le formulaire'});
        }
    }

    public editWithShowOption(showList: boolean) {
        this.typeAvisService.edit().subscribe(typeAvis => {
            const myIndex = this.typeAviss.findIndex(e => e.id === this.selectedTypeAvis.id);
            this.typeAviss[myIndex] = this.selectedTypeAvis;
            this.editTypeAvisDialog = false;
            this.submitted = false;
            this.selectedTypeAvis = new TypeAvisVo();


        }, error => {
            console.log(error);
        });

    }

//validation methods
    private validateForm(): void {
        this.errorMessages = new Array<string>();

    }


//openPopup
// methods

    hideEditDialog() {
        this.editTypeAvisDialog = false;
        this.setValidation(true);
    }

// getters and setters

    get typeAviss(): Array<TypeAvisVo> {
        return this.typeAvisService.typeAviss;
    }

    set typeAviss(value: Array<TypeAvisVo>) {
        this.typeAvisService.typeAviss = value;
    }

    get selectedTypeAvis(): TypeAvisVo {
        return this.typeAvisService.selectedTypeAvis;
    }

    set selectedTypeAvis(value: TypeAvisVo) {
        this.typeAvisService.selectedTypeAvis = value;
    }

    get editTypeAvisDialog(): boolean {
        return this.typeAvisService.editTypeAvisDialog;

    }

    set editTypeAvisDialog(value: boolean) {
        this.typeAvisService.editTypeAvisDialog = value;
    }


    get dateFormat() {
        return environment.dateFormatEdit;
    }

    get dateFormatColumn() {
        return environment.dateFormatEdit;
    }

    get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }


    get errorMessages(): string[] {
        return this._errorMessages;
    }

    set errorMessages(value: string[]) {
        this._errorMessages = value;
    }


}
