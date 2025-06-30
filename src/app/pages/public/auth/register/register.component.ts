import { Component, Inject, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { EmpresaComponent } from "./empresa/empresa.component";
import { UsuarioComponent } from "./usuario/usuario.component";
import { AgenciaComponent } from "./agencia/agencia.component";
import { Router } from '@angular/router';
import { EmpresaRequest } from '../../../../interfaces/seguridad/empresa.interface';
import { AgenciaRequest } from '../../../../interfaces/seguridad/agencia.interface';
import { RegisterService } from '../../../service/registro.service';
import { UsuarioRequest } from '../../../../interfaces/seguridad/usuario.interface';
import { RegistroRequest } from '../../../../interfaces/auth/registro.intertace';
import { RegistroService } from '../../../../services/auth/registro.service';
import { CustomMessageService } from '../../../../common/services/custom-message.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ButtonModule, StepperModule, EmpresaComponent, UsuarioComponent, AgenciaComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
    @ViewChild(EmpresaComponent) empresaView!: EmpresaComponent;
    @ViewChild(AgenciaComponent) agenciaView!: AgenciaComponent;
    @ViewChild(UsuarioComponent) usuarioView!: UsuarioComponent;
    empresa!: EmpresaRequest;
    agencia!: AgenciaRequest;
    usuario!: UsuarioRequest;
    constructor(
        @Inject(Router) public router: Router,
        private registerService: RegisterService,
        private messageService: CustomMessageService,
        private registroService: RegistroService
    ) {
    }
    onEmpresaSiguienteClick(callback:Function){
        this.empresa = this.empresaView.empresa;
        this.registerService.setEmpresa(this.empresa);
        callback(2);
    }
    onAgenciaSiguienteClick(callback:Function){
        this.agencia = this.agenciaView.agencia;
        this.registerService.setAgencia(this.agencia);
        callback(3);
    }
    onUsuarioAtrasClick(callback:Function){
        this.usuario = this.usuarioView.usuario;
        console.log(this.usuario)
        this.registerService.setUsuario(this.usuario);
        callback(2);
    }
    onGuardarClick(){
        this.usuario = this.usuarioView.usuario;
        let body: RegistroRequest = {
            empresa: this.empresa,
            agencia: this.agencia,
            usuario: this.usuario,
        }
        this.registroService.guardar(body).subscribe({
            next: res => {
                if(res.success){
                    this.messageService.showError(res.message)
                }else{
                    this.messageService.showSuccess(res.message)
                }
                
            },
            error: err => {
                console.error(err)
            }
        })
        console.info(body)
    }
    onRegresarLoginClick() {
        this.router.navigate(['/auth/login']);
    }
}
