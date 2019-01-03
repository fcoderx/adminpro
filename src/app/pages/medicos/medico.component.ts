import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { MedicoService, HospitalService } from '../../services/service.index';
import { Medico } from '../../models/medico.model';
import { Router, ActivatedRoute} from '@angular/router';
import { ModelUploadService } from '../../components/model-upload/model-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

    public hospitales: Hospital[] = [];
    public medico: Medico = new Medico('', '', '', '', '');
    public hospital: Hospital = new Hospital('');

    constructor(
        public _medicoService: MedicoService,
        public _hospitalService: HospitalService,
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public _modelServices: ModelUploadService
    ) { 
        this.activatedRoute.params.subscribe(
            params => {
                const id = params['id'];

                if (id !== 'nuevo') {
                    this.cargarMedico(id);
                }
            }
        );
    }
    
    ngOnInit() {
        this._hospitalService.cargarHospitales2().subscribe(
            hospitales => this.hospitales = hospitales
        );

        this._modelServices.notificaciones.subscribe(
            (resp: any) => {
                console.log(resp);
                this.medico.img = resp.medico.img;
            }
        );
    }

    cargarMedico(id: string) {
        this._medicoService.cargarMedico(id).subscribe(
            medico => {
                /* console.log(medico.hospital._id);
                this.medico = medico;
                this.medico.hospital = medico.hopital._id;
                this.cambioHospital(this.medico.hospital); */
                this.medico = medico;
                this.hospital = medico.hospital;
                this.medico.hospital = medico.hospital._id;
            }
        );
    }

    guardarMedico(f: NgForm) {
        console.log(f.valid);
        console.log(f.value);

        if (f.invalid) {
            return;
        } 

        this._medicoService.guardarMedico(this.medico).subscribe(
            medico => {
                this.medico._id = medico._id;
                this.router.navigate(['/medico', medico._id]);
            }
        );
    }

    cambioHospital(id: string) {
        this._hospitalService.obtenerHospital(id).subscribe(
            hospital =>  this.hospital = hospital
        );
    }

    cambiarFoto() {
        this._modelServices.mostrarModal('medicos', this.medico._id);
    }
}
