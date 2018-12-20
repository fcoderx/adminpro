import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/service.index';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

    public usuario: Usuario;

    constructor(public _usuarioServices: UsuarioService) { }
    
    ngOnInit() {
        this.usuario = this._usuarioServices.usuario;
    }

}
