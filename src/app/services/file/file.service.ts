import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginRequest } from '../../interfaces/auth/login.interface';
import { ICustomDataResponse } from '../../common/interfaces/custom-response.interface';
import { SessionResponse } from '../../common/services/sesion.service';
import { ICatalogoGenerico } from '../../interfaces/catalogo/catalogo.interface';
import { IDestinoListResponse, IDestinoRequest, IImagenDestinoLista } from '../../interfaces/gestion/destino.interface';
import { IFilterRequest, IPaginatedResponse } from '../../interfaces/common/filter.interface';

@Injectable({
    providedIn: 'root'
  })
export class FileService {
    api: string = '';
    constructor(private http: HttpClient,
    ) {
        this.api = environment.api + 'file/'
    }

    registrar(codigo: string, data: string, files: File[]): Observable<ICustomDataResponse<number>>{
        const formData = new FormData();
        formData.append('codigo', codigo);
        formData.append('data', data);

        files.forEach((file, index) => {
            formData.append('files', file);
        });
        return this.http.post<ICustomDataResponse<number>>(`${this.api}registrar`, formData)
    }
    eliminar(codigo: string, id:number){
        return this.http.get<ICustomDataResponse<IImagenDestinoLista[]>>(`${this.api}eliminar?codigo=${codigo}&id=${id}`)
    }
}
