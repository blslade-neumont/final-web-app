import { NgModule } from '@angular/core';

//Providers
import { ArtboardService } from './artboard.service';

const module_providers = [ArtboardService];

@NgModule({
    providers: [...module_providers]
})
export class ServicesModule {
}
