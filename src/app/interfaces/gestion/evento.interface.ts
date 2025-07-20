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
    urlRepositorio: string;
    aplicaDescuento: string;
    fechaFinDescuento: string;
    descuento: string;
    aplicaDescuentoGrupo: string;
    cantidadMinimaGrupo: string;
    fechaFinDescuentoGrupo: string;
    descuentoGrupo: string;
    fechaPublicacion: string;
    fechaInicio: string;
    fechaFin: string;
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
}