import { Component, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
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
        if (this.currentPath && !this.currentPath.d.endsWith('Z')) this.currentPath.d += 'Z';
        this.isEditing = false;
    }
    currentPath: any = null;
    isEditing = false;
    paths: any[] = [];
    nextPathIdx = 1;
    
    svgClicked(svg: SVGElement, evt: MouseEvent) {
        let [px, py] = [(evt.offsetX / svg.clientWidth) * 600, (evt.offsetY / svg.clientHeight) * 400];
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
                this.currentPath = { d: `M${px},${py}`, color: this.color, name: `Layer ${this.nextPathIdx++}` };
                this.paths.push(this.currentPath);
                this.isEditing = true;
            }
            else {
                if (this.currentPath.d.endsWith('Z')) this.currentPath.d = this.currentPath.d.substr(0, this.currentPath.d.length - 1);
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
            this.selectPath(path);
            break;
        case 1:
            break;
        }
    }
    selectPath(path: any) {
        this.currentPath = path;
        this._color = path.color;
        this.currentTool = 0;
    }
    removePathAt(idx: number) {
        let path = this.paths[idx];
        if (!path) return;
        this.paths.splice(idx, 1);
        if (this.currentPath === path) this.currentPath = null;
        this.currentTool = 0;
    }
    
    ngOnInit() {
        super.ngOnInit();
        this.artboardNameObservable = this.route.paramMap.map(map => map.get('artboard')!);
        this.artboardObservable = this.artboardNameObservable
          .switchMap(name => this.artboardService.get(name))
          .do(artboard => {
              if (!artboard) return;
              this.currentPath = null;
              this.isEditing = false;
              this.currentTool = 0;
              this.paths = artboard.paths || [];
              this.nextPathIdx = artboard.nextPathIdx || (this.paths.length + 1);
          });
    }
    
    async deleteArtboard(name: string) {
        await this.artboardService.delete(name);
        this.router.navigate(['/artboards']);
    }
    async saveArtboard(name: string) {
        if (!this.artboard) return;
        this.artboard = {
            paths: this.paths,
            nextPathIdx: this.nextPathIdx
        };
        this.artboardService.put(name, this.artboard);
        this.router.navigate(['/artboards']);
    }
}
