import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { LayoutService } from '../../../../layout/service/layout.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { LoadingService } from '../../../../common/services/loading.service';
import { SessionService } from '../../../../common/services/sesion.service';
import { LoginService } from '../../../../services/auth/login.service';
import { LoginRequest } from '../../../../interfaces/auth/login.interface';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ButtonModule, CheckboxModule, InputTextModule, IconFieldModule, InputIconModule, PasswordModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
    recordarEmail: boolean = false;
    loading: boolean = false;
    contrasenia: string = '123456';
    usuario: string = 'jason.gutierrez.dev@gmail.com';

    constructor(
        public layoutService: LayoutService,
        @Inject(Router) public router: Router,
        private loginService: LoginService,
        private loadingService: LoadingService,
        private messageService: MessageService,
        private sessionService: SessionService
    ) {
        this.sessionService.clearSession(); // Limpia la sesión
    }
    ngOnInit(): void {
        let recEmail = localStorage.getItem('REC_EMAIL');
        if (recEmail && recEmail.toUpperCase() == 'TRUE') {
            let email = localStorage.getItem('EMAIL');
            this.usuario = email || '';
            this.recordarEmail = true;
        }
    }
    onKeyDown(event: KeyboardEvent) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Evitar el comportamiento predeterminado
            this.onIniciarSesionClick(); // Llama a la función de iniciar sesión
        }
    }
    onIniciarSesionClick() {
        let request: LoginRequest = {
            usuario: this.usuario,
            contrasenia: this.contrasenia,
        };
        if (!request.usuario || request.usuario.replaceAll(' ', '') == '') {
            this.messageService.add({
                severity: 'warn',
                summary: 'Validación!',
                detail: 'Debe ingresar un email',
            });
            return;
        } else if (
            !request.contrasenia ||
            request.contrasenia.replaceAll(' ', '') == ''
        ) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Validación!',
                detail: 'Debe ingresar una contraseña',
            });
            return;
        }
        this.loading = true;
        this.loadingService.show();
        this.loginService.getLogin(request)
        .pipe(finalize(() => {
            //this.loadingService.hide()
            this.loading = false;
        }))
        .subscribe({
            next: (res) => {
                if (this.recordarEmail) {
                    localStorage.setItem('EMAIL', this.usuario);
                    localStorage.setItem(
                        'REC_EMAIL',
                        this.recordarEmail.toString()
                    );
                } else {
                    localStorage.removeItem('EMAIL');
                    localStorage.removeItem('REC_EMAIL');
                }
                if(res.success){
                    this.sessionService.setSession(res.data);
                    this.router.navigate([res.data.agencia + '/dashboard']); // Redirige al home
                }else{
                    this.messageService.add({
                        severity: 'warn',
                        summary: 'Validación!',
                        detail: 'Usuario y/o contraseña incorrecta.',
                    });
                }
            },
            error: (err) => {
                //console.error('Error:', err);
            }
        });
    }
    onCrearCuentaClick() {
        this.router.navigate(['/auth/registro']);
    }
}
