// loader.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable(); // Observable para el estado de carga

  // Método para mostrar el spinner
  show() {
    this.loadingSubject.next(true);
  }

  // Método para ocultar el spinner
  hide() {
    this.loadingSubject.next(false);
  }
}
