// const root = environment.rootAppUrl;

import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthGuard} from 'src/app/controller/guards/auth.guard';


import {EtatMessageChercheurComponent} from './etat-message-chercheur/etat-message-chercheur.component';


import {JourChercheurComponent} from './jour-chercheur/jour-chercheur.component';


import {MessageChercheurComponent} from './message-chercheur/message-chercheur.component';


import {AvisVisiteurChercheurComponent} from './avis-visiteur-chercheur/avis-visiteur-chercheur.component';


import {MoniteurTheoriqueChercheurComponent} from './moniteur-theorique-chercheur/moniteur-theorique-chercheur.component';


import {GenderChercheurComponent} from './gender-chercheur/gender-chercheur.component';


import {CategoriePermisChercheurComponent} from './categorie-permis-chercheur/categorie-permis-chercheur.component';


import {EcoleChercheurComponent} from './ecole-chercheur/ecole-chercheur.component';


import {PermisChercheurComponent} from './permis-chercheur/permis-chercheur.component';


import {MarqueChercheurComponent} from './marque-chercheur/marque-chercheur.component';


import {VehiculeChercheurComponent} from './vehicule-chercheur/vehicule-chercheur.component';


import {MoniteurPratiqueChercheurComponent} from './moniteur-pratique-chercheur/moniteur-pratique-chercheur.component';


import {TypeVehiculeChercheurComponent} from './type-vehicule-chercheur/type-vehicule-chercheur.component';


import {TypeAvisChercheurComponent} from './type-avis-chercheur/type-avis-chercheur.component';


import {ChercheurChercheurComponent} from './chercheur-chercheur/chercheur-chercheur.component';


import {PlanningItemChercheurComponent} from './planning-item-chercheur/planning-item-chercheur.component';


import {GerantChercheurComponent} from './gerant-chercheur/gerant-chercheur.component';


import {VilleChercheurComponent} from './ville-chercheur/ville-chercheur.component';


@NgModule({
    imports: [
        RouterModule.forChild(
            [
                {
                    path: '',
                    children: [


                        {

                            path: 'etat-message',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatMessageChercheurComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'jour',
                            children: [
                                {
                                    path: 'list',
                                    component: JourChercheurComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'message',
                            children: [
                                {
                                    path: 'list',
                                    component: MessageChercheurComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'avis-visiteur',
                            children: [
                                {
                                    path: 'list',
                                    component: AvisVisiteurChercheurComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'moniteur-theorique',
                            children: [
                                {
                                    path: 'list',
                                    component: MoniteurTheoriqueChercheurComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'gender',
                            children: [
                                {
                                    path: 'list',
                                    component: GenderChercheurComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'categorie-permis',
                            children: [
                                {
                                    path: 'list',
                                    component: CategoriePermisChercheurComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'ecole',
                            children: [
                                {
                                    path: 'list',
                                    component: EcoleChercheurComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'permis',
                            children: [
                                {
                                    path: 'list',
                                    component: PermisChercheurComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'marque',
                            children: [
                                {
                                    path: 'list',
                                    component: MarqueChercheurComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'vehicule',
                            children: [
                                {
                                    path: 'list',
                                    component: VehiculeChercheurComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'moniteur-pratique',
                            children: [
                                {
                                    path: 'list',
                                    component: MoniteurPratiqueChercheurComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'type-vehicule',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeVehiculeChercheurComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'type-avis',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeAvisChercheurComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'chercheur',
                            children: [
                                {
                                    path: 'list',
                                    component: ChercheurChercheurComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'planning-item',
                            children: [
                                {
                                    path: 'list',
                                    component: PlanningItemChercheurComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'gerant',
                            children: [
                                {
                                    path: 'list',
                                    component: GerantChercheurComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'ville',
                            children: [
                                {
                                    path: 'list',
                                    component: VilleChercheurComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                    ]
                },
            ]
        ),
    ],
    exports: [RouterModule],
})
export class ZeneratorChercheurRoutingModule {
}
