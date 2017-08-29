import { Component, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/switchMap';
import { ArtboardService, ArtboardT } from 'services';
import { RoutedComponent } from 'utils/components';

@Component({
    templateUrl: './create-artboard.html',
    styleUrls: ['./create-artboard.scss']
})
export class CreateArtboardComponent extends RoutedComponent {
    constructor(private injector: Injector, private router: Router, private artboardService: ArtboardService) {
        super(injector);
    }
    
    artboardName: string;
    
    isCreating = false;
    async createArtboard() {
        if (!this.artboardName) return;
        this.isCreating = true;
        this.artboardService.put(this.artboardName, {});
        this.router.navigate([this.artboardName], { relativeTo: this.route.parent });
    }
}
