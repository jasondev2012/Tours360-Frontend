export interface UsuarioRequest{
    nombres: string;
    primerApellido: string;
    segundoApellido: string;
    correo: string;
    celularUno: string;
    celularDos: string;
    idDocumentoIdentidad: number;
    numeroDocumento: string;
    fechaNacimiento: Date;
    codigoDepartamentoNacimiento: string;
    codigoProvinciaNacimiento: string;
    codigoDistritoNacimiento: string;
    codigoNacionalidad: string;
    usuario: string;
    contrasenia: string;
}