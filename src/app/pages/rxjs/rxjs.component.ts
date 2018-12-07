import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators'; 

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {
    
    public subscripcion: Subscription;

    constructor() { 
        
        this.subscripcion = this.regresaObservable()
        .subscribe(
            numero => console.log('Subs', numero),
            err => console.error('Error en el obs', err),
            () => console.log('El observador termino')
        );
    }
    
    ngOnInit() {
    }

    ngOnDestroy() {
        console.log('Cerrando la página');
        this.subscripcion.unsubscribe();
    }

    regresaObservable(): Observable<number> {


        return new Observable(observer => {

            let contador = 0;

            const intervalo = setInterval( () => {
                contador ++ ;

                const salida = {
                    valor: contador
                };

                // observer.next(salida);

                /* if (contador === 3) {
                    clearInterval(intervalo);
                    observer.complete();
                } */

               /*  if (contador === 2) {
                    clearInterval(intervalo);
                    observer.error('Auxilio me desmayo');
                } */
            }, 1000);
        }); /* pipe(
            map( resp => resp.valor),
            filter( (valor, index) => {
                // console.log('filtro', valor, index);
                if ( (valor % 2) === 1) {
                    // Impar
                    return true;
                } else {
                    // Par
                    return false;
                }
            })
        ); */
    }
}
