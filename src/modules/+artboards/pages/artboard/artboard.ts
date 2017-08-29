import { Component, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { ArtboardService } from 'services';
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
    
    ngOnInit() {
        super.ngOnInit();
        this.artboardNameObservable = this.route.paramMap.map(map => map.get('artboard'));
    }
}
