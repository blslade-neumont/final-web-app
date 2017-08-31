import { Component, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { ArtboardService, ArtboardT } from 'services';
import { RoutedComponent } from 'utils/components';
import { ObservableInput } from 'utils/observable-input';

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
    
    @ObservableInput() artboard: ArtboardT | null;
    artboardObservable: Observable<ArtboardT | null>;
    
    private _color: string = '#FF0000';
    get color() {
        return this._color;
    }
    set color(val: string) {
        if (val === this._color) return;
        this._color = val;
        if (this.currentPath && this.currentTool === 0) this.currentPath.color = val;
        this.isEditing = false;
    }
    
    private _currentTool = 0;
    get currentTool() {
        return this._currentTool;
    }
    set currentTool(val: number) {
        if (this._currentTool === val) return;
        this._currentTool = val;
        this.isEditing = false;
    }
    currentPath: any = null;
    isEditing = false;
    paths = [
        { d: 'M100,10L40,198L190,78L10,78L160,198', color: 'red' }
    ];
    
    svgClicked(evt: MouseEvent) {
        let [px, py] = [evt.offsetX, evt.offsetY];
        switch (this.currentTool) {
        case 0:
            //Pointer
            evt.preventDefault();
            evt.stopPropagation();
            this.currentPath = null;
            break;
        case 1:
            //Pen
            if (!this.currentPath || !this.isEditing) {
                this.currentPath = { d: `${px},${py}`, color: this.color };
                this.paths.push(this.currentPath);
                this.isEditing = true;
            }
            else {
                this.currentPath.d += `L${px},${py}`;
            }
            break;
        }
    }
    svgMouseMoved(svg: SVGElement) {
        svg.style.cursor = (this.currentTool === 1 ? 'crosshair' : 'default');
    }
    pathClicked(path: any, evt: MouseEvent) {
        switch (this.currentTool) {
        case 0:
            //Pointer
            evt.preventDefault();
            evt.stopPropagation();
            this.currentPath = path;
            this._color = path.color;
            break;
        case 1:
            break;
        }
    }
    
    ngOnInit() {
        super.ngOnInit();
        this.artboardNameObservable = this.route.paramMap.map(map => map.get('artboard'));
        this.artboardObservable = this.artboardNameObservable.switchMap(name => this.artboardService.get(name));
    }
    
    async deleteArtboard(name: string) {
        await this.artboardService.delete(name);
        this.router.navigate(['/artboards']);
    }
    async saveArtboard(name: string) {
        if (!this.artboard) return;
        this.artboardService.put(name, this.artboard);
    }
}
