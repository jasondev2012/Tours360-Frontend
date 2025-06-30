import { Routes } from '@angular/router';
import { DestinoListarComponent } from './destino/destino-listar/destino-listar.component';
import { EventoListarComponent } from './evento/evento-listar/evento-listar.component';
import { ParticipanteListarComponent } from './participante/participante-listar/participante-listar.component';
import { PuntoParadaListarComponent } from './punto-parada/punto-parada-listar/punto-parada-listar.component';

export default [
    { path: 'destinos', component: DestinoListarComponent },
    { path: 'eventos', component: EventoListarComponent },
    { path: 'puntos-paradas', component: PuntoParadaListarComponent },
    { path: 'participantes', component: ParticipanteListarComponent },
    { path: '**', redirectTo: 'destinos', pathMatch: 'full' } // redirección relativa
] as Routes;