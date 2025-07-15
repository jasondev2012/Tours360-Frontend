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
    itinerario: string;
    terminosCondiciones: string;
    recomendaciones: string;
    incluye: string;
    noIncluye: string;
    observaciones: string;
    imagenesDestino: IImagenDestinoLista[];
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

export interface IImagenDestinoLista{
    id: number;
    nombre: string;
    url: string;
    peso: number;
    id_destino: number;
}