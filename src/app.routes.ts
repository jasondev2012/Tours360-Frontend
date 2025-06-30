import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { LoginComponent } from './app/pages/public/auth/login/login.component';
import { Error } from './app/pages/auth/error';
import { AuthGuard } from './app/common/guards/auth.guard';
import { RegisterComponent } from './app/pages/public/auth/register/register.component';

export const appRoutes: Routes = [
    {
        path: ':agencia',
        component: AppLayout,
        children: [
            { path: '', component: Dashboard, canActivate: [AuthGuard] },
            { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'documentation', component: Documentation },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }
        ]
    },
    { path: 'landing', component: Landing },
    { path: 'notfound', component: Notfound },
    { 
        path: 'auth',
        children: [
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'registro',
                component: RegisterComponent
            },
            {
                path: 'error',
                component: Error
            }
        ]
    },
    { path: '**', redirectTo: '/notfound' }
];
