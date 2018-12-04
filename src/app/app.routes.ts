import { Routes, RouterModule } from '@angular/router';



import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';




const ROUTES: Routes = [

    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', component: NopagefoundComponent }

];

export const APP_ROUTING = RouterModule.forRoot(ROUTES, { useHash: true });
