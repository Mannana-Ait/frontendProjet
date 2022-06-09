import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextareaModule} from 'primeng/inputtextarea';

import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DialogModule} from 'primeng/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CalendarModule} from 'primeng/calendar';
import {PanelModule} from 'primeng/panel';
import {InputNumberModule} from 'primeng/inputnumber';
import {BadgeModule} from 'primeng/badge';
import {MultiSelectModule} from 'primeng/multiselect';

import {EtatMessageCreateChercheurComponent} from './etat-message-chercheur/create-chercheur/etat-message-create-chercheur.component';
import {EtatMessageEditChercheurComponent} from './etat-message-chercheur/edit-chercheur/etat-message-edit-chercheur.component';
import {EtatMessageViewChercheurComponent} from './etat-message-chercheur/view-chercheur/etat-message-view-chercheur.component';
import {EtatMessageListChercheurComponent} from './etat-message-chercheur/list-chercheur/etat-message-list-chercheur.component';
import {EtatMessageChercheurComponent} from './etat-message-chercheur/etat-message-chercheur.component';
import {JourCreateChercheurComponent} from './jour-chercheur/create-chercheur/jour-create-chercheur.component';
import {JourEditChercheurComponent} from './jour-chercheur/edit-chercheur/jour-edit-chercheur.component';
import {JourViewChercheurComponent} from './jour-chercheur/view-chercheur/jour-view-chercheur.component';
import {JourListChercheurComponent} from './jour-chercheur/list-chercheur/jour-list-chercheur.component';
import {JourChercheurComponent} from './jour-chercheur/jour-chercheur.component';
import {MessageCreateChercheurComponent} from './message-chercheur/create-chercheur/message-create-chercheur.component';
import {MessageEditChercheurComponent} from './message-chercheur/edit-chercheur/message-edit-chercheur.component';
import {MessageViewChercheurComponent} from './message-chercheur/view-chercheur/message-view-chercheur.component';
import {MessageListChercheurComponent} from './message-chercheur/list-chercheur/message-list-chercheur.component';
import {MessageChercheurComponent} from './message-chercheur/message-chercheur.component';
import {AvisVisiteurCreateChercheurComponent} from './avis-visiteur-chercheur/create-chercheur/avis-visiteur-create-chercheur.component';
import {AvisVisiteurEditChercheurComponent} from './avis-visiteur-chercheur/edit-chercheur/avis-visiteur-edit-chercheur.component';
import {AvisVisiteurViewChercheurComponent} from './avis-visiteur-chercheur/view-chercheur/avis-visiteur-view-chercheur.component';
import {AvisVisiteurListChercheurComponent} from './avis-visiteur-chercheur/list-chercheur/avis-visiteur-list-chercheur.component';
import {AvisVisiteurChercheurComponent} from './avis-visiteur-chercheur/avis-visiteur-chercheur.component';
import {
    MoniteurTheoriqueCreateChercheurComponent
} from './moniteur-theorique-chercheur/create-chercheur/moniteur-theorique-create-chercheur.component';
import {
    MoniteurTheoriqueEditChercheurComponent
} from './moniteur-theorique-chercheur/edit-chercheur/moniteur-theorique-edit-chercheur.component';
import {
    MoniteurTheoriqueViewChercheurComponent
} from './moniteur-theorique-chercheur/view-chercheur/moniteur-theorique-view-chercheur.component';
import {
    MoniteurTheoriqueListChercheurComponent
} from './moniteur-theorique-chercheur/list-chercheur/moniteur-theorique-list-chercheur.component';
import {MoniteurTheoriqueChercheurComponent} from './moniteur-theorique-chercheur/moniteur-theorique-chercheur.component';
import {GenderCreateChercheurComponent} from './gender-chercheur/create-chercheur/gender-create-chercheur.component';
import {GenderEditChercheurComponent} from './gender-chercheur/edit-chercheur/gender-edit-chercheur.component';
import {GenderViewChercheurComponent} from './gender-chercheur/view-chercheur/gender-view-chercheur.component';
import {GenderListChercheurComponent} from './gender-chercheur/list-chercheur/gender-list-chercheur.component';
import {GenderChercheurComponent} from './gender-chercheur/gender-chercheur.component';
import {
    CategoriePermisCreateChercheurComponent
} from './categorie-permis-chercheur/create-chercheur/categorie-permis-create-chercheur.component';
import {CategoriePermisEditChercheurComponent} from './categorie-permis-chercheur/edit-chercheur/categorie-permis-edit-chercheur.component';
import {CategoriePermisViewChercheurComponent} from './categorie-permis-chercheur/view-chercheur/categorie-permis-view-chercheur.component';
import {CategoriePermisListChercheurComponent} from './categorie-permis-chercheur/list-chercheur/categorie-permis-list-chercheur.component';
import {CategoriePermisChercheurComponent} from './categorie-permis-chercheur/categorie-permis-chercheur.component';
import {EcoleCreateChercheurComponent} from './ecole-chercheur/create-chercheur/ecole-create-chercheur.component';
import {EcoleEditChercheurComponent} from './ecole-chercheur/edit-chercheur/ecole-edit-chercheur.component';
import {EcoleViewChercheurComponent} from './ecole-chercheur/view-chercheur/ecole-view-chercheur.component';
import {EcoleListChercheurComponent} from './ecole-chercheur/list-chercheur/ecole-list-chercheur.component';
import {EcoleChercheurComponent} from './ecole-chercheur/ecole-chercheur.component';
import {PermisCreateChercheurComponent} from './permis-chercheur/create-chercheur/permis-create-chercheur.component';
import {PermisEditChercheurComponent} from './permis-chercheur/edit-chercheur/permis-edit-chercheur.component';
import {PermisViewChercheurComponent} from './permis-chercheur/view-chercheur/permis-view-chercheur.component';
import {PermisListChercheurComponent} from './permis-chercheur/list-chercheur/permis-list-chercheur.component';
import {PermisChercheurComponent} from './permis-chercheur/permis-chercheur.component';
import {MarqueCreateChercheurComponent} from './marque-chercheur/create-chercheur/marque-create-chercheur.component';
import {MarqueEditChercheurComponent} from './marque-chercheur/edit-chercheur/marque-edit-chercheur.component';
import {MarqueViewChercheurComponent} from './marque-chercheur/view-chercheur/marque-view-chercheur.component';
import {MarqueListChercheurComponent} from './marque-chercheur/list-chercheur/marque-list-chercheur.component';
import {MarqueChercheurComponent} from './marque-chercheur/marque-chercheur.component';
import {VehiculeCreateChercheurComponent} from './vehicule-chercheur/create-chercheur/vehicule-create-chercheur.component';
import {VehiculeEditChercheurComponent} from './vehicule-chercheur/edit-chercheur/vehicule-edit-chercheur.component';
import {VehiculeViewChercheurComponent} from './vehicule-chercheur/view-chercheur/vehicule-view-chercheur.component';
import {VehiculeListChercheurComponent} from './vehicule-chercheur/list-chercheur/vehicule-list-chercheur.component';
import {VehiculeChercheurComponent} from './vehicule-chercheur/vehicule-chercheur.component';
import {
    MoniteurPratiqueCreateChercheurComponent
} from './moniteur-pratique-chercheur/create-chercheur/moniteur-pratique-create-chercheur.component';
import {
    MoniteurPratiqueEditChercheurComponent
} from './moniteur-pratique-chercheur/edit-chercheur/moniteur-pratique-edit-chercheur.component';
import {
    MoniteurPratiqueViewChercheurComponent
} from './moniteur-pratique-chercheur/view-chercheur/moniteur-pratique-view-chercheur.component';
import {
    MoniteurPratiqueListChercheurComponent
} from './moniteur-pratique-chercheur/list-chercheur/moniteur-pratique-list-chercheur.component';
import {MoniteurPratiqueChercheurComponent} from './moniteur-pratique-chercheur/moniteur-pratique-chercheur.component';
import {TypeVehiculeCreateChercheurComponent} from './type-vehicule-chercheur/create-chercheur/type-vehicule-create-chercheur.component';
import {TypeVehiculeEditChercheurComponent} from './type-vehicule-chercheur/edit-chercheur/type-vehicule-edit-chercheur.component';
import {TypeVehiculeViewChercheurComponent} from './type-vehicule-chercheur/view-chercheur/type-vehicule-view-chercheur.component';
import {TypeVehiculeListChercheurComponent} from './type-vehicule-chercheur/list-chercheur/type-vehicule-list-chercheur.component';
import {TypeVehiculeChercheurComponent} from './type-vehicule-chercheur/type-vehicule-chercheur.component';
import {TypeAvisCreateChercheurComponent} from './type-avis-chercheur/create-chercheur/type-avis-create-chercheur.component';
import {TypeAvisEditChercheurComponent} from './type-avis-chercheur/edit-chercheur/type-avis-edit-chercheur.component';
import {TypeAvisViewChercheurComponent} from './type-avis-chercheur/view-chercheur/type-avis-view-chercheur.component';
import {TypeAvisListChercheurComponent} from './type-avis-chercheur/list-chercheur/type-avis-list-chercheur.component';
import {TypeAvisChercheurComponent} from './type-avis-chercheur/type-avis-chercheur.component';
import {ChercheurCreateChercheurComponent} from './chercheur-chercheur/create-chercheur/chercheur-create-chercheur.component';
import {ChercheurEditChercheurComponent} from './chercheur-chercheur/edit-chercheur/chercheur-edit-chercheur.component';
import {ChercheurViewChercheurComponent} from './chercheur-chercheur/view-chercheur/chercheur-view-chercheur.component';
import {ChercheurListChercheurComponent} from './chercheur-chercheur/list-chercheur/chercheur-list-chercheur.component';
import {ChercheurChercheurComponent} from './chercheur-chercheur/chercheur-chercheur.component';
import {PlanningItemCreateChercheurComponent} from './planning-item-chercheur/create-chercheur/planning-item-create-chercheur.component';
import {PlanningItemEditChercheurComponent} from './planning-item-chercheur/edit-chercheur/planning-item-edit-chercheur.component';
import {PlanningItemViewChercheurComponent} from './planning-item-chercheur/view-chercheur/planning-item-view-chercheur.component';
import {PlanningItemListChercheurComponent} from './planning-item-chercheur/list-chercheur/planning-item-list-chercheur.component';
import {PlanningItemChercheurComponent} from './planning-item-chercheur/planning-item-chercheur.component';
import {GerantCreateChercheurComponent} from './gerant-chercheur/create-chercheur/gerant-create-chercheur.component';
import {GerantEditChercheurComponent} from './gerant-chercheur/edit-chercheur/gerant-edit-chercheur.component';
import {GerantViewChercheurComponent} from './gerant-chercheur/view-chercheur/gerant-view-chercheur.component';
import {GerantListChercheurComponent} from './gerant-chercheur/list-chercheur/gerant-list-chercheur.component';
import {GerantChercheurComponent} from './gerant-chercheur/gerant-chercheur.component';
import {VilleCreateChercheurComponent} from './ville-chercheur/create-chercheur/ville-create-chercheur.component';
import {VilleEditChercheurComponent} from './ville-chercheur/edit-chercheur/ville-edit-chercheur.component';
import {VilleViewChercheurComponent} from './ville-chercheur/view-chercheur/ville-view-chercheur.component';
import {VilleListChercheurComponent} from './ville-chercheur/list-chercheur/ville-list-chercheur.component';
import {VilleChercheurComponent} from './ville-chercheur/ville-chercheur.component';

