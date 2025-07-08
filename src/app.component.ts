import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, ToastModule, ProgressSpinnerModule],
    template: `<p-toast></p-toast><router-outlet></router-outlet>`
})
export class AppComponent {}
// <p-progressSpinner ariaLabel="loading"></p-progressSpinner>