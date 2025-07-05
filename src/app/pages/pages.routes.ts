import { Routes } from '@angular/router';
import { Documentation } from './documentation/documentation';
import { Crud } from './crud/crud';
import { Empty } from './empty/empty';
import { Notfound } from './notfound/notfound';

export default [
    { 
        path: 'gestion', 
        loadChildren: () => import('./private/gestion/gestion.routes')
    },
    { path: 'documentation', component: Documentation },
    { path: 'crud', component: Crud },
    { path: 'empty', component: Empty },            
    { path: 'notfound', component: Notfound },
    { path: '**', redirectTo: 'notfound' }
] as Routes;
