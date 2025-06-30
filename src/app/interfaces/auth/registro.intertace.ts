import { AgenciaRequest } from "../seguridad/agencia.interface";
import { EmpresaRequest } from "../seguridad/empresa.interface";
import { UsuarioRequest } from "../seguridad/usuario.interface";

export interface RegistroRequest{
    usuario: UsuarioRequest,
    empresa: EmpresaRequest,
    agencia: AgenciaRequest
}