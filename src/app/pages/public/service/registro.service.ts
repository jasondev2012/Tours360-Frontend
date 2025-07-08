import { Injectable } from '@angular/core';
import { AgenciaRequest } from '../../../interfaces/seguridad/agencia.interface';
import { EmpresaRequest } from '../../../interfaces/seguridad/empresa.interface';
import { UsuarioRequest } from '../../../interfaces/seguridad/usuario.interface';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {
    private empresa!: EmpresaRequest;
    private agencia!: AgenciaRequest;
    private usuario!: UsuarioRequest;

    getEmpresa() {
        return this.empresa;
    }
    
    getAgencia() {
        return this.agencia;
    }
    getUsuario() {
        return this.usuario;
    }

    setEmpresa(registro: EmpresaRequest) {
        this.empresa = registro;
    }

    setAgencia(registro: AgenciaRequest) {
        this.agencia = registro;
    }
    setUsuario(registro: UsuarioRequest) {
        this.usuario = registro;
    }

}
