import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

    @ViewChild('txtProgress') txtProgress: ElementRef;

    @Input() public leyenda: string = 'leyenda';
    @Input() public progreso: number = 50;

    @Output() cambioValor: EventEmitter<number> = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    alcambiar(newValue: number) {
        /* console.log(newValue);
        const elemtHTML: any = document.getElementsByName('progreso')[0]; */
        if (newValue >= 100) {
            this.progreso = 100;
        } else if (newValue <= 0) {
            this.progreso = 0;
        } else {
            this.progreso = newValue;
        }

        this.txtProgress.nativeElement.value = this.progreso;
        this.cambioValor.emit(this.progreso);
    }

    cambiarValor(valor: number) {

        if (this.progreso >= 100 && valor > 0) {
            this.progreso = 100;
            return;
        }

        if (this.progreso <= 0 && valor < 0) {
            this.progreso = 0;
            return;
        }

        this.progreso += valor;

        this.txtProgress.nativeElement.focus();

        this.cambioValor.emit(this.progreso);
    }

}
