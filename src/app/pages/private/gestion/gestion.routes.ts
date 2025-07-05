import { Routes } from '@angular/router';
import { DestinoListarComponent } from './destino/destino-listar/destino-listar.component';
import { EventoListarComponent } from './evento/evento-listar/evento-listar.component';
import { ParticipanteListarComponent } from './participante/participante-listar/participante-listar.component';
import { PuntoParadaListarComponent } from './punto-parada/punto-parada-listar/punto-parada-listar.component';
import { Notfound } from '../../notfound/notfound';

export default [
    { path: 'destinos', component: DestinoListarComponent },
    { path: 'eventos', component: EventoListarComponent },
    { path: 'puntos-paradas', component: PuntoParadaListarComponent },
    { path: 'participantes', component: ParticipanteListarComponent },
    { path: 'notfound', component: Notfound },
    { path: '**', redirectTo: 'notfound' }
] as Routes;