import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginRequest } from '../../interfaces/auth/login.interface';
import { ICustomDataResponse } from '../../common/interfaces/custom-response.interface';
import { SessionResponse } from '../../common/services/sesion.service';
import { ICatalogoGenerico } from '../../interfaces/catalogo/catalogo.interface';
import { IDestinoListResponse, IDestinoRequest } from '../../interfaces/gestion/destino.interface';

@Injectable({
    providedIn: 'root'
  })
export class DestinoService {
    api: string = '';
    constructor(private http: HttpClient,
    ) {
        this.api = environment.api + 'destino/'
    }

    registrar(request: IDestinoRequest): Observable<ICustomDataResponse<number>>{
        return this.http.post<ICustomDataResponse<number>>(`${this.api}registrar`, request)
    }
    listar(): Observable<ICustomDataResponse<IDestinoListResponse[]>>{
        return this.http.get<ICustomDataResponse<IDestinoListResponse[]>>(`${this.api}listar`)
    }
}
