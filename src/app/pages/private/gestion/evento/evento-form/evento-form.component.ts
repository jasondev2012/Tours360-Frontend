import { Component, ViewChild } from '@angular/core';
import { FileUpload, FileUploadModule, UploadEvent } from 'primeng/fileupload';
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
import { ConfirmationService, MenuItem } from 'primeng/api';
import { IImagenDestinoLista, IDestinoRequest } from '../../../../../interfaces/gestion/destino.interface';
import { forkJoin } from 'rxjs';
import { DestinoService } from '../../../../../services/gestion/destino.service';
import { TabsModule } from 'primeng/tabs';
import { FileService } from '../../../../../services/file/file.service';
import { TipoArchivo } from '../../../../../common/enums/files.enum';
import { ImageModule } from 'primeng/image';
import { PanelModule } from 'primeng/panel';
import { SizePipe } from '../../../../../common/pipe/size.pipe';
const PRIME_NG = [PanelModule, ImageModule, BreadcrumbModule, ButtonModule, InputTextModule, FileUploadModule, TextareaModule, EditorModule, InputNumber, DividerModule, SelectModule, TabsModule];

@Component({
    selector: 'app-evento-form',
    imports: [...PRIME_NG, ShowErrorsDirective, CommonModule, FormsModule, ReactiveFormsModule, SizePipe],
    templateUrl: './evento-form.component.html',
    styleUrl: './evento-form.component.scss'
})
export class EventoFormComponent {
    @ViewChild('uploader') uploader!: FileUpload;
    imagenes: File[] = [];
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
    imagenesDestino: IImagenDestinoLista[];
    id: number | null;
    pesoMaximo: number = 3145728; //3MB
    pesoMaximoActualizado: number = 3145728; //3MB
    permiteSubirImagen = true;
    pesoTotal: number = 0;
    get destino(): IDestinoRequest {
        return this.destinoForm.getRawValue() as IDestinoRequest;
    }

    constructor(
        private messageService: CustomMessageService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private catalogoService: CatalogoService,
        private destinoService: DestinoService,
        private fileService: FileService,
        private confirmationService: ConfirmationService
    ) {
        this.id = Number(this.route.snapshot.paramMap.get('id')) || null;
        this.imagenesDestino = [];
        this.items = [{ label: this.id ? 'Editar' : 'Nuevo' }];
        this.home = {
            icon: 'pi pi-fw pi-ticket',
            label: 'Eventos',
            styleClass: 'text-bold',
            command: (event) => {
                this.onCancelarClick();
            }
        };

        this.destinoForm = this.fb.group({
            id: [this.id],
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
            codigoDistrito: [null, [Validators.required]],
            itinerario: [''],
            terminosCondiciones: [''],
            recomendaciones: [''],
            incluye: [''],
            noIncluye: [''],
            observaciones: ['']
        });

        if (this.id) {
            this.destinoService.obtener(this.id).subscribe({
                next: (res) => {
                    if (res.success) {
                        this.destinoForm.patchValue(res.data);
                        if (res.data && res.data.codigoDepartamento) {
                            this.onDepartamentoChange({ value: res.data.codigoDepartamento });
                            this.onProvinciaChange({ value: res.data.codigoProvincia || null });
                        }
                        this.imagenesDestino = res.data.imagenesDestino;
                        this.actualizarPesoYEstado();
                    } else {
                        this.messageService.showError(res.message);
                    }
                }
            });
        }

        this.cargarCatalogos();
    }
    cargarCatalogos() {
        forkJoin({
            departamentos: this.catalogoService.listar(TipoCatalogo.DEPARTAMENTOS),
            categorias: this.catalogoService.listar(TipoCatalogo.CATEGORIA_DESTINO),
            niveles: this.catalogoService.listar(TipoCatalogo.NIVEL_EXIGENCIA)
        }).subscribe({
            next: (res) => {
                this.departamentos = res.departamentos.data;
                this.categoria = res.categorias.data;
                this.nivelExigencia = res.niveles.data;
            }
        });
    }

