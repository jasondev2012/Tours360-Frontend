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
    get empresaValid(): boolean{
        return !this.empresaView ? false : this.empresaView.empresaForm.valid;
    }
    get agenciaValid(): boolean{
        return !this.agenciaView ? false : this.agenciaView.agenciaForm.valid;
    }
    get usuarioValid(): boolean{
        return !this.usuarioView ? false : this.usuarioView.usuarioForm.valid;
    }
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
        if(this.empresaValid){
            callback(2);
        }else{
            this.messageService.showWarn("Debe completar los campos obligatorios.")
        }
        
    }
    onAgenciaSiguienteClick(callback:Function){
        this.agencia = this.agenciaView.agencia;
        this.registerService.setAgencia(this.agencia);
        if(this.agenciaValid){
            callback(3);
        }else{
            this.messageService.showWarn("Debe completar los campos obligatorios.")
        }
    }
    onUsuarioAtrasClick(callback:Function){
        this.usuario = this.usuarioView.usuario;
        console.log(this.usuario)
        this.registerService.setUsuario(this.usuario);
        callback(2);
    }
    onGuardarClick(){
        if(this.usuarioValid){
            this.usuario = this.usuarioView.usuario;
            let body: RegistroRequest = {
                empresa: this.empresa,
                agencia: this.agencia,
                usuario: this.usuario,
            }
            this.registroService.guardar(body).subscribe({
                next: res => {
                    if(!res.success){
                        this.messageService.showError(res.message);
                    }else{
                        this.messageService.showSuccess(res.message)
                        const formData = new FormData();
                        formData.append('idAgencia', res.data);
                        formData.append('logo', this.agencia.logo); // archivo (File)
                        this.registroService.guardarLogo(formData).subscribe({
                            next: resLogo => {
                                if(!resLogo.success){
                                    this.messageService.showSuccess(resLogo.message);
                                }
                            }
                        })
                        this.onRegresarLoginClick();
                    }
                    
                },
                error: err => {
                    console.error(err)
                }
            })
            console.info(body)
        }else{
            this.messageService.showWarn("Debe completar los campos obligatorios.")
        }
    }
    onRegresarLoginClick() {
        this.router.navigate(['/auth/login']);
    }
}
