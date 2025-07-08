export interface IDestinoRequest {
    id: number;
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
}

export interface IDestinoListResponse{
    id: number;
    titulo: string;
    precioVentaSoles: number;
    precioVentaDolares: number;
    eventosAbiertos: number;
    eventosCerrados: number;
    imagenReferencia: string;
    activo: boolean;
}