import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './controller/service/Auth.service';

import {
    trigger,
    state,
    style,
    transition,
    animate,
} from '@angular/animations';
import {AppComponent} from './app.component';
import {AppMainComponent} from './app.main.component';
import {RoleService} from './controller/service/role.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
    animations: [
        trigger('inline', [
            state(
                'hidden',
                style({
                    height: '0px',
                    overflow: 'hidden',
                })
            ),
            state(
                'visible',
                style({
                    height: '*',
                })
            ),
            state(
                'hiddenAnimated',
                style({
                    height: '0px',
                    overflow: 'hidden',
                })
            ),
            state(
                'visibleAnimated',
                style({
                    height: '*',
                })
            ),
            transition(
                'visibleAnimated => hiddenAnimated',
                animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
            ),
            transition(
                'hiddenAnimated => visibleAnimated',
                animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
            ),
        ]),
    ],
})
export class AppMenuComponent implements OnInit {
    model: any[];
    modelsuperadmin: any[];
    modelanonymous: any[];
    modelchercheur: any[];
    modeladmin: any[];

    constructor(public app: AppComponent,
                public appMain: AppMainComponent,
                private roleService: RoleService,
                private authService: AuthService,
                private router: Router) {
    }

    ngOnInit() {


        this.modelchercheur =
            [
                {
                    label: 'Etat message',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste etat message',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/null/etat-message/list']
                        },
                    ]
                },
                {
                    label: 'Jour',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste jour',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/null/jour/list']
                        },
                    ]
                },
                {
                    label: 'Type avis',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste type avis',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/null/type-avis/list']
                        },
                    ]
                },
                {
                    label: 'Message',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste message',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/null/message/list']
                        },
                    ]
                },
                {
                    label: 'Categorie permis',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste categorie permis',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/null/categorie-permis/list']
                        },
                    ]
                },
                {
                    label: 'Gender',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste gender',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/null/gender/list']
                        },
                    ]
                },
                {
                    label: 'Avis visiteur',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste avis visiteur',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/null/avis-visiteur/list']
                        },
                    ]
                },
                {
                    label: 'Chercheur',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste chercheur',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/null/chercheur/list']
                        },
                    ]
                },
                {
                    label: 'Ecole',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste ecole',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/null/ecole/list']
                        },
                    ]
                },
                {
                    label: 'Marque',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste marque',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/null/marque/list']
                        },
                    ]
                },
                {
                    label: 'Permis',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste permis',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/null/permis/list']
                        },
                    ]
                },
                {
                    label: 'Vehicule',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste vehicule',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/null/vehicule/list']
                        },
                    ]
                },
                {
                    label: 'Planning item',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste planning item',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/null/planning-item/list']
                        },
                    ]
                },
                {
                    label: 'Moniteur pratique',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste moniteur pratique',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/null/moniteur-pratique/list']
                        },
                    ]
                },
                {
                    label: 'Type vehicule',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste type vehicule',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/null/type-vehicule/list']
                        },
                    ]
                },
                {
                    label: 'Moniteur theorique',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste moniteur theorique',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/null/moniteur-theorique/list']
                        },
                    ]
                },
                {
                    label: 'Ville',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste ville',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/null/ville/list']
                        },
                    ]
                },
                {
                    label: 'Gerant',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste gerant',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/chercheur/null/gerant/list']
                        },
                    ]
                },
            ];
        this.modeladmin =
            [
                // {
                //     label: 'Etat message',
                //     icon: 'pi pi-wallet',
                //     items: [
                //         {
                //             label: 'Liste etat message',
                //             icon: 'pi pi-fw pi-plus-circle',
                //             routerLink: ['/app/admin/null/etat-message/list']
                //         },
                //     ]
                // },
                // {
                //     label: 'Jour',
                //     icon: 'pi pi-wallet',
                //     items: [
                //         {
                //             label: 'Liste jour',
                //             icon: 'pi pi-fw pi-plus-circle',
                //             routerLink: ['/app/admin/null/jour/list']
                //         },
                //     ]
                // },
                // {
                //     label: 'Type avis',
                //     icon: 'pi pi-wallet',
                //     items: [
                //         {
                //             label: 'Liste type avis',
                //             icon: 'pi pi-fw pi-plus-circle',
                //             routerLink: ['/app/admin/null/type-avis/list']
                //         },
                //     ]
                // },
                {
                    label: 'Message',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste message',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/message/list']
                        },
                    ]
                },
                // {
                //     label: 'Categorie permis',
                //     icon: 'pi pi-wallet',
                //     items: [
                //         {
                //             label: 'Liste categorie permis',
                //             icon: 'pi pi-fw pi-plus-circle',
                //             routerLink: ['/app/admin/null/categorie-permis/list']
                //         },
                //     ]
                // },
                // {
                //     label: 'Gender',
                //     icon: 'pi pi-wallet',
                //     items: [
                //         {
                //             label: 'Liste gender',
                //             icon: 'pi pi-fw pi-plus-circle',
                //             routerLink: ['/app/admin/null/gender/list']
                //         },
                //     ]
                // },
                {
                    label: 'Avis visiteur',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste avis visiteur',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/avis-visiteur/list']
                        },
                    ]
                },
                // {
                //     label: 'Chercheur',
                //     icon: 'pi pi-wallet',
                //     items: [
                //         {
                //             label: 'Liste chercheur',
                //             icon: 'pi pi-fw pi-plus-circle',
                //             routerLink: ['/app/admin/null/chercheur/list']
                //         },
                //     ]
                // },
                {
                    label: 'Ecole',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste ecole',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/ecole/list']
                        },
                    ]
                },
                // {
                //     label: 'Marque',
                //     icon: 'pi pi-wallet',
                //     items: [
                //         {
                //             label: 'Liste marque',
                //             icon: 'pi pi-fw pi-plus-circle',
                //             routerLink: ['/app/admin/null/marque/list']
                //         },
                //     ]
                // },
                // {
                //     label: 'Permis',
                //     icon: 'pi pi-wallet',
                //     items: [
                //         {
                //             label: 'Liste permis',
                //             icon: 'pi pi-fw pi-plus-circle',
                //             routerLink: ['/app/admin/null/permis/list']
                //         },
                //     ]
                // },
                {
                    label: 'Vehicule',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste vehicule',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/vehicule/list']
                        },
                    ]
                },
                {
                    label: 'Planning item',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste planning item',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/planning-item/list']
                        },
                    ]
                },
                {
                    label: 'Moniteur pratique',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste moniteur pratique',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/moniteur-pratique/list']
                        },
                    ]
                },
                // {
                //     label: 'Type vehicule',
                //     icon: 'pi pi-wallet',
                //     items: [
                //         {
                //             label: 'Liste type vehicule',
                //             icon: 'pi pi-fw pi-plus-circle',
                //             routerLink: ['/app/admin/null/type-vehicule/list']
                //         },
                //     ]
                // },
                {
                    label: 'Moniteur theorique',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste moniteur theorique',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/moniteur-theorique/list']
                        },
                    ]
                },
                {
                    label: 'Ville',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste ville',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/ville/list']
                        },
                    ]
                },
                {
                    label: 'Gerant',
                    icon: 'pi pi-wallet',
                    items: [
                        {
                            label: 'Liste gerant',
                            icon: 'pi pi-fw pi-plus-circle',
                            routerLink: ['/app/admin/gerant/list']
                        },
                    ]
                },
            ];
        if (this.authService.authenticated) {
            if (this.authService.authenticatedUser.roles) {

                this.authService.authenticatedUser.roles.forEach(role => {
                    const roleName: string = this.getRole(role);
                    this.roleService._role.next(roleName.toUpperCase());
                    eval('this.model = this.model' + this.getRole(role));
                });
            }

        }
    }

    getRole(text) {
        const [role, ...rest] = text.split('_');
        return rest.join('').toLowerCase();
    }

    onMenuClick(event) {
        this.appMain.onMenuClick(event);
    }
}
