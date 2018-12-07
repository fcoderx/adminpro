import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

    constructor() { 

        const promesa = new Promise((resolve, reject) => {
            
            let contador = 0;

            const intervalo = setInterval( () => {
                
                contador += 1;
                console.log(contador);

                if (contador === 3) {
                    resolve();
                    clearInterval(intervalo);
                }

            }, 1000);
        });

        promesa.then(
            () => console.log('La promesa se completo')
            ) 
            .catch(err => console.error('Error en la promesa', err));
    }
    
    ngOnInit() {
    }

}
