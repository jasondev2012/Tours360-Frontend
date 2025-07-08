import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ShowErrorsDirective } from '../../../../../common/directives/show-errors.directive';
import { AgenciaRequest } from '../../../../../interfaces/seguridad/agencia.interface';
import { RegisterService } from '../../../service/registro.service';

@Component({
  selector: 'app-agencia',
  standalone: true,
  imports: [InputTextModule, ShowErrorsDirective, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './agencia.component.html',
  styleUrl: './agencia.component.scss'
})
export class AgenciaComponent implements OnInit {
    public agenciaForm: FormGroup;
    previewUrl: string | null = null;
    get agencia():AgenciaRequest{
        return this.agenciaForm.getRawValue() as AgenciaRequest;
    }
    constructor(@Inject(Router) public router: Router,
                @Inject(FormBuilder) public fb: FormBuilder,
                private registerService: RegisterService) {
        this.agenciaForm = this.fb.group({
            nombreUrl: ['viajes-picaflor', [ Validators.required]],
            logo: ['', [ Validators.required]]
        })
    }
    ngOnInit(): void {
        let agencia = this.registerService.getAgencia()
        if(agencia){
            if(agencia.logo){
                const file = agencia.logo;
                const reader = new FileReader();
                reader.onload = () => {
                    this.previewUrl = reader.result as string;

                    // También puedes guardar el archivo en el form si quieres
                    this.agenciaForm.get('logo')?.setValue(file);
                };
                reader.readAsDataURL(file);
            }
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
    onLogoSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                this.previewUrl = reader.result as string;

                // También puedes guardar el archivo en el form si quieres
                this.agenciaForm.get('logo')?.setValue(file);
            };
            reader.readAsDataURL(file);
        }
    }
}
