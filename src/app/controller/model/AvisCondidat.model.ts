import {EcoleVo} from './Ecole.model';
import {TypeAvisVo} from './TypeAvis.model';



export class AvisCondidatVo {

    public id: number;

    public reference: string;
    public objet: string;
    public message: string;
     public ratting: number;
                public rattingMax: string ;
                public rattingMin: string ;
      public ecoleVo: EcoleVo ;
      public typeAvisVo: TypeAvisVo ;

}
