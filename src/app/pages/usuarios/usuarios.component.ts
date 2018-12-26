import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import { ModelUploadService } from '../../components/model-upload/model-upload.service';
// import swal from 'sweetalert';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

    public usuarios: Usuario[] = [];
    public desde: number = 0;
    public totalRegistros: number = 0;
    public cargando: boolean = true;

    constructor(
        public _usuarioService: UsuarioService,
        public _modelServices: ModelUploadService
    ) { }
    
    ngOnInit() {
        this.cargarUsuarios();
        this._modelServices.notificaciones.subscribe(() => this.cargarUsuarios());
    }

    mostrarModal(id: string) {
        this._modelServices.mostrarModal('usuarios', id);
    }

    cargarUsuarios() {
        this.cargando = true;

        this._usuarioService.cargarUsuarios(this.desde)
            .subscribe((resp: any) => {
                console.log(resp);
                this.totalRegistros = resp.total;
                this.usuarios = resp.usuarios;
                this.cargando = false;
            });
    }

    cambiarDesde(valor: number) {
        const desde = this.desde + valor;
        console.log(desde);

        if (desde >= this.totalRegistros) {
            return;
        }

        if (desde < 0) {
            return;
        }

        this.desde += valor;
        this.cargarUsuarios();
    }

    buscarUsuario(termino: string) {

        if (termino.length <= 0) {
            this.cargarUsuarios();
            return;
        }

        this.cargando = true;

        this._usuarioService.buscarUsuarios(termino)
            .subscribe((usuarios: Usuario[]) => {
                this.usuarios = usuarios;
                this.cargando = false;
            });
    }

    borrarUsuario(usuario: Usuario) {
        if (usuario._id === this._usuarioService.usuario._id) {
            swal('No se puede borrar usuario', 'No se puede borrar a si mismo', 'error');
            return;
        }

        swal({
            title: 'Estas seguro?',
            text: 'Esta a punto de borrar a ' + usuario.nombre,
            icon: 'warning',
            buttons: true,
            dangerMode: true
        })
        .then((borrar) => {

            if (borrar) {
                this._usuarioService.borrarUsuario(usuario._id)
                    .subscribe(borrado => {
                        this.desde = 0;
                        this.cargarUsuarios();
                        
                    });
            }
        });
    } 

    guardarUsuario(usuario: Usuario) {
        this._usuarioService.actualizarUsuario(usuario).subscribe();
    }

}
