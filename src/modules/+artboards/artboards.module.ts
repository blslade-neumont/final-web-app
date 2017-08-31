import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArtboardListComponent } from './pages/artboard-list/artboard-list';
import { ArtboardComponent } from './pages/artboard/artboard';
import { CreateArtboardComponent } from './pages/create-artboard/create-artboard';

import { ArtboardPreviewComponent } from './components/artboard-preview/artboard-preview';

//Imports
import { SharedModule } from 'shared/shared.module';
import { ColorPickerModule } from 'ngx-color-picker';

export const routerConfig: Routes = [
    {path: '', children: [
        {path: '', component: ArtboardListComponent},
        {path: 'create', component: CreateArtboardComponent},
        {path: ':artboard', component: ArtboardComponent}
    ]}
];

const module_exports = [ArtboardListComponent, ArtboardComponent, CreateArtboardComponent,
                        
                        ArtboardPreviewComponent];

@NgModule({
    declarations: [...module_exports],
    imports:      [RouterModule.forChild(routerConfig), SharedModule.forRoot(), ColorPickerModule],
    exports:      [...module_exports, ColorPickerModule]
})
export class ArtboardsModule {
}
