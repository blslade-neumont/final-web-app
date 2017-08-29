import { Component, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/switchMap';
import { ArtboardService, ArtboardT } from 'services';
import { RoutedComponent } from 'utils/components';

@Component({
    templateUrl: './artboard-list.html',
    styleUrls: ['./artboard-list.scss']
})
export class ArtboardListComponent extends RoutedComponent {
    constructor(private injector: Injector, private artboardService: ArtboardService) {
        super(injector);
    }
    
    artboardNamesObservable: Observable<string[]>;
    artboardsObservable: Observable<[string, ArtboardT][]>;
    
    ngOnInit() {
        super.ngOnInit();
        this.artboardNamesObservable = Observable.fromPromise(this.artboardService.findAll());
        this.artboardsObservable = this.artboardNamesObservable
          .switchMap(async (names) => {
              let artboards: [string, ArtboardT][] = [];
              for (let name of names) {
                  artboards.push([name, (await this.artboardService.get(name))!]);
              }
              return artboards;
          });
    }
}
