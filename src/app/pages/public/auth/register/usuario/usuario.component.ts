import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ShowErrorsDirective } from '../../../../../common/directives/show-errors.directive';
import { DividerModule } from 'primeng/divider';
import { UsuarioRequest } from '../../../../../interfaces/seguridad/usuario.interface';
import { RegisterService } from '../../../../service/registro.service';

@Component({
  selector: 'app-usuario',
  imports: [InputTextModule, DividerModule, ShowErrorsDirective, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})
export class UsuarioComponent {
    public usuarioForm: FormGroup;
    get usuario(): UsuarioRequest{
        return this.usuarioForm.getRawValue() as UsuarioRequest;
    }
    constructor(@Inject(Router) public router: Router,
                @Inject(FormBuilder) public fb: FormBuilder,
                private registerService: RegisterService) {
        this.usuarioForm = this.fb.group({
            nombres: ['', [ Validators.required]],
            primerApellido: ['', [ Validators.required]],
            segundoApellido: [''],
            correo: ['', [Validators.required]],
            celularUno: ['', [Validators.required]],
            celularDos: [''],
            idDocumentoIdentidad: [null, [Validators.required]],
            numeroDocumento: ['', [Validators.required]],
            fechaNacimiento: ['', [Validators.required]],
            codigoDepartamentoNacimiento: ['', [Validators.required]],
            codigoProvinciaNacimiento: ['', [Validators.required]],
            codigoDistritoNacimiento: ['', [Validators.required]],
            codigoNacionalidad: ['', [Validators.required]],
            usuario: ['', [Validators.required]],
            contrasenia: ['', [Validators.required]]
        })
    }
    ngOnInit(): void {
        if(this.registerService.getUsuario()){
            this.usuarioForm.patchValue(this.registerService.getUsuario())
        }
    }
}
