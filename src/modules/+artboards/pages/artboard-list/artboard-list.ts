import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ArtboardService } from 'services';
import { ComponentBase } from 'utils/components';

@Component({
    templateUrl: './artboard-list.html',
    styleUrls: ['./artboard-list.scss']
})
export class ArtboardListComponent extends ComponentBase {
    constructor(private router: Router, private artboardService: ArtboardService) {
        super();
    }
}
