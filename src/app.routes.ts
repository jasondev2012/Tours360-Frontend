import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { LoginComponent } from './app/pages/public/auth/login/login.component';
import { Error } from './app/pages/auth/error';
import { AuthGuard } from './app/common/guards/auth.guard';
import { RegisterComponent } from './app/pages/public/auth/register/register.component';
import { AgenciaGuard } from './app/common/guards/agencia.guard';
import { Notfound } from './app/pages/public/notfound/notfound';

export const appRoutes: Routes = [
    { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
    { 
        path: 'auth',
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'registro', component: RegisterComponent },
            { path: 'error', component: Error },
            { path: 'notfound', component: Notfound },
            { path: '**', redirectTo: 'login' }
        ],
    },
    {
        path: ':agencia',
        component: AppLayout,
        canActivateChild: [AgenciaGuard],
        children: [
            { path: '', loadChildren: () => import('./app/pages/pages.routes'), canActivate: [AuthGuard] },
            { path: 'notfound', component: Notfound },
            // { path: '**', redirectTo: 'notfound' }
        ]
    },
    // { path: '**', redirectTo: '/auth/notfound' }
];
