import {GenderVo} from './Gender.model';


export class GerantVo {

    public id: number;

    public reference: string;
    public nom: string;
    public prenom: string;
    public email: string;
    public adress: string;
    public phone: string;
    public fix: string;
    public lieuNaissance: string;
    public dateNaissance: string;
    public cin: string;
    public picture: string;
    public dateJoin: Date;
    public dateJoinMax: string;
    public dateJoinMin: string;
    public genderVo: GenderVo;

}
