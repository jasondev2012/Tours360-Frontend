import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ShowErrorsDirective } from '../../../../../common/directives/show-errors.directive';
import { AgenciaRequest } from '../../../../../interfaces/seguridad/agencia.interface';
import { RegisterService } from '../../../../service/registro.service';

@Component({
  selector: 'app-agencia',
  standalone: true,
  imports: [InputTextModule, ShowErrorsDirective, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './agencia.component.html',
  styleUrl: './agencia.component.scss'
})
export class AgenciaComponent implements OnInit {
    public agenciaForm: FormGroup;
    get agencia():AgenciaRequest{
        return this.agenciaForm.getRawValue() as AgenciaRequest;
    }
    constructor(@Inject(Router) public router: Router,
                @Inject(FormBuilder) public fb: FormBuilder,
                private registerService: RegisterService) {
        this.agenciaForm = this.fb.group({
            nombreUrl: ['viajes-picaflor', [ Validators.required]],
            logoUrl: ['https://www.agencias.viajespicaflor.com/wp-content/uploads/2022/03/favicon-picaflor.png', [ Validators.required]]
        })
    }
    ngOnInit(): void {
        if(this.registerService.getAgencia()){
            this.agenciaForm.patchValue(this.registerService.getAgencia())
        }
    }
    sanitizarNombreUrl(): void {
        const control = this.agenciaForm.get('nombreUrl');
        if (!control) return;

        const valorOriginal = control.value || '';
        const valorSanitizado = valorOriginal.replace(/[^a-zA-Z0-9]/g, '-');

        if (valorOriginal !== valorSanitizado) {
            control.setValue(valorSanitizado, { emitEvent: false });
        }
    }
}
