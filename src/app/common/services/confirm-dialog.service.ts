import { Injectable } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {

  constructor(
    private confirmationService: ConfirmationService
  ) {}

  showDelete(message: string, title: string = "Confirmación!", acceptCallback: () => void) {
    this.confirmationService.confirm({
      message: message,
      header: title,
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancelar',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Aceptar',
        severity: 'danger',
      },
      accept: () => {
        acceptCallback();
        // this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Elemento eliminado' });
      },
      reject: () => {
        // this.messageService.add({ severity: 'warn', summary: 'Cancelado', detail: 'Acción cancelada' });
      }
    });
  }
}
