import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/service.index';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

    public medicos: Medico[] = [];
    public desde: number = 0;

    constructor(
        public _medicoService: MedicoService
    ) { }
    
    ngOnInit() {
        this.cargarMedicos();
    }

    cargarMedicos() {
        this._medicoService.cargarMedicos(this.desde).subscribe(
            medicos => this.medicos = medicos
        );
    }

    buscarMedico(termino: string) {
        if (termino.length <= 0) {
            this.cargarMedicos();
            return;
        }

        this._medicoService.buscarMedicos(termino).subscribe(
            medicos => this.medicos = medicos
        );
    }

    borrarMedico(medico: Medico) {
        this._medicoService.borrarMedico(medico._id).subscribe(
            () => {
                this.desde = 0;
                this.cargarMedicos();
            }
        );
    }

    cambiarDesde(valor: number) {
        const desde = this.desde + valor;
        console.log(desde);

        if (desde >= this._medicoService.totalMedicos) {
            return;
        }

        if (desde < 0) {
            return;
        }

        this.desde += valor;
        this.cargarMedicos();
    }

}
