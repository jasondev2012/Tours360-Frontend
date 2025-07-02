import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginRequest } from '../../interfaces/auth/login.interface';
import { ICustomDataResponse } from '../../common/interfaces/custom-response.interface';
import { SessionResponse } from '../../common/services/sesion.service';
import { ICatalogoGenerico } from '../../interfaces/catalogo/catalogo.interface';

@Injectable({
    providedIn: 'root'
  })
export class CatalogoService {
    api: string = '';
    constructor(private http: HttpClient,
    ) {
        this.api = environment.api
    }

    listar(catalogo: string, padre: string = "0"): Observable<ICustomDataResponse<ICatalogoGenerico[]>>{
        return this.http.get<ICustomDataResponse<ICatalogoGenerico[]>>(`${this.api}catalogo/listar?catalogo=${catalogo}&padre=${padre}`)
    }
}
