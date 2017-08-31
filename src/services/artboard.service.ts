import { Injectable } from '@angular/core';

export type ArtboardT = {
    paths?: {
        d: string,
        color: string,
        name: string
    }[],
    nextPathIdx?: number
}

@Injectable()
export class ArtboardService {
    constructor() {
    }
    
    async findAll(): Promise<string[]> {
        let artboards: string[] = JSON.parse(localStorage.getItem('artboards') || '[]');
        return artboards;
    }
    
    async get(name: string): Promise<ArtboardT | null> {
        let jsonStr = localStorage.getItem(`artboard[${name}]`);
        if (!jsonStr) return null;
        let artboard = JSON.parse(jsonStr);
        return artboard;
    }
    
    async put(name: string, artboard: ArtboardT) {
        localStorage.setItem(`artboard[${name}]`, JSON.stringify(artboard));
        let artboards = await this.findAll();
        if (artboards.indexOf(name) === -1) {
            artboards.push(name);
            localStorage.setItem('artboards', JSON.stringify(artboards));
        }
    }
    
    async delete(name: string) {
        localStorage.removeItem(`artboard[${name}]`);
        let artboards = await this.findAll();
        let artIdx = artboards.indexOf(name);
        if (artIdx !== -1) {
            artboards.splice(artIdx, 1);
            localStorage.setItem('artboards', JSON.stringify(artboards));
        }
    }
}
