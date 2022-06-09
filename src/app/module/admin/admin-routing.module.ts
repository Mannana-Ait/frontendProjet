// const root = environment.rootAppUrl;

import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthGuard} from 'src/app/controller/guards/auth.guard';

import {LoginAdminComponent} from './login-admin/login-admin.component';
import {RegisterAdminComponent} from './register-admin/register-admin.component';
import {EcoleAdminComponent} from './view/zenerator/ecole-admin/ecole-admin.component';
import {VilleAdminComponent} from './view/zenerator/ville-admin/ville-admin.component';
import {EtatMessageAdminComponent} from './view/zenerator/etat-message-admin/etat-message-admin.component';
import {JourAdminComponent} from './view/zenerator/jour-admin/jour-admin.component';
import {MessageAdminComponent} from './view/zenerator/message-admin/message-admin.component';
import {AvisVisiteurAdminComponent} from './view/zenerator/avis-visiteur-admin/avis-visiteur-admin.component';
import {MoniteurTheoriqueAdminComponent} from './view/zenerator/moniteur-theorique-admin/moniteur-theorique-admin.component';
import {GenderAdminComponent} from './view/zenerator/gender-admin/gender-admin.component';
import {CategoriePermisAdminComponent} from './view/zenerator/categorie-permis-admin/categorie-permis-admin.component';
import {PermisAdminComponent} from './view/zenerator/permis-admin/permis-admin.component';
import {MarqueAdminComponent} from './view/zenerator/marque-admin/marque-admin.component';
import {VehiculeAdminComponent} from './view/zenerator/vehicule-admin/vehicule-admin.component';
import {MoniteurPratiqueAdminComponent} from './view/zenerator/moniteur-pratique-admin/moniteur-pratique-admin.component';
import {TypeVehiculeAdminComponent} from './view/zenerator/type-vehicule-admin/type-vehicule-admin.component';
import {TypeAvisAdminComponent} from './view/zenerator/type-avis-admin/type-avis-admin.component';
import {ChercheurAdminComponent} from './view/zenerator/chercheur-admin/chercheur-admin.component';
import {PlanningItemAdminComponent} from './view/zenerator/planning-item-admin/planning-item-admin.component';
import {GerantAdminComponent} from './view/zenerator/gerant-admin/gerant-admin.component';

@NgModule({
    imports: [
        RouterModule.forChild(
            [
                {
                    path: '',
                    children: [
                        {
                            path: 'login',
                            children: [
                                {
                                    path: '',
                                    component: LoginAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {
                            path: 'register',
                            children: [
                                {
                                    path: '',
                                    component: RegisterAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        // {
                        //
                        //     path: 'zenerator',
                        //     loadChildren: './view/zenerator/zenerator-admin-routing.module#ZeneratorAdminRoutingModule',
                        //     canActivate: [AuthGuard],
                        // },
                        // {
                        //     path: 'zenerator',
                        //     // tslint:disable-next-line:max-line-length
                        //     loadChildren: () => import('./view/zenerator/zenerator-admin-routing.module').then(m => m.ZeneratorAdminRoutingModule)
                        // },
                        {
                            path: 'etat-message',
                            children: [
                                {
                                    path: 'list',
                                    component: EtatMessageAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'jour',
                            children: [
                                {
                                    path: 'list',
                                    component: JourAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {

                            path: 'message',
                            children: [
                                {
                                    path: 'list',
                                    component: MessageAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },

                        {
                            path: 'avis-visiteur',
                            children: [
                                {
                                    path: 'list',
                                    component: AvisVisiteurAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {
                            path: 'moniteur-theorique',
                            children: [
                                {
                                    path: 'list',
                                    component: MoniteurTheoriqueAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {
                            path: 'gender',
                            children: [
                                {
                                    path: 'list',
                                    component: GenderAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {
                            path: 'categorie-permis',
                            children: [
                                {
                                    path: 'list',
                                    component: CategoriePermisAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {
                            path: 'ecole',
                            children: [
                                {
                                    path: 'list',
                                    component: EcoleAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {
                            path: 'permis',
                            children: [
                                {
                                    path: 'list',
                                    component: PermisAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {
                            path: 'marque',
                            children: [
                                {
                                    path: 'list',
                                    component: MarqueAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {
                            path: 'vehicule',
                            children: [
                                {
                                    path: 'list',
                                    component: VehiculeAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {
                            path: 'moniteur-pratique',
                            children: [
                                {
                                    path: 'list',
                                    component: MoniteurPratiqueAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {
                            path: 'type-vehicule',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeVehiculeAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {
                            path: 'type-avis',
                            children: [
                                {
                                    path: 'list',
                                    component: TypeAvisAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {
                            path: 'chercheur',
                            children: [
                                {
                                    path: 'list',
                                    component: ChercheurAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {
                            path: 'planning-item',
                            children: [
                                {
                                    path: 'list',
                                    component: PlanningItemAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {
                            path: 'gerant',
                            children: [
                                {
                                    path: 'list',
                                    component: GerantAdminComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {
                            path: 'ville',
                            children: [
                                {
                                    path: 'list',
                                    component: VilleAdminComponent,
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
export class AdminRoutingModule {
}
