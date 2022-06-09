import {CategoriePermisVo} from './CategoriePermis.model';


export class PermisVo {

    public id: number;

    public reference: string;
    public dateDelivre: Date;
    public nomDelivreur: string;
    public dateDelivreMax: string;
    public dateDelivreMin: string;
    public numberPermisMax: string;
    public numberPermisMin: string;
    public categoriePermisVo: CategoriePermisVo;
    public numberPermis: number;

}
