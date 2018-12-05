import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

    public progreso: number = 20;
    public progreso2: number = 50;

    constructor() { }

    ngOnInit() {
    }

    /* actualizar(event: number) {
        this.progreso = event;
    } */

}
