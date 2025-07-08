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
        console.log(error)
        if (error.status === 401) {
          Swal.fire({
            title: 'Ups!',
            text: 'Tu sesión caducó, por favor vuelve a iniciar sesión.',
            icon: 'warning',
            confirmButtonText: 'OK',
          }).then(() => {
            sessionService.endSession(); // 👈 Aquí se ejecuta tu servicio
          });
        }else{
          if (error.error?.data && typeof error.error.data === 'object') {
            const mensajes = Object.values(error.error.data);
            const mensajeUnico = mensajes.join('\n'); // o '\n' si es texto plano
            messageService.add({
              severity: 'error',
              summary: 'Error (' + error.status + ')',
              detail: mensajeUnico,
            });
          }else{
            messageService.add({
              severity: 'error',
              summary: 'Ups!',
              detail: 'No logramos comunicarnos con nuestro servidor. Actualice y vuelva a intentar.',
            });
          }
        }
        return throwError(() => error);
      }
    })
  );
};
