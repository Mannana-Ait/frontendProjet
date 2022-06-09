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

import {EtatMessageCreateAdminComponent} from './etat-message-admin/create-admin/etat-message-create-admin.component';
import {EtatMessageEditAdminComponent} from './etat-message-admin/edit-admin/etat-message-edit-admin.component';
import {EtatMessageViewAdminComponent} from './etat-message-admin/view-admin/etat-message-view-admin.component';
import {EtatMessageListAdminComponent} from './etat-message-admin/list-admin/etat-message-list-admin.component';
import {EtatMessageAdminComponent} from './etat-message-admin/etat-message-admin.component';
import {JourCreateAdminComponent} from './jour-admin/create-admin/jour-create-admin.component';
import {JourEditAdminComponent} from './jour-admin/edit-admin/jour-edit-admin.component';
import {JourViewAdminComponent} from './jour-admin/view-admin/jour-view-admin.component';
import {JourListAdminComponent} from './jour-admin/list-admin/jour-list-admin.component';
import {JourAdminComponent} from './jour-admin/jour-admin.component';
import {MessageCreateAdminComponent} from './message-admin/create-admin/message-create-admin.component';
import {MessageEditAdminComponent} from './message-admin/edit-admin/message-edit-admin.component';
import {MessageViewAdminComponent} from './message-admin/view-admin/message-view-admin.component';
import {MessageListAdminComponent} from './message-admin/list-admin/message-list-admin.component';
import {MessageAdminComponent} from './message-admin/message-admin.component';
import {AvisVisiteurCreateAdminComponent} from './avis-visiteur-admin/create-admin/avis-visiteur-create-admin.component';
import {AvisVisiteurEditAdminComponent} from './avis-visiteur-admin/edit-admin/avis-visiteur-edit-admin.component';
import {AvisVisiteurViewAdminComponent} from './avis-visiteur-admin/view-admin/avis-visiteur-view-admin.component';
import {AvisVisiteurListAdminComponent} from './avis-visiteur-admin/list-admin/avis-visiteur-list-admin.component';
import {AvisVisiteurAdminComponent} from './avis-visiteur-admin/avis-visiteur-admin.component';
import {MoniteurTheoriqueCreateAdminComponent} from './moniteur-theorique-admin/create-admin/moniteur-theorique-create-admin.component';
import {MoniteurTheoriqueEditAdminComponent} from './moniteur-theorique-admin/edit-admin/moniteur-theorique-edit-admin.component';
import {MoniteurTheoriqueViewAdminComponent} from './moniteur-theorique-admin/view-admin/moniteur-theorique-view-admin.component';
import {MoniteurTheoriqueListAdminComponent} from './moniteur-theorique-admin/list-admin/moniteur-theorique-list-admin.component';
import {MoniteurTheoriqueAdminComponent} from './moniteur-theorique-admin/moniteur-theorique-admin.component';
import {GenderCreateAdminComponent} from './gender-admin/create-admin/gender-create-admin.component';
import {GenderEditAdminComponent} from './gender-admin/edit-admin/gender-edit-admin.component';
import {GenderViewAdminComponent} from './gender-admin/view-admin/gender-view-admin.component';
import {GenderListAdminComponent} from './gender-admin/list-admin/gender-list-admin.component';
import {GenderAdminComponent} from './gender-admin/gender-admin.component';
import {CategoriePermisCreateAdminComponent} from './categorie-permis-admin/create-admin/categorie-permis-create-admin.component';
import {CategoriePermisEditAdminComponent} from './categorie-permis-admin/edit-admin/categorie-permis-edit-admin.component';
import {CategoriePermisViewAdminComponent} from './categorie-permis-admin/view-admin/categorie-permis-view-admin.component';
import {CategoriePermisListAdminComponent} from './categorie-permis-admin/list-admin/categorie-permis-list-admin.component';
import {CategoriePermisAdminComponent} from './categorie-permis-admin/categorie-permis-admin.component';
import {EcoleCreateAdminComponent} from './ecole-admin/create-admin/ecole-create-admin.component';
import {EcoleEditAdminComponent} from './ecole-admin/edit-admin/ecole-edit-admin.component';
import {EcoleViewAdminComponent} from './ecole-admin/view-admin/ecole-view-admin.component';
import {EcoleListAdminComponent} from './ecole-admin/list-admin/ecole-list-admin.component';
import {EcoleAdminComponent} from './ecole-admin/ecole-admin.component';
import {PermisCreateAdminComponent} from './permis-admin/create-admin/permis-create-admin.component';
import {PermisEditAdminComponent} from './permis-admin/edit-admin/permis-edit-admin.component';
import {PermisViewAdminComponent} from './permis-admin/view-admin/permis-view-admin.component';
import {PermisListAdminComponent} from './permis-admin/list-admin/permis-list-admin.component';
import {PermisAdminComponent} from './permis-admin/permis-admin.component';
import {MarqueCreateAdminComponent} from './marque-admin/create-admin/marque-create-admin.component';
import {MarqueEditAdminComponent} from './marque-admin/edit-admin/marque-edit-admin.component';
import {MarqueViewAdminComponent} from './marque-admin/view-admin/marque-view-admin.component';
import {MarqueListAdminComponent} from './marque-admin/list-admin/marque-list-admin.component';
import {MarqueAdminComponent} from './marque-admin/marque-admin.component';
import {VehiculeCreateAdminComponent} from './vehicule-admin/create-admin/vehicule-create-admin.component';
import {VehiculeEditAdminComponent} from './vehicule-admin/edit-admin/vehicule-edit-admin.component';
import {VehiculeViewAdminComponent} from './vehicule-admin/view-admin/vehicule-view-admin.component';
import {VehiculeListAdminComponent} from './vehicule-admin/list-admin/vehicule-list-admin.component';
import {VehiculeAdminComponent} from './vehicule-admin/vehicule-admin.component';
import {MoniteurPratiqueCreateAdminComponent} from './moniteur-pratique-admin/create-admin/moniteur-pratique-create-admin.component';
import {MoniteurPratiqueEditAdminComponent} from './moniteur-pratique-admin/edit-admin/moniteur-pratique-edit-admin.component';
import {MoniteurPratiqueViewAdminComponent} from './moniteur-pratique-admin/view-admin/moniteur-pratique-view-admin.component';
import {MoniteurPratiqueListAdminComponent} from './moniteur-pratique-admin/list-admin/moniteur-pratique-list-admin.component';
import {MoniteurPratiqueAdminComponent} from './moniteur-pratique-admin/moniteur-pratique-admin.component';
import {TypeVehiculeCreateAdminComponent} from './type-vehicule-admin/create-admin/type-vehicule-create-admin.component';
import {TypeVehiculeEditAdminComponent} from './type-vehicule-admin/edit-admin/type-vehicule-edit-admin.component';
import {TypeVehiculeViewAdminComponent} from './type-vehicule-admin/view-admin/type-vehicule-view-admin.component';
import {TypeVehiculeListAdminComponent} from './type-vehicule-admin/list-admin/type-vehicule-list-admin.component';
import {TypeVehiculeAdminComponent} from './type-vehicule-admin/type-vehicule-admin.component';
import {TypeAvisCreateAdminComponent} from './type-avis-admin/create-admin/type-avis-create-admin.component';
import {TypeAvisEditAdminComponent} from './type-avis-admin/edit-admin/type-avis-edit-admin.component';
import {TypeAvisViewAdminComponent} from './type-avis-admin/view-admin/type-avis-view-admin.component';
import {TypeAvisListAdminComponent} from './type-avis-admin/list-admin/type-avis-list-admin.component';
import {TypeAvisAdminComponent} from './type-avis-admin/type-avis-admin.component';
import {ChercheurCreateAdminComponent} from './chercheur-admin/create-admin/chercheur-create-admin.component';
import {ChercheurEditAdminComponent} from './chercheur-admin/edit-admin/chercheur-edit-admin.component';
import {ChercheurViewAdminComponent} from './chercheur-admin/view-admin/chercheur-view-admin.component';
import {ChercheurListAdminComponent} from './chercheur-admin/list-admin/chercheur-list-admin.component';
import {ChercheurAdminComponent} from './chercheur-admin/chercheur-admin.component';
import {PlanningItemCreateAdminComponent} from './planning-item-admin/create-admin/planning-item-create-admin.component';
import {PlanningItemEditAdminComponent} from './planning-item-admin/edit-admin/planning-item-edit-admin.component';
import {PlanningItemViewAdminComponent} from './planning-item-admin/view-admin/planning-item-view-admin.component';
import {PlanningItemListAdminComponent} from './planning-item-admin/list-admin/planning-item-list-admin.component';
import {PlanningItemAdminComponent} from './planning-item-admin/planning-item-admin.component';
import {GerantCreateAdminComponent} from './gerant-admin/create-admin/gerant-create-admin.component';
import {GerantEditAdminComponent} from './gerant-admin/edit-admin/gerant-edit-admin.component';
import {GerantViewAdminComponent} from './gerant-admin/view-admin/gerant-view-admin.component';
import {GerantListAdminComponent} from './gerant-admin/list-admin/gerant-list-admin.component';
import {GerantAdminComponent} from './gerant-admin/gerant-admin.component';
import {VilleCreateAdminComponent} from './ville-admin/create-admin/ville-create-admin.component';
import {VilleEditAdminComponent} from './ville-admin/edit-admin/ville-edit-admin.component';
import {VilleViewAdminComponent} from './ville-admin/view-admin/ville-view-admin.component';
import {VilleListAdminComponent} from './ville-admin/list-admin/ville-list-admin.component';
import {VilleAdminComponent} from './ville-admin/ville-admin.component';

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

        EtatMessageCreateAdminComponent,
        EtatMessageListAdminComponent,
        EtatMessageViewAdminComponent,
        EtatMessageEditAdminComponent,
        EtatMessageAdminComponent,
        JourCreateAdminComponent,
        JourListAdminComponent,
        JourViewAdminComponent,
        JourEditAdminComponent,
        JourAdminComponent,
        MessageCreateAdminComponent,
        MessageListAdminComponent,
        MessageViewAdminComponent,
        MessageEditAdminComponent,
        MessageAdminComponent,
        AvisVisiteurCreateAdminComponent,
        AvisVisiteurListAdminComponent,
        AvisVisiteurViewAdminComponent,
        AvisVisiteurEditAdminComponent,
        AvisVisiteurAdminComponent,
        MoniteurTheoriqueCreateAdminComponent,
        MoniteurTheoriqueListAdminComponent,
        MoniteurTheoriqueViewAdminComponent,
        MoniteurTheoriqueEditAdminComponent,
        MoniteurTheoriqueAdminComponent,
        GenderCreateAdminComponent,
        GenderListAdminComponent,
        GenderViewAdminComponent,
        GenderEditAdminComponent,
        GenderAdminComponent,
        CategoriePermisCreateAdminComponent,
        CategoriePermisListAdminComponent,
        CategoriePermisViewAdminComponent,
        CategoriePermisEditAdminComponent,
        CategoriePermisAdminComponent,
        EcoleCreateAdminComponent,
        EcoleListAdminComponent,
        EcoleViewAdminComponent,
        EcoleEditAdminComponent,
        EcoleAdminComponent,
        PermisCreateAdminComponent,
        PermisListAdminComponent,
        PermisViewAdminComponent,
        PermisEditAdminComponent,
        PermisAdminComponent,
        MarqueCreateAdminComponent,
        MarqueListAdminComponent,
        MarqueViewAdminComponent,
        MarqueEditAdminComponent,
        MarqueAdminComponent,
        VehiculeCreateAdminComponent,
        VehiculeListAdminComponent,
        VehiculeViewAdminComponent,
        VehiculeEditAdminComponent,
        VehiculeAdminComponent,
        MoniteurPratiqueCreateAdminComponent,
        MoniteurPratiqueListAdminComponent,
        MoniteurPratiqueViewAdminComponent,
        MoniteurPratiqueEditAdminComponent,
        MoniteurPratiqueAdminComponent,
        TypeVehiculeCreateAdminComponent,
        TypeVehiculeListAdminComponent,
        TypeVehiculeViewAdminComponent,
        TypeVehiculeEditAdminComponent,
        TypeVehiculeAdminComponent,
        TypeAvisCreateAdminComponent,
        TypeAvisListAdminComponent,
        TypeAvisViewAdminComponent,
        TypeAvisEditAdminComponent,
        TypeAvisAdminComponent,
        ChercheurCreateAdminComponent,
        ChercheurListAdminComponent,
        ChercheurViewAdminComponent,
        ChercheurEditAdminComponent,
        ChercheurAdminComponent,
        PlanningItemCreateAdminComponent,
        PlanningItemListAdminComponent,
        PlanningItemViewAdminComponent,
        PlanningItemEditAdminComponent,
        PlanningItemAdminComponent,
        GerantCreateAdminComponent,
        GerantListAdminComponent,
        GerantViewAdminComponent,
        GerantEditAdminComponent,
        GerantAdminComponent,
        VilleCreateAdminComponent,
        VilleListAdminComponent,
        VilleViewAdminComponent,
        VilleEditAdminComponent,
        VilleAdminComponent,
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
        EtatMessageCreateAdminComponent,
        EtatMessageListAdminComponent,
        EtatMessageViewAdminComponent,
        EtatMessageEditAdminComponent,
        EtatMessageAdminComponent,
        JourCreateAdminComponent,
        JourListAdminComponent,
        JourViewAdminComponent,
        JourEditAdminComponent,
        JourAdminComponent,
        MessageCreateAdminComponent,
        MessageListAdminComponent,
        MessageViewAdminComponent,
        MessageEditAdminComponent,
        MessageAdminComponent,
        AvisVisiteurCreateAdminComponent,
        AvisVisiteurListAdminComponent,
        AvisVisiteurViewAdminComponent,
        AvisVisiteurEditAdminComponent,
        AvisVisiteurAdminComponent,
        MoniteurTheoriqueCreateAdminComponent,
        MoniteurTheoriqueListAdminComponent,
        MoniteurTheoriqueViewAdminComponent,
        MoniteurTheoriqueEditAdminComponent,
        MoniteurTheoriqueAdminComponent,
        GenderCreateAdminComponent,
        GenderListAdminComponent,
        GenderViewAdminComponent,
        GenderEditAdminComponent,
        GenderAdminComponent,
        CategoriePermisCreateAdminComponent,
        CategoriePermisListAdminComponent,
        CategoriePermisViewAdminComponent,
        CategoriePermisEditAdminComponent,
        CategoriePermisAdminComponent,
        EcoleCreateAdminComponent,
        EcoleListAdminComponent,
        EcoleViewAdminComponent,
        EcoleEditAdminComponent,
        EcoleAdminComponent,
        PermisCreateAdminComponent,
        PermisListAdminComponent,
        PermisViewAdminComponent,
        PermisEditAdminComponent,
        PermisAdminComponent,
        MarqueCreateAdminComponent,
        MarqueListAdminComponent,
        MarqueViewAdminComponent,
        MarqueEditAdminComponent,
        MarqueAdminComponent,
        VehiculeCreateAdminComponent,
        VehiculeListAdminComponent,
        VehiculeViewAdminComponent,
        VehiculeEditAdminComponent,
        VehiculeAdminComponent,
        MoniteurPratiqueCreateAdminComponent,
        MoniteurPratiqueListAdminComponent,
        MoniteurPratiqueViewAdminComponent,
        MoniteurPratiqueEditAdminComponent,
        MoniteurPratiqueAdminComponent,
        TypeVehiculeCreateAdminComponent,
        TypeVehiculeListAdminComponent,
        TypeVehiculeViewAdminComponent,
        TypeVehiculeEditAdminComponent,
        TypeVehiculeAdminComponent,
        TypeAvisCreateAdminComponent,
        TypeAvisListAdminComponent,
        TypeAvisViewAdminComponent,
        TypeAvisEditAdminComponent,
        TypeAvisAdminComponent,
        ChercheurCreateAdminComponent,
        ChercheurListAdminComponent,
        ChercheurViewAdminComponent,
        ChercheurEditAdminComponent,
        ChercheurAdminComponent,
        PlanningItemCreateAdminComponent,
        PlanningItemListAdminComponent,
        PlanningItemViewAdminComponent,
        PlanningItemEditAdminComponent,
        PlanningItemAdminComponent,
        GerantCreateAdminComponent,
        GerantListAdminComponent,
        GerantViewAdminComponent,
        GerantEditAdminComponent,
        GerantAdminComponent,
        VilleCreateAdminComponent,
        VilleListAdminComponent,
        VilleViewAdminComponent,
        VilleEditAdminComponent,
        VilleAdminComponent,
    ],
    entryComponents: [],
})
export class ZeneratorAdminModule {
}
