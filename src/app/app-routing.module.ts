import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AppMainComponent} from './app.main.component';
import {AuthGuard} from './controller/guards/auth.guard';
import {AccessDeniedComponent} from './auth/access-denied/access-denied.component';

import {LoginAdminComponent} from './module/admin/login-admin/login-admin.component';
import {RegisterAdminComponent} from './module/admin/register-admin/register-admin.component';
import {RegisterChercheurComponent} from './module/chercheur/register-chercheur/register-chercheur.component';
import {LoginChercheurComponent} from './module/chercheur/login-chercheur/login-chercheur.component';
import {HomeComponent} from './demo/view/home/home.component';

import {ImageComponent} from './module/home/image/image.component';
import {AgenceComponent} from './module/home/agence/agence.component';
import {AdressComponent} from './module/home/adress/adress.component';

import {ServicesComponent} from './module/home/services/services.component';
import {ZoneAvisComponent} from './module/home/zone-avis/zone-avis.component';
import {PermisComponent} from './module/home/permis/permis.component';
import {NosLocalisationsComponent} from './module/home/nos-localisations/nos-localisations.component';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {path: 'home', loadChildren: () => import ('./module/home/home-routing.module').then( m => m.HomeRoutingModule)},
                {path: '', component: HomeComponent},
                {path: 'agence', component: AgenceComponent},
                {path: 'adress', component: AdressComponent},
                {path: 'image', component: ImageComponent},
                {path: 'permis', component: PermisComponent},
                {path: 'noslocalisations', component: NosLocalisationsComponent},
                {path: 'services', component: ServicesComponent},
                {path: 'avis', component: ZoneAvisComponent},
                {path: 'chercheur/login', component: LoginChercheurComponent},
                {path: 'chercheur/register', component: RegisterChercheurComponent},
                {path: 'admin/login', component: LoginAdminComponent},
                {path: 'admin/register', component: RegisterAdminComponent},
                {
                    path: 'app', // '\'' + root + '\'',
                    component: AppMainComponent,
                    children: [
                        {
                            path: 'chercheur',
                            loadChildren: './module/chercheur/chercheur-routing.module#ChercheurRoutingModule',
                            canActivate: [AuthGuard],
                        },
                        {
                            path: 'admin',
                            loadChildren: './module/admin/admin-routing.module#AdminRoutingModule',
                            canActivate: [AuthGuard],
                        },
                        {path: 'denied', component: AccessDeniedComponent},
                    ],
                    canActivate: [AuthGuard]
                },
            ],
            {scrollPositionRestoration: 'enabled'}
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
