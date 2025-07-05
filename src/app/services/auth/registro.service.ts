import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginRequest } from '../../interfaces/auth/login.interface';
import { ICustomDataResponse } from '../../common/interfaces/custom-response.interface';
import { SessionResponse } from '../../common/services/sesion.service';
import { RegistroRequest } from '../../interfaces/auth/registro.intertace';

@Injectable({
    providedIn: 'root'
  })
export class RegistroService {
    api: string = '';
    constructor(private http: HttpClient,
    ) {
        this.api = environment.api
    }

    guardar(request: RegistroRequest): Observable<ICustomDataResponse<string>>{
        
        return this.http.post<ICustomDataResponse<string>>(`${this.api}auth/registro`, request)
    }
    
    guardarLogo(formData: FormData): Observable<ICustomDataResponse<string>> {
        return this.http.post<ICustomDataResponse<string>>(`${this.api}auth/registro-logo`, formData);
    }

}
