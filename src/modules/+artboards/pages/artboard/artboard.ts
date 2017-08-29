import { Component, Injector } from '@angular/core';
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
    constructor(private injector: Injector, private artboardService: ArtboardService) {
        super(injector);
    }
    
    artboardNameObservable: Observable<string>;
    artboardObservable: Observable<ArtboardT | null>;
    
    ngOnInit() {
        super.ngOnInit();
        this.artboardNameObservable = this.route.paramMap.map(map => map.get('artboard'));
        this.artboardObservable = this.artboardNameObservable.switchMap(name => this.artboardService.get(name));
    }
}