import {PasswordModule} from 'primeng/password';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TabViewModule} from 'primeng/tabview';
import {SplitButtonModule} from 'primeng/splitbutton';
import {MessageModule} from 'primeng/message';
import {MessagesModule} from 'primeng/messages';


@NgModule({
    declarations: [

        EtatMessageCreateChercheurComponent,
        EtatMessageListChercheurComponent,
        EtatMessageViewChercheurComponent,
        EtatMessageEditChercheurComponent,
        EtatMessageChercheurComponent,
        JourCreateChercheurComponent,
        JourListChercheurComponent,
        JourViewChercheurComponent,
        JourEditChercheurComponent,
        JourChercheurComponent,
        MessageCreateChercheurComponent,
        MessageListChercheurComponent,
        MessageViewChercheurComponent,
        MessageEditChercheurComponent,
        MessageChercheurComponent,
        AvisVisiteurCreateChercheurComponent,
        AvisVisiteurListChercheurComponent,
        AvisVisiteurViewChercheurComponent,
        AvisVisiteurEditChercheurComponent,
        AvisVisiteurChercheurComponent,
        MoniteurTheoriqueCreateChercheurComponent,
        MoniteurTheoriqueListChercheurComponent,
        MoniteurTheoriqueViewChercheurComponent,
        MoniteurTheoriqueEditChercheurComponent,
        MoniteurTheoriqueChercheurComponent,
        GenderCreateChercheurComponent,
        GenderListChercheurComponent,
        GenderViewChercheurComponent,
        GenderEditChercheurComponent,
        GenderChercheurComponent,
        CategoriePermisCreateChercheurComponent,
        CategoriePermisListChercheurComponent,
        CategoriePermisViewChercheurComponent,
        CategoriePermisEditChercheurComponent,
        CategoriePermisChercheurComponent,
        EcoleCreateChercheurComponent,
        EcoleListChercheurComponent,
        EcoleViewChercheurComponent,
        EcoleEditChercheurComponent,
        EcoleChercheurComponent,
        PermisCreateChercheurComponent,
        PermisListChercheurComponent,
        PermisViewChercheurComponent,
        PermisEditChercheurComponent,
        PermisChercheurComponent,
        MarqueCreateChercheurComponent,
        MarqueListChercheurComponent,
        MarqueViewChercheurComponent,
        MarqueEditChercheurComponent,
        MarqueChercheurComponent,
        VehiculeCreateChercheurComponent,
        VehiculeListChercheurComponent,
        VehiculeViewChercheurComponent,
        VehiculeEditChercheurComponent,
        VehiculeChercheurComponent,
        MoniteurPratiqueCreateChercheurComponent,
        MoniteurPratiqueListChercheurComponent,
        MoniteurPratiqueViewChercheurComponent,
        MoniteurPratiqueEditChercheurComponent,
        MoniteurPratiqueChercheurComponent,
        TypeVehiculeCreateChercheurComponent,
        TypeVehiculeListChercheurComponent,
        TypeVehiculeViewChercheurComponent,
        TypeVehiculeEditChercheurComponent,
        TypeVehiculeChercheurComponent,
        TypeAvisCreateChercheurComponent,
        TypeAvisListChercheurComponent,
        TypeAvisViewChercheurComponent,
        TypeAvisEditChercheurComponent,
        TypeAvisChercheurComponent,
        ChercheurCreateChercheurComponent,
        ChercheurListChercheurComponent,
        ChercheurViewChercheurComponent,
        ChercheurEditChercheurComponent,
        ChercheurChercheurComponent,
        PlanningItemCreateChercheurComponent,
        PlanningItemListChercheurComponent,
        PlanningItemViewChercheurComponent,
        PlanningItemEditChercheurComponent,
        PlanningItemChercheurComponent,
        GerantCreateChercheurComponent,
        GerantListChercheurComponent,
        GerantViewChercheurComponent,
        GerantEditChercheurComponent,
        GerantChercheurComponent,
        VilleCreateChercheurComponent,
        VilleListChercheurComponent,
        VilleViewChercheurComponent,
        VilleEditChercheurComponent,
        VilleChercheurComponent,
    ],
    imports: [
        CommonModule,
        ToastModule,
        ToolbarModule,
        TableModule,
        ConfirmDialogModule,
        DialogModule,
        PasswordModule,
        InputTextModule,
        ButtonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        SplitButtonModule,
        BrowserAnimationsModule,
        DropdownModule,
        TabViewModule,
        InputSwitchModule,
        InputTextareaModule,
        CalendarModule,
        PanelModule,
        MessageModule,
        MessagesModule,
        InputNumberModule,
        BadgeModule,
        MultiSelectModule,
    ],
    exports: [
        EtatMessageCreateChercheurComponent,
        EtatMessageListChercheurComponent,
        EtatMessageViewChercheurComponent,
        EtatMessageEditChercheurComponent,
        EtatMessageChercheurComponent,
        JourCreateChercheurComponent,
        JourListChercheurComponent,
        JourViewChercheurComponent,
        JourEditChercheurComponent,
        JourChercheurComponent,
        MessageCreateChercheurComponent,
        MessageListChercheurComponent,
        MessageViewChercheurComponent,
        MessageEditChercheurComponent,
        MessageChercheurComponent,
        AvisVisiteurCreateChercheurComponent,
        AvisVisiteurListChercheurComponent,
        AvisVisiteurViewChercheurComponent,
        AvisVisiteurEditChercheurComponent,
        AvisVisiteurChercheurComponent,
        MoniteurTheoriqueCreateChercheurComponent,
        MoniteurTheoriqueListChercheurComponent,
        MoniteurTheoriqueViewChercheurComponent,
        MoniteurTheoriqueEditChercheurComponent,
        MoniteurTheoriqueChercheurComponent,
        GenderCreateChercheurComponent,
        GenderListChercheurComponent,
        GenderViewChercheurComponent,
        GenderEditChercheurComponent,
        GenderChercheurComponent,
        CategoriePermisCreateChercheurComponent,
        CategoriePermisListChercheurComponent,
        CategoriePermisViewChercheurComponent,
        CategoriePermisEditChercheurComponent,
        CategoriePermisChercheurComponent,
        EcoleCreateChercheurComponent,
        EcoleListChercheurComponent,
        EcoleViewChercheurComponent,
        EcoleEditChercheurComponent,
        EcoleChercheurComponent,
        PermisCreateChercheurComponent,
        PermisListChercheurComponent,
        PermisViewChercheurComponent,
        PermisEditChercheurComponent,
        PermisChercheurComponent,
        MarqueCreateChercheurComponent,
        MarqueListChercheurComponent,
        MarqueViewChercheurComponent,
        MarqueEditChercheurComponent,
        MarqueChercheurComponent,
        VehiculeCreateChercheurComponent,
        VehiculeListChercheurComponent,
        VehiculeViewChercheurComponent,
        VehiculeEditChercheurComponent,
        VehiculeChercheurComponent,
        MoniteurPratiqueCreateChercheurComponent,
        MoniteurPratiqueListChercheurComponent,
        MoniteurPratiqueViewChercheurComponent,
        MoniteurPratiqueEditChercheurComponent,
        MoniteurPratiqueChercheurComponent,
        TypeVehiculeCreateChercheurComponent,
        TypeVehiculeListChercheurComponent,
        TypeVehiculeViewChercheurComponent,
        TypeVehiculeEditChercheurComponent,
        TypeVehiculeChercheurComponent,
        TypeAvisCreateChercheurComponent,
        TypeAvisListChercheurComponent,
        TypeAvisViewChercheurComponent,
        TypeAvisEditChercheurComponent,
        TypeAvisChercheurComponent,
        ChercheurCreateChercheurComponent,
        ChercheurListChercheurComponent,
        ChercheurViewChercheurComponent,
        ChercheurEditChercheurComponent,
        ChercheurChercheurComponent,
        PlanningItemCreateChercheurComponent,
        PlanningItemListChercheurComponent,
        PlanningItemViewChercheurComponent,
        PlanningItemEditChercheurComponent,
        PlanningItemChercheurComponent,
        GerantCreateChercheurComponent,
        GerantListChercheurComponent,
        GerantViewChercheurComponent,
        GerantEditChercheurComponent,
        GerantChercheurComponent,
        VilleCreateChercheurComponent,
        VilleListChercheurComponent,
        VilleViewChercheurComponent,
        VilleEditChercheurComponent,
        VilleChercheurComponent,
    ],
    entryComponents: [],
})
export class ZeneratorChercheurModule {
}
