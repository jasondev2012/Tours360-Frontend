import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import Aura from '@primeng/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { definePreset } from '@primeng/themes';
import { appRoutes } from './app.routes';
import { ConfirmationService, MessageService } from 'primeng/api';
import { authInterceptor } from './app/common/interceptors/auth.interceptor';
import { errorInterceptor } from './app/common/interceptors/error.interceptor';

const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{green.50}',
            100: '{green.100}',
            200: '{green.200}',
            300: '{green.300}',
            400: '{green.400}',
            500: '{green.500}',
            600: '{green.600}',
            700: '{green.700}',
            800: '{green.800}',
            900: '{green.900}',
            950: '{green.950}'
        }
    }
});

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(appRoutes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), withEnabledBlockingInitialNavigation()),
        provideHttpClient(
            withFetch(),
            withInterceptors([errorInterceptor, authInterceptor])
        ),
        provideAnimationsAsync(),
        providePrimeNG({ 
            translation: {
                accept: "Aceptar",
                reject: "Rechazar",
                emptyMessage: "No se encontraron resultados",
                emptyFilterMessage: "No se encontraron resultados",
                emptySearchMessage: "No se encontraron resultados",
                dateFormat: "dd/mm/yyyy",
                firstDayOfWeek: 1,
                monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
            },
            theme: { 
                preset: MyPreset, 
                options: { 
                    darkModeSelector: '.app-dark' 
                } 
            } 
        }),
        MessageService,
        ConfirmationService
    ]
};