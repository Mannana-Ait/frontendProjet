import {EtatMessageVo} from './EtatMessage.model';


export class MessageVo {

    public id: number;

    public reference: string;
    public email: string;
    public corps: string;
    public dateEnvoi: Date;
    public dateEnvoiMax: string;
    public dateEnvoiMin: string;
    public etatMessageVo: EtatMessageVo;

}
