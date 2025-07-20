import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
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
import { SelectChangeEvent, SelectModule } from 'primeng/select';
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
import { ForceValueRenderDirective } from '../../../../../common/directives/force-value-render.directive';
import { IEventoRequest } from '../../../../../interfaces/gestion/evento.interface';
import { EventoService } from '../../../../../services/gestion/evento.service';
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
    listaDestinos!: ICatalogoGenerico[];
    eventoForm: FormGroup;
    departamentos!: ICatalogoGenerico[];
    categoria!: ICatalogoGenerico[];
    nivelExigencia!: ICatalogoGenerico[];
    provincias!: ICatalogoGenerico[];
    distritos!: ICatalogoGenerico[];
    items: MenuItem[] | undefined;
    home: MenuItem | undefined;
    imageChangedEvent: any = '';
    croppedImage: string = '';
    imagenesEvento: IImagenDestinoLista[];
    id: number | null;
    pesoMaximo: number = 3145728; //3MB
    pesoMaximoActualizado: number = 3145728; //3MB
    permiteSubirImagen = true;
    pesoTotal: number = 0;
    indexTab: number = 0;
    obtenido: boolean = false;
    readonly: boolean = true;
    get evento(): IEventoRequest {
        return this.eventoForm.getRawValue() as IEventoRequest;
    }

    constructor(
        private messageService: CustomMessageService,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private catalogoService: CatalogoService,
        private eventoService: EventoService,
        private fileService: FileService,
        private confirmationService: ConfirmationService,
        private cdr: ChangeDetectorRef
    ) {
        this.id = Number(this.route.snapshot.paramMap.get('id')) || null;
        this.imagenesEvento = [];
        this.items = [{ label: this.id ? 'Editar' : 'Nuevo' }];
        this.home = {
            icon: 'pi pi-fw pi-ticket',
            label: 'Eventos',
            styleClass: 'text-bold',
            command: (event) => {
                this.onCancelarClick();
            }
        };

        this.eventoForm = this.fb.group({
            id: [this.id],
            idDestino: [null, [Validators.required]],
            titulo: [{ value: null, disabled: true }, [Validators.required]],
            subtitulo: [{ value: null, disabled: true }],
            descripcion: [{ value: null, disabled: true }, [Validators.required]],
            idCategoria: [{ value: null, disabled: true }, [Validators.required]],
            idNivelExigencia: [{ value: null, disabled: true }, [Validators.required]],
            codigoDepartamento: [{ value: null, disabled: true }, [Validators.required]],
            codigoProvincia: [{ value: null, disabled: true }, [Validators.required]],
            codigoDistrito: [{ value: null, disabled: true }, [Validators.required]],
            itinerario: [null, [Validators.required]],
            terminosCondiciones: [{ value: null, disabled: true }, [Validators.required]],
            recomendaciones: [{ value: null, disabled: true }],
            incluye: [{ value: null, disabled: true }, [Validators.required]],
            noIncluye: [{ value: null, disabled: true }, [Validators.required]],
            observaciones: [{ value: null, disabled: true }],
            precioBaseSoles: [{ value: null, disabled: true }, [Validators.required]],
            precioVentaSoles: [{ value: null, disabled: true }, [Validators.required]],
            precioBaseDolares: [{ value: null, disabled: true }],
            precioVentaDolares: [{ value: null, disabled: true }],
            urlGrupoWhatsapp: [null],
            urlGrupoTelegram: [null],
            urlGrupoFacebook: [null],
            urlRepositorio: [null],
            aplicaDescuento: [null],
            fechaFinDescuento: [null],
            descuento: [null],
            aplicaDescuentoGrupo: [null],
            cantidadMinimaGrupo: [null],
            fechaFinDescuentoGrupo: [null],
            descuentoGrupo: [null],
            fechaPublicacion: [null],
            fechaInicio: [null],
            fechaFin: [null]
        });

        if (this.id) {
            this.eventoService.obtener(this.id).subscribe({
                next: (res) => {
                    if (res.success) {
                        this.eventoForm.patchValue(res.data);
                        if (res.data && res.data.codigoDepartamento) {
                            this.onDepartamentoChange({ value: res.data.codigoDepartamento });
                            this.onProvinciaChange({ value: res.data.codigoProvincia || null });
                        }
                        this.imagenesEvento = res.data.imagenesEvento;
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
            niveles: this.catalogoService.listar(TipoCatalogo.NIVEL_EXIGENCIA),
            destinos: this.catalogoService.listar(TipoCatalogo.DESTINOS)
        }).subscribe({
            next: (res) => {
                this.departamentos = res.departamentos.data;
                this.categoria = res.categorias.data;
                this.nivelExigencia = res.niveles.data;
                this.listaDestinos = res.destinos.data;
            }
        });
    }
    onDestinoChange(event: SelectChangeEvent) {
        if (event && event.value) {
            let idPrevio = this.evento.id;
            this.eventoService.obtener(event.value).subscribe({
                next: (res) => {
                    if (res.success) {
                        this.eventoForm.patchValue(res.data);
                        this.eventoForm.get('id')?.setValue(idPrevio);
                        this.eventoForm.get('idDestino')?.setValue(event.value);
                        this.obtenido = true;
                        this.readonly = false;
                        if (res.data && res.data.codigoDepartamento) {
                            this.onDepartamentoChange({ value: res.data.codigoDepartamento });
                            this.onProvinciaChange({ value: res.data.codigoProvincia || null });
                        }
                        this.imagenesEvento = res.data.imagenesEvento;
                        this.actualizarPesoYEstado();
                        this.habilitarCampos();
                    } else {
                        this.messageService.showError(res.message);
                    }
                }
            });
        } else {
            this.readonly = true;
            this.obtenido = true;
            this.imagenesEvento = [];
            this.actualizarPesoYEstado();
            this.limpiarForm();
        }
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
                            this.imagenesEvento = res.data;
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
        if (!this.eventoForm.valid) {
            this.messageService.showWarn('Debe completar los datos obligatorios (*)');
        } else {
            console.table(this.evento)
            return;
            this.eventoService.registrar(this.evento).subscribe({
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
                            } else {
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
    onTabChange() {
        if (this.obtenido) {
            this.obtenido = false;
            this.cdr.detectChanges(); // fuerza una detección de cambios

            this.eventoForm.patchValue({
                itinerario: this.evento.itinerario,
                incluye: this.evento.incluye,
                noIncluye: this.evento.noIncluye,
                recomendaciones: this.evento.recomendaciones,
                terminosCondiciones: this.evento.terminosCondiciones,
                observaciones: this.evento.observaciones
            });
        }
    }
    habilitarCampos() {
        this.eventoForm.get('titulo')?.enable();
        this.eventoForm.get('subtitulo')?.enable();
        this.eventoForm.get('descripcion')?.enable();
        this.eventoForm.get('idCategoria')?.enable();
        this.eventoForm.get('idNivelExigencia')?.enable();
        this.eventoForm.get('codigoDepartamento')?.enable();
        this.eventoForm.get('codigoProvincia')?.enable();
        this.eventoForm.get('codigoDistrito')?.enable();
        this.eventoForm.get('itinerario')?.enable();
        this.eventoForm.get('terminosCondiciones')?.enable();
        this.eventoForm.get('recomendaciones')?.enable();
        this.eventoForm.get('incluye')?.enable();
        this.eventoForm.get('noIncluye')?.enable();
        this.eventoForm.get('observaciones')?.enable();
        this.eventoForm.get('precioBaseSoles')?.enable();
        this.eventoForm.get('precioVentaSoles')?.enable();
        this.eventoForm.get('precioBaseDolares')?.enable();
        this.eventoForm.get('precioVentaDolares')?.enable();
        this.eventoForm.updateValueAndValidity();
    }
    limpiarForm() {
        const campos: string[] = [
            'id',
            'titulo',
            'subtitulo',
            'descripcion',
            'idCategoria',
            'idNivelExigencia',
            'codigoDepartamento',
            'codigoProvincia',
            'codigoDistrito',
            'itinerario',
            'terminosCondiciones',
            'recomendaciones',
            'incluye',
            'noIncluye',
            'observaciones',
            'precioBaseSoles',
            'precioVentaSoles',
            'precioBaseDolares',
            'precioVentaDolares'
        ];

        campos.forEach((campo) => {
            const control = this.eventoForm.get(campo);
            if (control) {
                control.setValue(campo === 'id' ? this.id : null);
                control.disable();
            }
        });

        this.cdr.detectChanges();
    }

    actualizarPesoYEstado(): void {
        const pesoTemporales = this.imagenes.reduce((total, archivo) => total + (archivo.size || 0), 0);
        const pesoTotal = pesoTemporales + (this.imagenesEvento == null ? 0 : this.imagenesEvento.reduce((total, x) => total + (x.peso || 0), 0));
        this.pesoMaximoActualizado = Math.max(this.pesoMaximo - pesoTotal, 0);
        this.permiteSubirImagen = pesoTotal < this.pesoMaximo;
        this.pesoTotal = pesoTotal; // guardar si lo necesitas
    }
}
