import { Component, Injector } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { ComponentBase } from './component-base';
import { Observable } from 'rxjs/Observable'

@Component({ })
export class RoutedComponent extends ComponentBase {
    public constructor(injector: Injector) {
        super();
        this.__activatedRoute = injector.get(ActivatedRoute, null);
    }
    
    private __activatedRoute: ActivatedRoute;
    get route(): ActivatedRoute {
        return this.__activatedRoute;
    }
}
