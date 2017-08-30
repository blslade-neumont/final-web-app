import { Component } from '@angular/core';
import { ComponentBase } from 'utils/components';

@Component({
    selector: 'page-logo',
    styleUrls: ['./page-logo.scss'],
    templateUrl: './page-logo.html'
})
export class PageLogoComponent extends ComponentBase {
    constructor() {
        super();
    }
}
