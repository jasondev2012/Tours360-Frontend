import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
@Component({
    selector: 'app-root',
    standalone: true,
    imports: [ConfirmDialogModule, RouterModule, ToastModule, ProgressSpinnerModule, ConfirmPopupModule],
    template: `<p-confirmdialog /><p-toast></p-toast><router-outlet></router-outlet>`
})
export class AppComponent {}
// <p-progressSpinner ariaLabel="loading"></p-progressSpinner>