import { Routes } from '@angular/router';
import { DestinoListarComponent } from './destino/destino-listar/destino-listar.component';
import { EventoListarComponent } from './evento/evento-listar/evento-listar.component';
import { ParticipanteListarComponent } from './participante/participante-listar/participante-listar.component';
import { PuntoParadaListarComponent } from './punto-parada/punto-parada-listar/punto-parada-listar.component';
import { Notfound } from '../../public/notfound/notfound';
import { DestinoFormComponent } from './destino/destino-form/destino-form.component';
import { EventoFormComponent } from './evento/evento-form/evento-form.component';

export default [
    { path: 'destinos', component: DestinoListarComponent },
    { path: 'destinos/nuevo', component: DestinoFormComponent },
    { path: 'destinos/editar/:id', component: DestinoFormComponent },
    { path: 'eventos', component: EventoListarComponent },
    { path: 'eventos/nuevo', component: EventoFormComponent },
    { path: 'eventos/editar/:id', component: DestinoFormComponent },
    { path: 'puntos-paradas', component: PuntoParadaListarComponent },
    { path: 'participantes', component: ParticipanteListarComponent },
    { path: 'notfound', component: Notfound },
    // { path: '**', redirectTo: 'notfound' }
] as Routes;