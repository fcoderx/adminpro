import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModelUploadService {

    public id: string;
    public tipo: string;
    public oculto: string = 'oculto';
    public notificaciones = new EventEmitter<any>();

    constructor() { 
        console.log('modal service');
    } 

    ocultarModal() {
        this.oculto = 'oculto';
        this.id = null;
        this.tipo = null;
    } 

    mostrarModal(tipo: string, id: string) {
        this.oculto = '';
        this.id = id;
        this.tipo = tipo;
    }
}
