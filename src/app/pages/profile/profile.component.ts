import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

    public usuario: Usuario;
    public subirImagen: File;
    public imgTemporal: any;

    constructor(
        public _usuarioService: UsuarioService
    ) { 
        this.usuario = _usuarioService.usuario;
    }
    
    ngOnInit() {
    }

    guardar(usuario: Usuario) {
        this.usuario.nombre = usuario.nombre;
        if (!this.usuario.google) {
            this.usuario.email = usuario.email;
        }

        this._usuarioService.actualizarUusario(this.usuario)
            .subscribe( resp => {
                console.log(resp);
            });
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

    cambiarImagen() {
        this._usuarioService.cambiarImagen(this.subirImagen, this.usuario._id);
    }
}
