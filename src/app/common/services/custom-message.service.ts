import { Injectable } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class CustomMessageService {

  constructor(
    private messageService: MessageService
  ) {}

  showSuccess(message: string, summary = "Ok") {    
    this.messageService.add({
        severity: 'success',
        summary: summary,
        detail: message
    });
  }
  showWarn(message: string, summary = "Validación") {    
    this.messageService.add({
        severity: 'warn',
        summary: summary,
        detail: message
    });
  }
  showError(message: string, summary = "Ups!") {    
    this.messageService.add({
        severity: 'error',
        summary: summary,
        detail: message
    });
  }
  showInfo(message: string, summary = "Importante!") {    
    this.messageService.add({
        severity: 'info',
        summary: summary,
        detail: message
    });
  }
}
