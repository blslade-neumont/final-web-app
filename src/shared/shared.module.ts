import { NgModule, ModuleWithProviders } from '@angular/core';

import { InspectPipe } from './pipes/inspect.pipe';

import { NgLet } from './directives/ng-let.directive';

//Imports
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";

export const module_exports = [InspectPipe,
                               
                               NgLet];

const imported_modules = [ReactiveFormsModule, CommonModule, HttpModule, FormsModule];
export const exported_modules = [ReactiveFormsModule, CommonModule, HttpModule, FormsModule];

@NgModule({
    declarations: [...module_exports],
    imports     : [...imported_modules],
    exports     : [...module_exports, ...exported_modules]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return { ngModule: SharedModule };
    }
}
