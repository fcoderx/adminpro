import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from '../../models/medico.model';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

    public totalMedicos: number = 0;
    constructor(
        public http: HttpClient,
        public _usuarioService: UsuarioService
    ) { }

    cargarMedicos(desde: number) {
        const url = URL_SERVICIOS + '/medico?desde=' + desde;

        return this.http.get(url).pipe(
            map((resp: any) => {
                this.totalMedicos = resp.total;
                return resp.medicos;
            })
        );

    }

    buscarMedicos(termino: string) {
        const url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;

        return this.http.get(url).pipe(
            map((resp: any) => resp.medicos)
        );
    }

    borrarMedico(id: string) {
        let url = URL_SERVICIOS + '/medico/' + id;
        url += '?token=' + this._usuarioService.token;

        return this.http.delete(url).pipe(
            map(resp => {
                swal('Médico borrado', 'Médico borrado correctamente', 'success');
                return resp;
            })
        );
    }

    guardarMedico(medico: Medico) {
        let url = URL_SERVICIOS + '/medico';

        if (medico._id) {
            // Actualizando
            url += '/' + medico._id;
            url += '?token=' + this._usuarioService.token;

            return this.http.put(url, medico).pipe(
                map((resp: any) => {
                    swal('Médico actualizado', medico.nombre, 'success');

                    return resp.medico;
                })
            );
        } else {
            // Creando
            url += '?token=' + this._usuarioService.token;
    
            return this.http.post(url, medico).pipe(
                map((resp: any) => {
                    swal('Médico creado', medico.nombre, 'success');
                    return resp.medico;
                })
            );
        }
    }

    cargarMedico(id: string) {
        const url = URL_SERVICIOS + '/medico/' + id;

        return this.http.get(url).pipe(
            map((resp: any) => resp.medico)
        );
    } 
}
