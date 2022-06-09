import {Component, OnInit} from '@angular/core';
import {InscriptionCandidatService} from 'src/app/controller/service/InscriptionCandidat.service';
import {InscriptionCandidatVo} from 'src/app/controller/model/InscriptionCandidat.model';
import {RoleService} from 'src/app/controller/service/role.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import { environment } from 'src/environments/environment';
import {DatePipe} from '@angular/common';
import {EcoleVo} from 'src/app/controller/model/Ecole.model';
import {EcoleService} from 'src/app/controller/service/Ecole.service';
import {CandidatVo} from 'src/app/controller/model/Candidat.model';
import {CandidatService} from 'src/app/controller/service/Candidat.service';
import {CategoriePermisVo} from 'src/app/controller/model/CategoriePermis.model';
import {CategoriePermisService} from 'src/app/controller/service/CategoriePermis.service';
import {EtatInscriptionCandidatVo} from 'src/app/controller/model/EtatInscriptionCandidat.model';
import {EtatInscriptionCandidatService} from 'src/app/controller/service/EtatInscriptionCandidat.service';

@Component({
  selector: 'app-inscription-candidat-view-admin',
  templateUrl: './inscription-candidat-view-admin.component.html',
  styleUrls: ['./inscription-candidat-view-admin.component.css']
})
export class InscriptionCandidatViewAdminComponent implements OnInit {


constructor(private datePipe: DatePipe, private inscriptionCandidatService: InscriptionCandidatService
,private roleService:RoleService
,private messageService: MessageService
, private router: Router
    ,private ecoleService: EcoleService
    ,private candidatService: CandidatService
    ,private categoriePermisService: CategoriePermisService
    ,private etatInscriptionCandidatService: EtatInscriptionCandidatService
) {
}

// methods
ngOnInit(): void {
    this.selectedCandidat = new CandidatVo();
    this.candidatService.findAll().subscribe((data) => this.candidats = data);
    this.selectedEcole = new EcoleVo();
    this.ecoleService.findAll().subscribe((data) => this.ecoles = data);
    this.selectedCategoriePermis = new CategoriePermisVo();
    this.categoriePermisService.findAll().subscribe((data) => this.categoriePermiss = data);
    this.selectedEtatInscriptionCandidat = new EtatInscriptionCandidatVo();
    this.etatInscriptionCandidatService.findAll().subscribe((data) => this.etatInscriptionCandidats = data);
}

hideViewDialog(){
    this.viewInscriptionCandidatDialog  = false;
}

// getters and setters

get inscriptionCandidats(): Array<InscriptionCandidatVo> {
    return this.inscriptionCandidatService.inscriptionCandidats;
       }
set inscriptionCandidats(value: Array<InscriptionCandidatVo>) {
        this.inscriptionCandidatService.inscriptionCandidats = value;
       }

 get selectedInscriptionCandidat(): InscriptionCandidatVo {
           return this.inscriptionCandidatService.selectedInscriptionCandidat;
       }
    set selectedInscriptionCandidat(value: InscriptionCandidatVo) {
        this.inscriptionCandidatService.selectedInscriptionCandidat = value;
       }

   get viewInscriptionCandidatDialog(): boolean {
           return this.inscriptionCandidatService.viewInscriptionCandidatDialog;

       }
    set viewInscriptionCandidatDialog(value: boolean) {
        this.inscriptionCandidatService.viewInscriptionCandidatDialog= value;
       }

       get selectedCandidat(): CandidatVo {
           return this.candidatService.selectedCandidat;
       }
      set selectedCandidat(value: CandidatVo) {
        this.candidatService.selectedCandidat = value;
       }
       get candidats():Array<CandidatVo> {
           return this.candidatService.candidats;
       }
       set candidats(value: Array<CandidatVo>) {
        this.candidatService.candidats = value;
       }
       get editCandidatDialog(): boolean {
           return this.candidatService.editCandidatDialog;
       }
      set editCandidatDialog(value: boolean) {
        this.candidatService.editCandidatDialog= value;
       }
       get selectedEtatInscriptionCandidat(): EtatInscriptionCandidatVo {
           return this.etatInscriptionCandidatService.selectedEtatInscriptionCandidat;
       }
      set selectedEtatInscriptionCandidat(value: EtatInscriptionCandidatVo) {
        this.etatInscriptionCandidatService.selectedEtatInscriptionCandidat = value;
       }
       get etatInscriptionCandidats():Array<EtatInscriptionCandidatVo> {
           return this.etatInscriptionCandidatService.etatInscriptionCandidats;
       }
       set etatInscriptionCandidats(value: Array<EtatInscriptionCandidatVo>) {
        this.etatInscriptionCandidatService.etatInscriptionCandidats = value;
       }
       get editEtatInscriptionCandidatDialog(): boolean {
           return this.etatInscriptionCandidatService.editEtatInscriptionCandidatDialog;
       }
      set editEtatInscriptionCandidatDialog(value: boolean) {
        this.etatInscriptionCandidatService.editEtatInscriptionCandidatDialog= value;
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
       get selectedCategoriePermis(): CategoriePermisVo {
           return this.categoriePermisService.selectedCategoriePermis;
       }
      set selectedCategoriePermis(value: CategoriePermisVo) {
        this.categoriePermisService.selectedCategoriePermis = value;
       }
       get categoriePermiss():Array<CategoriePermisVo> {
           return this.categoriePermisService.categoriePermiss;
       }
       set categoriePermiss(value: Array<CategoriePermisVo>) {
        this.categoriePermisService.categoriePermiss = value;
       }
       get editCategoriePermisDialog(): boolean {
           return this.categoriePermisService.editCategoriePermisDialog;
       }
      set editCategoriePermisDialog(value: boolean) {
        this.categoriePermisService.editCategoriePermisDialog= value;
       }

    get dateFormat(){
            return environment.dateFormatView;
    }

    get dateFormatColumn(){
            return environment.dateFormatList;
     }
}
