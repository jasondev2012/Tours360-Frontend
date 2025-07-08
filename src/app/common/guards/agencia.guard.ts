import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '../services/sesion.service';

@Injectable({ providedIn: 'root' })
export class AgenciaGuard implements CanActivateChild {
    constructor(private sessionService: SessionService, private router: Router) {}

    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        const agenciaUrl = route.parent?.params['agencia'];
        const agenciaUsuario = this.sessionService.getSession()?.agencia;

        if (agenciaUrl !== agenciaUsuario) {
            const nuevaUrl = state.url.replace(`/${agenciaUrl}`, `/${agenciaUsuario}`);
            this.router.navigateByUrl(nuevaUrl);
            return false; // cancela la navegación actual, pero redirige a la correcta
        }

        return true;
    }
}
