import { NgModule, ModuleWithProviders } from '@angular/core';

import { InspectPipe } from './pipes/inspect.pipe';

//Imports
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { HttpModule } from "@angular/http";

export const module_exports = [InspectPipe];

const imported_modules = [ReactiveFormsModule, CommonModule, HttpModule];
export const exported_modules = [ReactiveFormsModule, CommonModule, HttpModule];

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
