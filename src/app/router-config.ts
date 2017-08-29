import { Routes } from '@angular/router';

import { LayoutComponent } from './pages/layout/layout';
import { HomeComponent } from './pages/home/home';
import { AboutComponent } from './pages/about/about';
import { NotFoundComponent } from './pages/not-found/not-found';

export const routerConfig: Routes = [
    {path: '', component: LayoutComponent, children: [
        {path: '', component: HomeComponent, pathMatch: 'full'},
        {path: 'about', component: AboutComponent},
        {path: 'artboards', loadChildren: '../modules/+artboards/artboards.module#ArtboardsModule'},
        {path: '**', component: NotFoundComponent}
    ]}
];
