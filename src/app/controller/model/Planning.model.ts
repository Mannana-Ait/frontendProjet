import {JourVo} from './Jour.model';
import {EcoleVo} from './Ecole.model';



export class PlanningVo {

    public id: number;

    public dateOuverture: Date;
    public dateFermeture: Date;
                public dateOuvertureMax: string ;
                public dateOuvertureMin: string ;
                public dateFermetureMax: string ;
                public dateFermetureMin: string ;
      public jourVo: JourVo ;
      public ecoleVo: EcoleVo ;

}
