import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginRequest } from '../../interfaces/auth/login.interface';
import { ICustomDataResponse } from '../../common/interfaces/custom-response.interface';
import { SessionResponse } from '../../common/services/sesion.service';
import { ICatalogoGenerico } from '../../interfaces/catalogo/catalogo.interface';
import { IDestinoListResponse, IDestinoRequest } from '../../interfaces/gestion/destino.interface';
import { IFilterRequest, IPaginatedResponse } from '../../interfaces/common/filter.interface';
import { IEventoRequest } from '../../interfaces/gestion/evento.interface';

@Injectable({
    providedIn: 'root'
  })
export class EventoService {
    api: string = '';
    constructor(private http: HttpClient,
    ) {
        this.api = environment.api + 'evento/'
    }

    obtener(id: number): Observable<ICustomDataResponse<IEventoRequest>>{
        return this.http.get<ICustomDataResponse<IEventoRequest>>(`${this.api}obtener/${id}`)
    }
    eliminar(id: number): Observable<ICustomDataResponse<string>>{
        return this.http.get<ICustomDataResponse<string>>(`${this.api}eliminar/${id}`)
    }
    activar(id: number): Observable<ICustomDataResponse<string>>{
        return this.http.get<ICustomDataResponse<string>>(`${this.api}activar/${id}`)
    }
    registrar(request: IEventoRequest): Observable<ICustomDataResponse<number>>{
        return this.http.post<ICustomDataResponse<number>>(`${this.api}registrar`, request)
    }
    listarPaginado(filter: IFilterRequest): Observable<ICustomDataResponse<IPaginatedResponse<IDestinoListResponse>>>{
        return this.http.get<ICustomDataResponse<IPaginatedResponse<IDestinoListResponse>>>(`${this.api}listar-paginado?pageIndex=${filter.pageIndex}&pageSize=${filter.pageSize}&filtro=${filter.filtro}&order=${filter.order}&orderDirection=${filter.orderDirection}`)
    }
}
