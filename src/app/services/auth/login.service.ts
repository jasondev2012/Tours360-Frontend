import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginRequest } from '../../interfaces/auth/login.interface';
import { ICustomDataResponse } from '../../common/interfaces/custom-response.interface';
import { SessionResponse } from '../../common/services/sesion.service';

@Injectable({
    providedIn: 'root'
  })
export class LoginService {
    api: string = '';
    constructor(private http: HttpClient,
    ) {
        this.api = environment.api
    }

    getLogin(request: LoginRequest): Observable<ICustomDataResponse<SessionResponse>>{
        return this.http.post<ICustomDataResponse<SessionResponse>>(`${this.api}auth/authenticate`, request)
    }
}
