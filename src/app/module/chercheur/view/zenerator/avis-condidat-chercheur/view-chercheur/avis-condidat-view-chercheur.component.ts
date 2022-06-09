import {Component, OnInit} from '@angular/core';
import {AvisCondidatService} from 'src/app/controller/service/AvisCondidat.service';
import {AvisCondidatVo} from 'src/app/controller/model/AvisCondidat.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {EcoleVo} from 'src/app/controller/model/Ecole.model';
import {EcoleService} from 'src/app/controller/service/Ecole.service';
import {TypeAvisVo} from 'src/app/controller/model/TypeAvis.model';
import {TypeAvisService} from 'src/app/controller/service/TypeAvis.service';

@Component({
  selector: 'app-avis-condidat-view-chercheur',
  templateUrl: './avis-condidat-view-chercheur.component.html',
  styleUrls: ['./avis-condidat-view-chercheur.component.css']
})
export class AvisCondidatViewChercheurComponent implements OnInit {


constructor(private datePipe: DatePipe, private avisCondidatService: AvisCondidatService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private ecoleService: EcoleService
    ,private typeAvisService: TypeAvisService
) {
}

// methods
ngOnInit(): void {
    this.selectedEcole = new EcoleVo();
    this.ecoleService.findAll().subscribe((data) => this.ecoles = data);
    this.selectedTypeAvis = new TypeAvisVo();
    this.typeAvisService.findAll().subscribe((data) => this.typeAviss = data);
}

hideViewDialog(){
    this.viewAvisCondidatDialog  = false;
}

// getters and setters

get avisCondidats(): Array<AvisCondidatVo> {
    return this.avisCondidatService.avisCondidats;
       }
set avisCondidats(value: Array<AvisCondidatVo>) {
        this.avisCondidatService.avisCondidats = value;
       }

 get selectedAvisCondidat(): AvisCondidatVo {
           return this.avisCondidatService.selectedAvisCondidat;
       }
    set selectedAvisCondidat(value: AvisCondidatVo) {
        this.avisCondidatService.selectedAvisCondidat = value;
       }

   get viewAvisCondidatDialog(): boolean {
           return this.avisCondidatService.viewAvisCondidatDialog;

       }
    set viewAvisCondidatDialog(value: boolean) {
        this.avisCondidatService.viewAvisCondidatDialog= value;
       }

       get selectedTypeAvis(): TypeAvisVo {
           return this.typeAvisService.selectedTypeAvis;
       }
      set selectedTypeAvis(value: TypeAvisVo) {
        this.typeAvisService.selectedTypeAvis = value;
       }
       get typeAviss():Array<TypeAvisVo> {
           return this.typeAvisService.typeAviss;
       }
       set typeAviss(value: Array<TypeAvisVo>) {
        this.typeAvisService.typeAviss = value;
       }
       get editTypeAvisDialog(): boolean {
           return this.typeAvisService.editTypeAvisDialog;
       }
      set editTypeAvisDialog(value: boolean) {
        this.typeAvisService.editTypeAvisDialog= value;
       }
       get selectedEcole(): EcoleVo {
           return this.ecoleService.selectedEcole;
       }
      set selectedEcole(value: EcoleVo) {
        this.ecoleService.selectedEcole = value;
       }
       get ecoles():Array<EcoleVo> {
           return this.ecoleService.ecoles;
       }
       set ecoles(value: Array<EcoleVo>) {
        this.ecoleService.ecoles = value;
       }
       get editEcoleDialog(): boolean {
           return this.ecoleService.editEcoleDialog;
       }
      set editEcoleDialog(value: boolean) {
        this.ecoleService.editEcoleDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
