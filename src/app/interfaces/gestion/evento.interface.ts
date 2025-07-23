import { IImagenModel } from "../common/imagen.interface";

export interface IEventoRequest {
    id: number;
    idDestino: number;
    titulo: string;
    subtitulo: string;
    descripcion: string;
    idCategoria: number;
    idNivelExigencia: number;
    precioBaseSoles: number;
    precioVentaSoles: number;
    precioBaseDolares: number;
    precioVentaDolares: number;
    codigoDepartamento: string;
    codigoProvincia: string;
    codigoDistrito: string;
    itinerario: string;
    terminosCondiciones: string;
    recomendaciones: string;
    incluye: string;
    noIncluye: string;
    observaciones: string;
    imagenesEvento: IImagenEventoLista[];

    
    urlGrupoWhatsapp: string;
    urlGrupoTelegram: string;
    urlGrupoFacebook: string;
    urlRepositorio: string;
    cantidadMinimaGrupo: number;
    fechaFinDescuento: Date;
    fechaFinDescuentoGrupo: Date;
    fechaPublicacion: string;
    fechaInicio: string;
    fechaFin: string;
    descuentoGrupo: string;
    descuento: string;
    aplicaDescuento: boolean;
    aplicaDescuentoGrupo: boolean;
}

export interface IEventoListResponse{
    id: number;
    titulo: string;
    precioVentaSoles: number;
    precioVentaDolares: number;
    eventosAbiertos: number;
    eventosCerrados: number;
    imagenReferencia: string;
    activo: boolean;
}

export interface IImagenEventoLista extends IImagenModel{
    esImagenDestino: boolean,
    rutaImagenDestino: string
}