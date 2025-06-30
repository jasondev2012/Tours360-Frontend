import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ShowErrorsDirective } from '../../../../../common/directives/show-errors.directive';
import { EmpresaRequest } from '../../../../../interfaces/seguridad/empresa.interface';
import { RegisterService } from '../../../../service/registro.service';

@Component({
  selector: 'app-empresa',
  standalone: true,
  imports: [InputTextModule, ShowErrorsDirective, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './empresa.component.html',
  styleUrl: './empresa.component.scss'
})
export class EmpresaComponent implements OnInit {
    public empresaForm: FormGroup;

    get empresa():EmpresaRequest{
        return this.empresaForm.getRawValue() as EmpresaRequest
    }

    constructor(@Inject(Router) public router: Router,
                @Inject(FormBuilder) public fb: FormBuilder,
                private registerService: RegisterService) {
        this.empresaForm = this.fb.group({
            ruc: ['', [ Validators.required]],
            razonSocial: ['', [ Validators.required]],
            nombreComercial: ['', [ Validators.required]],
            tipoEmpresa: ['', [Validators.required]],
            representante: ['', [Validators.required]],
            dniRepresentante: ['', [Validators.required]],
            direccion: [''],
            telefono: ['', [Validators.required]],
            email: [''],
            paginaWeb: [''],
            logoUrl: [''],
            codigoDepartamento: ['', [Validators.required]],
            codigoProvincia: ['', [Validators.required]],
            codigoDistrito: ['', [Validators.required]]
        })
    }
    ngOnInit(): void {
        if(this.registerService.getEmpresa()){
            this.empresaForm.patchValue(this.registerService.getEmpresa())
        }
    }

}
