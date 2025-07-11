import { Routes } from '@angular/router';
import { Access } from './access';
import { Error } from './error';
import { LoginComponent } from '../public/auth/login/login.component';

export default [
    { path: 'access', component: Access },
    { path: 'error', component: Error },
    { path: 'login', component: LoginComponent }
] as Routes;
