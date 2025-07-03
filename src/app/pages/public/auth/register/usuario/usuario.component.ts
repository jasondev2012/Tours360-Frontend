import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ShowErrorsDirective } from '../../../../../common/directives/show-errors.directive';
import { DividerModule } from 'primeng/divider';
import { UsuarioRequest } from '../../../../../interfaces/seguridad/usuario.interface';
import { RegisterService } from '../../../../service/registro.service';
import { CatalogoService } from '../../../../../services/catalogo/catalogo.service';
import { ICatalogoGenerico } from '../../../../../interfaces/catalogo/catalogo.interface';
import { TipoCatalogo } from '../../../../../common/enums/tipo_catalogo.enum';
import { SelectModule } from 'primeng/select';
import { PaisEnum } from '../../../../../common/enums/pais.enum';
import { PasswordModule } from 'primeng/password';
import { DatePickerModule } from 'primeng/datepicker';
import { DocumentoIdentidadEnum } from '../../../../../common/enums/documento_identidad.enum';
import { InputMaskModule } from 'primeng/inputmask';
import { CustomValidators } from '../../../../../common/validators/custom-validators';

const PRIME_NG = [InputTextModule, InputMaskModule, SelectModule, PasswordModule, DatePickerModule]
@Component({
  selector: 'app-usuario',
  imports: [...PRIME_NG, InputTextModule, DividerModule, ShowErrorsDirective, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})
export class UsuarioComponent {
    public usuarioForm: FormGroup;
    paises: ICatalogoGenerico[];
    documentosIdentidad: ICatalogoGenerico[];
    departamentos: ICatalogoGenerico[];
    provincias: ICatalogoGenerico[];
    distritos: ICatalogoGenerico[];
    maskDocIdentidad: string;
    placeholderDocIdentidad: string;
    get usuario(): UsuarioRequest{
        return this.usuarioForm.getRawValue() as UsuarioRequest;
    }
    constructor(@Inject(Router) public router: Router,
                @Inject(FormBuilder) public fb: FormBuilder,
                private catalogoService: CatalogoService,
                private registerService: RegisterService) {
        this.maskDocIdentidad = "";
        this.placeholderDocIdentidad = "";
        this.documentosIdentidad = [];
        this.departamentos = [];
        this.provincias = [];
        this.distritos = [];
        this.paises = [];
        this.usuarioForm = this.fb.group({
            nombres: ['JASON JOSEPH', [ Validators.required]],
            primerApellido: ['GUTIERREZ', [ Validators.required]],
            segundoApellido: ['CUADROS'],
            correo: ['jason.gutierrez.dev@gmail.com', [Validators.required, Validators.email]],
            celularUno: ['922111007', [Validators.required]],
            celularDos: ['919707333'],
            idDocumentoIdentidad: [1, [Validators.required]],
            numeroDocumento: ['74390363', [Validators.required]],
            fechaNacimiento: [new Date(1995,10,30), [Validators.required]],
            codigoDepartamentoNacimiento: [{ value: null, disabled: true }],
            codigoProvinciaNacimiento: [{ value: null, disabled: true }],
            codigoDistritoNacimiento: [{ value: null, disabled: true }],
            codigoNacionalidad: ['', [Validators.required]],
            usuario: ['jason.gutierrez.dev@gmail.com', [Validators.required, Validators.email]],
            contrasenia: ['123456', [Validators.required]]
        })
    }
    ngOnInit(): void {
        this.obtenerCatalogosIniciales()
        let usuario = this.registerService.getUsuario();
        if(usuario){
            this.usuarioForm.patchValue(usuario)
            this.onDepartamentoChange({ value: usuario.codigoDepartamentoNacimiento });
            this.onProvinciaChange({ value: usuario.codigoProvinciaNacimiento });
        }
        
    }
    onDocumentoIdentidadChange(event: any){
        if(event){
            let documentoSeleccionado = this.documentosIdentidad.find(x => x.id == event.value)
            console.log(this.documentosIdentidad)
            console.log(documentoSeleccionado)
            if(documentoSeleccionado?.codigo == DocumentoIdentidadEnum.DNI){
                this.usuarioForm.get('numeroDocumento')?.setValidators([Validators.required, Validators.maxLength(8), CustomValidators.dni()]);
                this.usuarioForm.get('numeroDocumento')?.updateValueAndValidity();
            } else if(documentoSeleccionado?.codigo == DocumentoIdentidadEnum.CARNET_EXTRANJERIA){
                this.usuarioForm.get('numeroDocumento')?.setValidators([Validators.required, Validators.maxLength(12), CustomValidators.carnetExtranjeria()]);
                this.usuarioForm.get('numeroDocumento')?.updateValueAndValidity();
            } else if(documentoSeleccionado?.codigo == DocumentoIdentidadEnum.RUC){
                this.usuarioForm.get('numeroDocumento')?.setValidators([Validators.required, Validators.maxLength(11), CustomValidators.ruc()]);
                this.usuarioForm.get('numeroDocumento')?.updateValueAndValidity();
            } else if(documentoSeleccionado?.codigo == DocumentoIdentidadEnum.PASAPORTE){
                this.usuarioForm.get('numeroDocumento')?.setValidators([Validators.required, Validators.maxLength(12), CustomValidators.pasaporte()]);
                this.usuarioForm.get('numeroDocumento')?.updateValueAndValidity();
            } else if(documentoSeleccionado?.codigo == DocumentoIdentidadEnum.PARTIDA_NACIMIENTO){
                this.usuarioForm.get('numeroDocumento')?.setValidators([Validators.required, Validators.maxLength(15), CustomValidators.partidaNacimiento()]);
                this.usuarioForm.get('numeroDocumento')?.updateValueAndValidity();
            } else if(documentoSeleccionado?.codigo == DocumentoIdentidadEnum.OTRO){
                this.usuarioForm.get('numeroDocumento')?.setValidators([Validators.required, Validators.maxLength(15), CustomValidators.otroDocumentoIdentidad()]);
                this.usuarioForm.get('numeroDocumento')?.updateValueAndValidity();
            }
        }else{
            this.usuarioForm.get('numeroDocumento')?.clearValidators();
            this.usuarioForm.get('numeroDocumento')?.updateValueAndValidity();
            this.usuarioForm.get('numeroDocumento')?.disable();
        }
        
        
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
    onPaisChange(event: any){
        if(event.value == PaisEnum.PERU){
            this.habilitarUbigeo('codigoDepartamentoNacimiento')
            this.habilitarUbigeo('codigoProvinciaNacimiento')
            this.habilitarUbigeo('codigoDistritoNacimiento')
        }else{
            this.limpiarUbigeo('codigoDepartamentoNacimiento');
            this.limpiarUbigeo('codigoProvinciaNacimiento');
            this.limpiarUbigeo('codigoDistritoNacimiento');
        }
    }
    limpiarUbigeo(componente: string){
        this.usuarioForm.get(componente)?.setValue(null)
        this.usuarioForm.get(componente)?.removeValidators(Validators.required)
        this.usuarioForm.get(componente)?.disable()
        this.usuarioForm.get(componente)?.updateValueAndValidity()
    }
    habilitarUbigeo(componente: string){
        this.usuarioForm.get(componente)?.addValidators(Validators.required)
        this.usuarioForm.get(componente)?.enable()
        this.usuarioForm.get(componente)?.updateValueAndValidity()
    }
    obtenerCatalogosIniciales() {
        this.catalogoService.listar(TipoCatalogo.PAIS).subscribe({
            next: (res) => {
                if (res.success) {
                    this.paises = res.data;
                }
            }
        });
        this.catalogoService.listar(TipoCatalogo.DOCUMENTOS_IDENTIDAD).subscribe({
            next: (res) => {
                if (res.success) {
                    this.documentosIdentidad = res.data;
                }
            }
        });
        this.catalogoService.listar(TipoCatalogo.DEPARTAMENTOS).subscribe({
            next: (res) => {
                if (res.success) {
                    this.departamentos = res.data;
                }
            }
        });
    }
}
