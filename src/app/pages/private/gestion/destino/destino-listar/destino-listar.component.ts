import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { DestinoService } from '../../../../../services/gestion/destino.service';
import { IDestinoListResponse } from '../../../../../interfaces/gestion/destino.interface';
import { finalize } from 'rxjs';
import { CustomMessageService } from '../../../../../common/services/custom-message.service';
import { SkeletonModule } from 'primeng/skeleton';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const PRIME_NG = [TagModule, TableModule, IconFieldModule, InputIconModule, InputTextModule, ButtonModule, SkeletonModule]
@Component({
  selector: 'app-destino-listar',
  imports: [...PRIME_NG, CommonModule, FormsModule],
  templateUrl: './destino-listar.component.html',
  styleUrl: './destino-listar.component.scss'
})
export class DestinoListarComponent {
    globalFilter: string = '';
    destinos!: IDestinoListResponse[];
    statuses!: any[];
    loading: boolean = true;
    constructor(private router: Router,
                private route: ActivatedRoute,
                private destinoService: DestinoService,
                private messageService: CustomMessageService){
        this.listar()
    }
    getSeverity(status: string) {
        switch (status) {
            case 'unqualified':
                return 'danger';

            case 'qualified':
                return 'success';

            case 'new':
                return 'info';

            case 'negotiation':
                return 'warn';

            case 'renewal':
                return null;
        }
        return null;
    }
    onNuevoClick(){
      this.router.navigate(['../gestion/destinos/nuevo'], { relativeTo: this.route.parent });
    }
    listar(){
        this.loading = true;
        this.destinoService.listar()
        .pipe(finalize(() => this.loading = false))
        .subscribe({
            next: res => {
                if(res.success){
                    this.destinos = res.data;
                }else{
                    this.messageService.showError(res.message)
                }
            }
        })
    }
}
