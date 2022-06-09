// const root = environment.rootAppUrl;

import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AuthGuard} from 'src/app/controller/guards/auth.guard';

import {LoginChercheurComponent} from './login-chercheur/login-chercheur.component';
import {RegisterChercheurComponent} from './register-chercheur/register-chercheur.component';

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
                                    component: LoginChercheurComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {
                            path: 'register',
                            children: [
                                {
                                    path: '',
                                    component: RegisterChercheurComponent,
                                    canActivate: [AuthGuard]
                                }
                            ]
                        },
                        {

                            path: 'zenerator',
                            loadChildren: './view/zenerator/zenerator-chercheur-routing.module#ZeneratorChercheurRoutingModule',
                            canActivate: [AuthGuard],
                        },
                    ]
                },
            ]
        ),
    ],
    exports: [RouterModule],
})
export class ChercheurRoutingModule {
}
