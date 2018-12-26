import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SettingsService, SharedService, SidebarService, UsuarioService, LoginGuardGuard, SubirArchivoService, HospitalService, MedicoService } from './service.index';
import { ModelUploadService } from '../components/model-upload/model-upload.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService, 
    SharedService, 
    SidebarService,
    UsuarioService,
    LoginGuardGuard,
    SubirArchivoService,
    ModelUploadService,
    HospitalService,
    MedicoService
  ],
  declarations: []
})
export class ServiceModule { }
