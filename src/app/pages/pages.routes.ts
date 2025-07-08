import { Routes } from '@angular/router';
import { Documentation } from './public/documentation/documentation';
import { Crud } from './crud/crud';
import { Empty } from './public/empty/empty';
import { Notfound } from './public/notfound/notfound';
import { Dashboard } from './private/dashboard/dashboard';

export default [
    { path: 'dashboard', component: Dashboard },
    { path: 'gestion', loadChildren: () => import('./private/gestion/gestion.routes') },
    { path: 'documentation', component: Documentation },
    { path: 'crud', component: Crud },
    { path: 'empty', component: Empty },
    { path: 'notfound', component: Notfound },
    { path: 'uikit', loadChildren: () => import('./public/uikit/uikit.routes') },
    // { path: '**', redirectTo: 'notfound' },
] as Routes;
