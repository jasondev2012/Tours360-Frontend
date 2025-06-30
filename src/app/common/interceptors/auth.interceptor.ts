import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent
} from '@angular/common/http';
import { inject } from '@angular/core';
import { SessionService } from '../services/sesion.service';
import { Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const sessionService = inject(SessionService);
  const session = sessionService.getSession();


  if (session && session.token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${session.token}`,
      },
    });
    return next(cloned);
  }

  return next(req);
};
