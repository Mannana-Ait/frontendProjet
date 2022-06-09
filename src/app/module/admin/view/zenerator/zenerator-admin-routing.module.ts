// const root = environment.rootAppUrl;

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from 'src/app/controller/guards/auth.guard';


import {EtatMessageAdminComponent} from './etat-message-admin/etat-message-admin.component';


import {JourAdminComponent} from './jour-admin/jour-admin.component';


import {MessageAdminComponent} from './message-admin/message-admin.component';


import {AvisVisiteurAdminComponent} from './avis-visiteur-admin/avis-visiteur-admin.component';


import {MoniteurTheoriqueAdminComponent} from './moniteur-theorique-admin/moniteur-theorique-admin.component';


import {GenderAdminComponent} from './gender-admin/gender-admin.component';


import {CategoriePermisAdminComponent} from './categorie-permis-admin/categorie-permis-admin.component';


import {EcoleAdminComponent} from './ecole-admin/ecole-admin.component';


import {PermisAdminComponent} from './permis-admin/permis-admin.component';


import {MarqueAdminComponent} from './marque-admin/marque-admin.component';


import {VehiculeAdminComponent} from './vehicule-admin/vehicule-admin.component';


import {MoniteurPratiqueAdminComponent} from './moniteur-pratique-admin/moniteur-pratique-admin.component';


import {TypeVehiculeAdminComponent} from './type-vehicule-admin/type-vehicule-admin.component';


import {TypeAvisAdminComponent} from './type-avis-admin/type-avis-admin.component';


import {ChercheurAdminComponent} from './chercheur-admin/chercheur-admin.component';


import {PlanningItemAdminComponent} from './planning-item-admin/planning-item-admin.component';


import {GerantAdminComponent} from './gerant-admin/gerant-admin.component';


import {VilleAdminComponent} from './ville-admin/ville-admin.component';

const routes: Routes = [
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
];

@NgModule({
    // imports: [
    //     RouterModule.forChild(
    //         [
    //             {
    //                 path: '',
    //                 children: [
    //                     {
    //
    //                         path: 'etat-message',
    //                         children: [
    //                             {
    //                                 path: 'list',
    //                                 component: EtatMessageAdminComponent,
    //                                 canActivate: [AuthGuard]
    //                             }
    //                         ]
    //                     },
    //
    //                     {
    //
    //                         path: 'jour',
    //                         children: [
    //                             {
    //                                 path: 'list',
    //                                 component: JourAdminComponent,
    //                                 canActivate: [AuthGuard]
    //                             }
    //                         ]
    //                     },
    //
    //                     {
    //
    //                         path: 'message',
    //                         children: [
    //                             {
    //                                 path: 'list',
    //                                 component: MessageAdminComponent,
    //                                 canActivate: [AuthGuard]
    //                             }
    //                         ]
    //                     },
    //
    //                     {
    //
    //                         path: 'avis-visiteur',
    //                         children: [
    //                             {
    //                                 path: 'list',
    //                                 component: AvisVisiteurAdminComponent,
    //                                 canActivate: [AuthGuard]
    //                             }
    //                         ]
    //                     },
    //
    //                     {
    //
    //                         path: 'moniteur-theorique',
    //                         children: [
    //                             {
    //                                 path: 'list',
    //                                 component: MoniteurTheoriqueAdminComponent,
    //                                 canActivate: [AuthGuard]
    //                             }
    //                         ]
    //                     },
    //
    //                     {
    //
    //                         path: 'gender',
    //                         children: [
    //                             {
    //                                 path: 'list',
    //                                 component: GenderAdminComponent,
    //                                 canActivate: [AuthGuard]
    //                             }
    //                         ]
    //                     },
    //
    //                     {
    //
    //                         path: 'categorie-permis',
    //                         children: [
    //                             {
    //                                 path: 'list',
    //                                 component: CategoriePermisAdminComponent,
    //                                 canActivate: [AuthGuard]
    //                             }
    //                         ]
    //                     },
    //
    //                     {
    //
    //                         path: 'ecole',
    //                         children: [
    //                             {
    //                                 path: 'list',
    //                                 component: EcoleAdminComponent,
    //                                 canActivate: [AuthGuard]
    //                             }
    //                         ]
    //                     },
    //
    //                     {
    //
    //                         path: 'permis',
    //                         children: [
    //                             {
    //                                 path: 'list',
    //                                 component: PermisAdminComponent,
    //                                 canActivate: [AuthGuard]
    //                             }
    //                         ]
    //                     },
    //
    //                     {
    //
    //                         path: 'marque',
    //                         children: [
    //                             {
    //                                 path: 'list',
    //                                 component: MarqueAdminComponent,
    //                                 canActivate: [AuthGuard]
    //                             }
    //                         ]
    //                     },
    //
    //                     {
    //
    //                         path: 'vehicule',
    //                         children: [
    //                             {
    //                                 path: 'list',
    //                                 component: VehiculeAdminComponent,
    //                                 canActivate: [AuthGuard]
    //                             }
    //                         ]
    //                     },
    //
    //                     {
    //
    //                         path: 'moniteur-pratique',
    //                         children: [
    //                             {
    //                                 path: 'list',
    //                                 component: MoniteurPratiqueAdminComponent,
    //                                 canActivate: [AuthGuard]
    //                             }
    //                         ]
    //                     },
    //
    //                     {
    //
    //                         path: 'type-vehicule',
    //                         children: [
    //                             {
    //                                 path: 'list',
    //                                 component: TypeVehiculeAdminComponent,
    //                                 canActivate: [AuthGuard]
    //                             }
    //                         ]
    //                     },
    //
    //                     {
    //
    //                         path: 'type-avis',
    //                         children: [
    //                             {
    //                                 path: 'list',
    //                                 component: TypeAvisAdminComponent,
    //                                 canActivate: [AuthGuard]
    //                             }
    //                         ]
    //                     },
    //
    //                     {
    //
    //                         path: 'chercheur',
    //                         children: [
    //                             {
    //                                 path: 'list',
    //                                 component: ChercheurAdminComponent,
    //                                 canActivate: [AuthGuard]
    //                             }
    //                         ]
    //                     },
    //
    //                     {
    //
    //                         path: 'planning-item',
    //                         children: [
    //                             {
    //                                 path: 'list',
    //                                 component: PlanningItemAdminComponent,
    //                                 canActivate: [AuthGuard]
    //                             }
    //                         ]
    //                     },
    //
    //                     {
    //
    //                         path: 'gerant',
    //                         children: [
    //                             {
    //                                 path: 'list',
    //                                 component: GerantAdminComponent,
    //                                 canActivate: [AuthGuard]
    //                             }
    //                         ]
    //                     },
    //
    //                     {
    //
    //                         path: 'ville',
    //                         children: [
    //                             {
    //                                 path: 'list',
    //                                 component: VilleAdminComponent,
    //                                 canActivate: [AuthGuard]
    //                             }
    //                         ]
    //                     },
    //
    //                 ]
    //             },
    //         ]
    //     ),
    // ],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class ZeneratorAdminRoutingModule {
}
