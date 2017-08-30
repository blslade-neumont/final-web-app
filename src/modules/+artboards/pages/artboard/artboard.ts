import { Component, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { ArtboardService, ArtboardT } from 'services';
import { RoutedComponent } from 'utils/components';

@Component({
    templateUrl: './artboard.html',
    styleUrls: ['./artboard.scss']
})
export class ArtboardComponent extends RoutedComponent {
    constructor(
        private injector: Injector,
        private router: Router,
        private artboardService: ArtboardService
    ) {
        super(injector);
    }
    
    artboardNameObservable: Observable<string>;
    artboardObservable: Observable<ArtboardT | null>;
    
    ngOnInit() {
        super.ngOnInit();
        this.artboardNameObservable = this.route.paramMap.map(map => map.get('artboard'));
        this.artboardObservable = this.artboardNameObservable.switchMap(name => this.artboardService.get(name));
    }
    
    async deleteArtboard(name: string) {
        await this.artboardService.delete(name);
        this.router.navigate(['/artboards']);
    }
}
