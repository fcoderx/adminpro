import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import { ModelUploadService } from '../../components/model-upload/model-upload.service';
/* import swal from 'sweetalert'; */
declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

    public hospitales: Hospital[] = [];
    public cargando: boolean = true;
    public desde: number = 0;

    constructor(
        public _hospitalService: HospitalService,
        public _modelService: ModelUploadService
    ) { }
    
    ngOnInit() {
        this.cargarHospitales();
        this._modelService.notificaciones.subscribe(
            () => this.cargarHospitales()
        );
    }

    cargarHospitales() {
        this.cargando = true;

        this._hospitalService.cargarHospitales(this.desde).subscribe(
            hospitales => {
                this.hospitales = hospitales;
                this.cargando = false;
            });
    }

    guardarHospital(hospital: Hospital) {
        this._hospitalService.actualizarHospital(hospital).subscribe();
    }

    borrarHospital(hospital: Hospital) {
        this._hospitalService.borrarHospital(hospital._id).subscribe(
            () => {
                this.desde = 0;
                this.cargarHospitales();
            }
        );
    }

    buscarHospital(termino: string) {
        
        if (termino.length <= 0) {
            this.cargarHospitales();
            return;
        } 

        this.cargando = true;

        this._hospitalService.buscarHospitales(termino).subscribe(
            hospitales => {
                this.hospitales = hospitales;
                this.cargando = false;
            });
    }

    crearHospital() {
        swal({
            title: 'Crear Hospital',
            text: 'Ingrese el nombre del hospital',
            content: 'input',
            icon: 'info',
            buttons: true,
            dangerMode: true
        }).then((valor: string) => {
            if (!valor || valor.length === 0) {
                return;
            }

            this._hospitalService.crearHospital(valor).subscribe(
                () => this.cargarHospitales()
            );
        });
    }

    actualizarImagen(hospital: Hospital) {
        this._modelService.mostrarModal('hospitales', hospital._id);
    }

    cambiarDesde(valor: number) {
        const desde = this.desde + valor;
        console.log(desde);

        if (desde >= this._hospitalService.totalHospitales) {
            return;
        }

        if (desde < 0) {
            return;
        }

        this.desde += valor;
        this.cargarHospitales();
    }

}
