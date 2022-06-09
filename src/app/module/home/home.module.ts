import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {AgenceComponent} from './agence/agence.component';
import {ServicesComponent} from './services/services.component';
import {AvisComponent} from './avis/avis.component';
import {ImageComponent} from './image/image.component';
import {AdressComponent} from './adress/adress.component';
import {ModalComponent} from './modal/modal.component';
import {MoniteurComponent} from './moniteur/moniteur.component';
import {NosLocalisationsComponent} from './nos-localisations/nos-localisations.component';
import {PermisComponent} from './permis/permis.component';
import {ZoneAvisComponent} from './zone-avis/zone-avis.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
    declarations: [
        AgenceComponent,
        ServicesComponent,
        AvisComponent,
        ImageComponent,
        AdressComponent,
        ModalComponent,
        MoniteurComponent,
        NosLocalisationsComponent,
        PermisComponent,
        ZoneAvisComponent,
        HeaderComponent
    ],
    exports: [
        ImageComponent,
        ServicesComponent,
        AvisComponent,
        AdressComponent,
        HeaderComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule
    ]
})
export class HomeModule {
}