    onFileSelect(event: any): void {
        const archivos: File[] = Array.from(event.originalEvent.target.files);
        const archivosValidos: File[] = [];

        for (let file of archivos) {
            if (this.pesoMaximoActualizado >= file.size && file.type.startsWith('image/')) {
                archivosValidos.push(file);
                this.imagenes.push(file);
                this.pesoMaximoActualizado -= file.size;
            }
        }
        this.uploader.clear();
        this.uploader.files.push(...archivosValidos);

        this.actualizarPesoYEstado();
    }
    onBeforeUpload(event: any) {
        event.xhr.abort();
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
    onEliminarImagenClick(id: number, event: any) {
        this.confirmationService.confirm({
            target: event.currentTarget as EventTarget,
            message: '¿Seguro de eliminar la imagen?',
            icon: 'pi pi-info-circle',
            rejectButtonProps: {
                label: 'Cancelar',
                severity: 'secondary',
                outlined: true
            },
            acceptButtonProps: {
                label: 'Eliminar',
                severity: 'danger'
            },
            accept: () => {
                this.fileService.eliminar(TipoArchivo.IMAGEN_DESTINO, id).subscribe({
                    next: (res) => {
                        if (res.success) {
                            this.imagenesDestino = res.data;
                            this.messageService.showSuccess(res.message);
                            this.actualizarPesoYEstado();
                        } else {
                            this.messageService.showError(res.message);
                        }
                    }
                });
            }
        });
    }
    onCancelarClick() {
        this.router.navigate(['../gestion/eventos'], { relativeTo: this.route.parent });
    }
    onGuardarClick() {
        if (!this.destinoForm.valid) {
            this.messageService.showWarn('Debe completar los datos obligatorios (*)');
        } else {
            this.destinoService.registrar(this.destino).subscribe({
                next: (res) => {
                    if (res.success) {
                        if (this.pesoMaximo == this.pesoMaximoActualizado) {
                            this.messageService.showSuccess(res.message);
                            this.messageService.showInfo('Recuerda que tus destinos deben tener imágenes para que puedas destacar del resto.');
                            this.router.navigate(['../gestion/destinos'], { relativeTo: this.route.parent });
                        } else {
                            if (this.imagenes && this.imagenes.length > 0) {
                                this.fileService.registrar(TipoArchivo.IMAGEN_DESTINO, res.data, this.imagenes).subscribe({
                                    next: (resImg) => {
                                        if (!resImg.success) {
                                            this.messageService.showInfo(resImg.message);
                                        }
                                        this.messageService.showSuccess(res.message);
                                        this.router.navigate(['../gestion/destinos'], { relativeTo: this.route.parent });
                                    }
                                });
                            }else{
                                this.messageService.showSuccess(res.message);
                                this.router.navigate(['../gestion/destinos'], { relativeTo: this.route.parent });
                            }
                        }
                    } else {
                        this.messageService.showError(res.message);
                    }
                }
            });
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
    onFileRemove(event: any): void {
        const fileToRemove: File = event.file;
        this.imagenes = this.imagenes.filter((file) => file !== fileToRemove);
        this.actualizarPesoYEstado();
    }
    actualizarPesoYEstado(): void {
        const pesoTemporales = this.imagenes.reduce((total, archivo) => total + (archivo.size || 0), 0);
        const pesoTotal = pesoTemporales + (this.imagenesDestino == null ? 0 : this.imagenesDestino.reduce((total, x) => total + (x.peso || 0), 0));
        this.pesoMaximoActualizado = Math.max(this.pesoMaximo - pesoTotal, 0);
        this.permiteSubirImagen = pesoTotal < this.pesoMaximo;
        this.pesoTotal = pesoTotal; // guardar si lo necesitas
    }
}
