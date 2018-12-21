import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../../services/service.index';
import { ModelUploadService } from './model-upload.service';

@Component({
  selector: 'app-model-upload',
  templateUrl: './model-upload.component.html',
  styles: []
})
export class ModelUploadComponent implements OnInit {

    public subirImagen: File;
    public imgTemporal: any;

    constructor(
        public _subirImagen: SubirArchivoService,
        public _modelService: ModelUploadService
    ) { }
    
    ngOnInit() {
    }

    subirImg() {
        this._subirImagen.subirArchivo(this.subirImagen, this._modelService.tipo, this._modelService.id)
            .then(resp => {
                this._modelService.notificaciones.emit(resp);
                this.cerrarModal();
            })
            .catch(err => {
                console.log('Error en la carga');
            });
    }

    cerrarModal() {
        this.subirImagen = null;
        this.imgTemporal = null;

        this._modelService.ocultarModal();
    }

    seleccionaImage( archivo: File) {

        if (!archivo) {
            this.subirImagen = null;
            return;
        }

        if (archivo.type.indexOf('image') < 0) {
            swal('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
            this.subirImagen = null;
        }
        
        this.subirImagen = archivo;

        const reader = new FileReader();
        reader.readAsDataURL(archivo);
        reader.onloadend = () => this.imgTemporal = reader.result;
    }

}
