import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

    public usuario: Usuario;
    public token: string;
    public menu: any[] = [];

    constructor(
        public http: HttpClient,
        public router: Router,
        public _subirArchivoService: SubirArchivoService
    ) { 
        this.cargarStorage();
    }

    guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
        localStorage.setItem('id', id);
        localStorage.setItem('token', token);
        localStorage.setItem('usuario', JSON.stringify(usuario));
        localStorage.setItem('menu', JSON.stringify(menu));

        this.usuario = usuario;
        this.token = token;
        this.menu = menu;
    } 

    cargarStorage() {
        if (localStorage.getItem('token')) {
            this.token = localStorage.getItem('token');
            this.usuario = JSON.parse(localStorage.getItem('usuario'));
            this.menu = JSON.parse(localStorage.getItem('menu'));
        } else {
            this.token = '';
            this.usuario = null;
            this.menu = [];
        }
    }

    estaLogueado() {
        return (this.token.length > 5) ? true : false;
    }

    logout() {
        this.usuario = null;
        this.token = '';
        this.menu = [];
        localStorage.removeItem('usuario');
        localStorage.removeItem('token');
        localStorage.removeItem('menu');
        this.router.navigate(['/login']);
    }

    loginGoogle(token: string) {
        const url = URL_SERVICIOS + '/login/google';

        return this.http.post(url, { token }).pipe(
            map((resp: any) => {
                this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);

                return true;
            })
        );
    }

    login(usuario: Usuario, recordar: boolean = false) {

        if (recordar) {
            localStorage.setItem('email', usuario.email);
        } else {
            localStorage.removeItem('email');
        }
        const url = URL_SERVICIOS + '/login';

        return this.http.post(url, usuario).pipe(
            map((resp: any) => {
                this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
                return true;
            }),
            catchError(err => {
                swal('Error en el login', err.error.mensaje, 'error');
                return throwError(err);
            })
        );
    }

    crearUsuario(usuario: Usuario) {
        const url = URL_SERVICIOS + '/usuario';

        return this.http.post(url, usuario).pipe(
            map((resp: any) => {
                swal('Usuario creado', usuario.email, 'success');
                return resp.usuario;
            }),
            catchError(err => {
                swal(err.error.mensaje, err.error.errors.message, 'error');
                return throwError(err);
            })
        );
    }

    actualizarUsuario(usuario: Usuario) {
        const url = URL_SERVICIOS + '/usuario/' + usuario._id + '?token=' + this.token;

        return this.http.put(url, usuario).pipe(
            map((resp: any) => {
                if (usuario._id === this.usuario._id) {
                    const usuarioDB: Usuario = resp.usuario;
                    this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu);
                }
                swal('Usuario actualizado', usuario.nombre, 'success');

                return true;
            }),
            catchError(err => {
                swal(err.error.mensaje, err.error.errors.message, 'error');
                return throwError(err);
            })
        );
    }

    cambiarImagen(archivo: File, id: string) {
        
        this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
            .then((resp: any) => {
                this.usuario.img = resp.usuario.img;
                swal('Imagen actualizada', this.usuario.nombre, 'success');
                this.guardarStorage(id, this.token, this.usuario, this.menu);
            }) 
            .catch(err => {
                console.error('Error: ', err);
            });
    } 

    cargarUsuarios(desde: number) {
        const url = URL_SERVICIOS + '/usuario?desde=' + desde;

        return this.http.get(url);
    }

    buscarUsuarios(termino: string) {
        const url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;

        return this.http.get(url).pipe(
            map((resp: any) => resp.usuarios)
        );
    }

    borrarUsuario(id: string) {
        const url = URL_SERVICIOS + '/usuario/' + id + '?token=' + this.token;
        
        return this.http.delete(url).pipe(
            map(resp => {
                swal('Usuario borrado', 'El usuario ha sido borrado correctamente', 'success');
                return true;
            })
        );
    }
}
