import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ShowErrorsDirective } from '../../../../../common/directives/show-errors.directive';
import { EmpresaRequest } from '../../../../../interfaces/seguridad/empresa.interface';
import { RegisterService } from '../../../../service/registro.service';
import { ICatalogoGenerico } from '../../../../../interfaces/catalogo/catalogo.interface';
import { CatalogoService } from '../../../../../services/catalogo/catalogo.service';
import { TipoCatalogo } from '../../../../../common/enums/tipo_catalogo.enum';
import { SelectModule } from 'primeng/select';
import { InputMaskModule } from 'primeng/inputmask';

const PRIME_NG = [InputTextModule, SelectModule, InputMaskModule]
@Component({
  selector: 'app-empresa',
  standalone: true,
  imports: [...PRIME_NG, ShowErrorsDirective, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './empresa.component.html',
  styleUrl: './empresa.component.scss'
})
export class EmpresaComponent implements OnInit {
    public empresaForm: FormGroup;
    departamentos: ICatalogoGenerico[];
    provincias: ICatalogoGenerico[];
    distritos: ICatalogoGenerico[];

    get empresa():EmpresaRequest{
        return this.empresaForm.getRawValue() as EmpresaRequest
    }

    constructor(@Inject(Router) public router: Router,
                @Inject(FormBuilder) public fb: FormBuilder,
                private catalogoService: CatalogoService,
                private registerService: RegisterService) {
        this.empresaForm = this.fb.group({
            ruc: ['20535802972', [ Validators.required]],
            razonSocial: ['VIAJES PICAFLOR PERU TOUR OPERADOR S.A.C', [ Validators.required]],
            nombreComercial: ['Viajes Picaflor', [ Validators.required]],
            tipoEmpresa: ['Sociedad Anonima Cerrada', [Validators.required]],
            representante: ['SOCIOS', [Validators.required]],
            dniRepresentante: ['74390363', [Validators.required]],
            direccion: ['Cal. Elias Aguirre Nro. 141 Int. 512, Cercado de Miraflores, Miraflores, Lima, Perú'],
            telefono: ['(01)2254365', [Validators.required]],
            email: ['jason.gutierrez.dev@gmail.com'],
            paginaWeb: ['https://www.agencias.viajespicaflor.com/'],
            logoUrl: ['https://www.agencias.viajespicaflor.com/wp-content/uploads/2022/03/favicon-picaflor.png'],
            codigoDepartamento: ['', [Validators.required]],
            codigoProvincia: ['', [Validators.required]],
            codigoDistrito: ['', [Validators.required]]
        })
        this.departamentos = [];
        this.provincias = [];
        this.distritos = [];
    }
    ngOnInit(): void {
        this.obtenerCatalogosIniciales();
        let empresa = this.registerService.getEmpresa();
        if(empresa){
            this.empresaForm.patchValue(empresa)
            this.onDepartamentoChange({ value: empresa.codigoDepartamento });
            this.onProvinciaChange({ value: empresa.codigoProvincia });
        }
    }
    obtenerCatalogosIniciales() {
        this.catalogoService.listar(TipoCatalogo.DEPARTAMENTOS).subscribe({
            next: (res) => {
                if (res.success) {
                    this.departamentos = res.data;
                }
            }
        });
    }
    onDepartamentoChange(event: any) {        
        this.provincias = [];
        this.distritos = [];
        if (event && event.value) {
            this.catalogoService.listar(TipoCatalogo.PROVINCIAS, event.value).subscribe({
                next: (res) => {
                    if (res.success) {
                        this.provincias = res.data;
                    }
                }
            });
        }
    }
    onProvinciaChange(event: any) {
        if (event && event.value) {
            this.catalogoService.listar(TipoCatalogo.DISTRITOS, event.value).subscribe({
                next: (res) => {
                    if (res.success) {
                        this.distritos = res.data;
                    }
                }
            });
        } else {
            this.distritos = [];
        }
    }

}
