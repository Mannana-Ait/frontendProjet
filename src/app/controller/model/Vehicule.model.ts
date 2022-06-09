import {EcoleVo} from './Ecole.model';
import {MarqueVo} from './Marque.model';
import {TypeVehiculeVo} from './TypeVehicule.model';


export class VehiculeVo {

    public id: number;

    public matricule: string;
    public dateAchatVehicule: Date;
    public imageUrl: string;
    public dateAchatVehiculeMax: string;
    public dateAchatVehiculeMin: string;
    public marqueVo: MarqueVo;
    public typeVehiculeVo: TypeVehiculeVo;
    public ecoleVo: EcoleVo;

}
