import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IConsultaRucResponse } from '../interfaces/consulta-ruc.interface';
import { ICustomDataResponse } from '../interfaces/custom-response.interface';

@Injectable({
    providedIn: 'root'
  })
export class ConsultaRucService {
    api: string = ''
    constructor(private http: HttpClient,
    ) {
        this.api = environment.api
    }
    busquedaRuc(ruc: string): Observable<ICustomDataResponse<IConsultaRucResponse>> {
        return this.http.post<ICustomDataResponse<IConsultaRucResponse>>(
            `${this.api}auth/info-sunat`, {ruc}
        );
    }
}
