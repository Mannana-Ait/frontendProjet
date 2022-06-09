import {EcoleVo} from './Ecole.model';
import {CandidatVo} from './Candidat.model';
import {CategoriePermisVo} from './CategoriePermis.model';
import {EtatInscriptionCandidatVo} from './EtatInscriptionCandidat.model';



export class InscriptionCandidatVo {

    public id: number;

    public dateInscription: Date;
    public dateDelivancePermis: Date;
    public numeroPermis: string;
    public numBordereauPermis: string;
                public dateInscriptionMax: string ;
                public dateInscriptionMin: string ;
                public dateDelivancePermisMax: string ;
                public dateDelivancePermisMin: string ;
      public candidatVo: CandidatVo ;
      public ecoleVo: EcoleVo ;
      public categoriePermisVo: CategoriePermisVo ;
      public etatInscriptionCandidatVo: EtatInscriptionCandidatVo ;

}
