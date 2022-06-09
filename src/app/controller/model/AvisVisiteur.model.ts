import {TypeAvisVo} from './TypeAvis.model';


export class AvisVisiteurVo {

    public id: number;

    public reference: string;
    public emailVisiteur: string;
    public objet: string;
    public message: string;
    public ratting: number;
    public rattingMax: string;
    public rattingMin: string;
    public typeAvisVo: TypeAvisVo;

}
