import { Component } from '@angular/core';
import { FileUploadModule, UploadEvent } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { CustomMessageService } from '../../../../../common/services/custom-message.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShowErrorsDirective } from '../../../../../common/directives/show-errors.directive';
import { TextareaModule } from 'primeng/textarea';
import { EditorModule } from 'primeng/editor';
import { InputNumber } from 'primeng/inputnumber';
import { DividerModule } from 'primeng/divider';
import { SelectModule } from 'primeng/select';
import { TipoCatalogo } from '../../../../../common/enums/tipo_catalogo.enum';
import { ICatalogoGenerico } from '../../../../../interfaces/catalogo/catalogo.interface';
import { CatalogoService } from '../../../../../services/catalogo/catalogo.service';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { IDestinoRequest } from '../../../../../interfaces/gestion/destino.interface';
import { forkJoin } from 'rxjs';
import { DestinoService } from '../../../../../services/gestion/destino.service';

const PRIME_NG = [BreadcrumbModule, ButtonModule, InputTextModule, FileUploadModule, TextareaModule, EditorModule, InputNumber, DividerModule, SelectModule];

@Component({
    selector: 'app-destino-form',
    imports: [...PRIME_NG, ShowErrorsDirective, CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './destino-form.component.html',
    styleUrl: './destino-form.component.scss'
})
export class DestinoFormComponent {
    uploadedFiles: any[] = [];
    destinoForm: FormGroup;
    departamentos!: ICatalogoGenerico[];
    categoria!: ICatalogoGenerico[];
    nivelExigencia!: ICatalogoGenerico[];
    provincias!: ICatalogoGenerico[];
    distritos!: ICatalogoGenerico[];
    items: MenuItem[] | undefined;
    home: MenuItem | undefined;
    imageChangedEvent: any = '';
    croppedImage: string = '';
    get destino(): IDestinoRequest {
      return this.destinoForm.getRawValue() as IDestinoRequest
    }
    constructor(
        private messageService: CustomMessageService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private catalogoService: CatalogoService,
        private destinoService: DestinoService
    ) {
        this.items = [{ label: 'Nuevo' }];
        this.home = {
            icon: 'pi pi-fw pi-sparkles',
            label: 'Destinos',
            styleClass: 'text-bold',
            command: (event) => {
                this.onCancelarClick();
            }
        };

        this.destinoForm = this.fb.group({
            id: [null],
            titulo: ['', [Validators.required]],
            subtitulo: [''],
            descripcion: ['', [Validators.required]],
            idCategoria: [null, [Validators.required]],
            idNivelExigencia: [null, [Validators.required]],
            precioBaseSoles: [null, [Validators.required]],
            precioVentaSoles: [null, [Validators.required]],
            precioBaseDolares: [null],
            precioVentaDolares: [null],
            codigoDepartamento: [null, [Validators.required]],
            codigoProvincia: [null, [Validators.required]],
            codigoDistrito: [null, [Validators.required]]
        });
        this.cargarCatalogos();
    }
    cargarCatalogos(){
        forkJoin({
          departamentos: this.catalogoService.listar(TipoCatalogo.DEPARTAMENTOS),
          categorias: this.catalogoService.listar(TipoCatalogo.CATEGORIA_DESTINO),
          niveles: this.catalogoService.listar(TipoCatalogo.NIVEL_EXIGENCIA),
        }).subscribe({
          next: res => {
              this.departamentos = res.departamentos.data;
              this.categoria = res.categorias.data;
              this.nivelExigencia = res.niveles.data;
          }
        })
    }

    onFileSelect(event: any) {
        console.log('Archivos seleccionados:', event.files);
    }
    onUpload(event: UploadEvent) {
        console.log(event);
        // for(let file of event.files) {
        //     this.uploadedFiles.push(file);
        // }
        this.messageService.showWarn('File Uploaded');
    }
    onDepartamentoChange(event: any) {
        this.provincias = [];
        this.distritos = [];
        if (event && event.value) {
            this.catalogoService.authListar(TipoCatalogo.PROVINCIAS, event.value).subscribe({
                next: (res) => {
                    if (res.success) {
                        this.provincias = res.data;
                    }
                }
            });
        }
    }
    onCancelarClick() {
        this.router.navigate(['../gestion/destinos'], { relativeTo: this.route.parent });
    }
    onGuardarClick() {
      if(!this.destinoForm.valid){
        this.messageService.showWarn("Debe completar los datos obligatorios (*)")
      }else{
        this.destinoService.registrar(this.destino).subscribe({
          next: res => {
            if(res.success){
              this.messageService.showSuccess(res.message)
              this.router.navigate(['../gestion/destinos'], { relativeTo: this.route.parent });
            }else{
              this.messageService.showError(res.message)
            }
          }
        })
      }
      
    }
    onProvinciaChange(event: any) {
        if (event && event.value) {
            this.catalogoService.authListar(TipoCatalogo.DISTRITOS, event.value).subscribe({
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
    // fileChangeEvent(event: any): void {
    //     this.imageChangedEvent = event;
    // }

    // imageCropped(event: ImageCroppedEvent) {
    //     this.croppedImage = event.base64!;
    // }
}
