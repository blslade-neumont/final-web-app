import { Component, Input } from '@angular/core';
import { ArtboardT } from 'services';
import { ComponentBase } from 'utils/components';

@Component({
    selector: 'div[artboard-preview][artboard]',
    templateUrl: './artboard-preview.html',
    styleUrls: ['./artboard-preview.scss'],
    host: {
        
    }
})
export class ArtboardPreviewComponent extends ComponentBase {
    constructor() {
        super();
    }
    
    @Input() artboard: ArtboardT;
}
