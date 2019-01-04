import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {

    constructor(
        public _usurioService: UsuarioService,
        public router: Router
    ) { }

    canActivate(): Promise<boolean> | boolean {

        const token = this._usurioService.token;
        const payload = JSON.parse(atob( token.split('.')[1]) );
        const expirado = this.expirado(payload.exp);

        if (expirado) {
            this.router.navigate(['/login']);
            return false;
        }

        console.log(payload);
        return this.verificaRenueva(payload.exp);
    }

    verificaRenueva(fechaExp: number): Promise<boolean> {
        return new Promise( (resolve, reject) => {
            const tokenExp = new Date(fechaExp * 1000); // Convertirlo de segundos a milisegundos
            const ahora = new Date();

            ahora.setTime( ahora.getTime() + (1 * 60 * 60 * 1000) ); // Renovar cuando falte una hora

            if (tokenExp.getTime() > ahora.getTime()) {
                resolve(true);
            } else {
                this._usurioService.renuevaToken().subscribe(
                    () => {
                        resolve(true);
                    },
                    () => {
                        this.router.navigate(['/login']);
                        reject(false);
                    }
                );
            }
        });
    }

    expirado(fecha: number) {
        const ahora = new Date().getTime() / 1000; // Convertir de milisegundos a segundos

        if (fecha < ahora) {
            return true;
        } else {
            return false;
        }
    }
}
