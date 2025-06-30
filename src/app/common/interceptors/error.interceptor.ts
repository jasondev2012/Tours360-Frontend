import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
  HttpEventType
} from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';
import { tap, throwError } from 'rxjs';
import { SessionService } from '../services/sesion.service';

export const errorInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const messageService = inject(MessageService);
  const sessionService = inject(SessionService);

  return next(req).pipe(
    tap({
      next: (event: HttpEvent<any>) => {
        if (event.type === HttpEventType.Response) {
          const response = event as HttpResponse<any>;
          if (response.body?.success === false && response.body?.code !== 200) {
            messageService.add({
              severity: 'error',
              summary: 'Error (' + response.body.code + ')',
              detail: response.body.message,
            });
            throw new Error(response.body.message || 'Error en la respuesta');
          }
        }
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 401) {
          Swal.fire({
            title: 'Ups!',
            text: 'Tu sesión caducó, por favor vuelve a iniciar sesión.',
            icon: 'warning',
            confirmButtonText: 'OK',
          }).then(() => {
            sessionService.endSession(); // 👈 Aquí se ejecuta tu servicio
          });
        }
        return throwError(() => error);
      }
    })
  );
};
