import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from '../../demo/view/home/home.component';
import {AgenceComponent} from './agence/agence.component';
import {AdressComponent} from './adress/adress.component';
import {ImageComponent} from './image/image.component';
import {ServicesComponent} from './services/services.component';


const routes: Routes = [{path: 'agence', component: AgenceComponent}, {path: 'adress', component: AdressComponent},
    {path: 'image', component: ImageComponent},
    {path: 'services', component: ServicesComponent}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {
}
