import {VehiculeVo} from './Vehicule.model';
import {PlanningItemVo} from './PlanningItem.model';
import {MoniteurPratiqueVo} from './MoniteurPratique.model';
import {MoniteurTheoriqueVo} from './MoniteurTheorique.model';
import {VilleVo} from './Ville.model';
import {GerantVo} from './Gerant.model';


export class EcoleVo {

    public id: number;

    public reference: string;
    public altitude: number;
    public angitude: number;
    public nom: string;
    public address: string;
    public numAutorisation: string;
    public numFix: string;
    public numPhone: string;
    public email: string;
    public tauxReussite: number;
    public dateCreation: Date;
    public dateAbonnement: Date;
    public altitudeMax: string;
    public altitudeMin: string;
    public angitudeMax: string;
    public angitudeMin: string;
    public tauxReussiteMax: string;
    public tauxReussiteMin: string;
    public dateCreationMax: string;
    public dateCreationMin: string;
    public dateAbonnementMax: string;
    public dateAbonnementMin: string;
    public villeVo: VilleVo;
    public gerantVo: GerantVo;
    public vehiculesVo: Array<VehiculeVo>;
    public moniteurTheoriquesVo: Array<MoniteurTheoriqueVo>;
    public moniteurPratiquesVo: Array<MoniteurPratiqueVo>;
    public planningItemsVo: Array<PlanningItemVo>;

}
