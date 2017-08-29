import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArtboardListComponent } from './pages/artboard-list/artboard-list';
import { ArtboardComponent } from './pages/artboard/artboard';

import { ArtboardPreviewComponent } from './components/artboard-preview/artboard-preview';

//Imports
import { SharedModule } from 'shared/shared.module';

export const routerConfig: Routes = [
    {path: '', children: [
        {path: '', component: ArtboardListComponent},
        {path: ':artboard', component: ArtboardComponent}
    ]}
];

const module_exports = [ArtboardListComponent, ArtboardComponent,
                        
                        ArtboardPreviewComponent];

@NgModule({
    declarations: [...module_exports],
    imports:      [RouterModule.forChild(routerConfig), SharedModule.forRoot()],
    exports:      [...module_exports]
})
export class ArtboardsModule {
}
