import {Component, OnInit, Input} from '@angular/core';
import {MarqueService} from 'src/app/controller/service/Marque.service';
import {MarqueVo} from 'src/app/controller/model/Marque.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {environment} from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {StringUtilService} from 'src/app/controller/service/StringUtil.service';


@Component({
    selector: 'app-marque-edit-chercheur',
    templateUrl: './marque-edit-chercheur.component.html',
    styleUrls: ['./marque-edit-chercheur.component.css']
})
export class MarqueEditChercheurComponent implements OnInit {

    _submitted = false;
    private _errorMessages = new Array<string>();


    constructor(private datePipe: DatePipe, private marqueService: MarqueService
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
        this.marqueService.edit().subscribe(marque => {
            const myIndex = this.marques.findIndex(e => e.id === this.selectedMarque.id);
            this.marques[myIndex] = this.selectedMarque;
            this.editMarqueDialog = false;
            this.submitted = false;
            this.selectedMarque = new MarqueVo();


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
        this.editMarqueDialog = false;
        this.setValidation(true);
    }

// getters and setters

    get marques(): Array<MarqueVo> {
        return this.marqueService.marques;
    }

    set marques(value: Array<MarqueVo>) {
        this.marqueService.marques = value;
    }

    get selectedMarque(): MarqueVo {
        return this.marqueService.selectedMarque;
    }

    set selectedMarque(value: MarqueVo) {
        this.marqueService.selectedMarque = value;
    }

    get editMarqueDialog(): boolean {
        return this.marqueService.createMarqueDialog;

    }

    set editMarqueDialog(value: boolean) {
        this.marqueService.createMarqueDialog = value;
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
