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
            nombreUrl: ['', [ Validators.required]],
            logoUrl: ['', [ Validators.required]]
        })
    }
    ngOnInit(): void {
        if(this.registerService.getAgencia()){
            this.agenciaForm.patchValue(this.registerService.getAgencia())
        }
    }
}
