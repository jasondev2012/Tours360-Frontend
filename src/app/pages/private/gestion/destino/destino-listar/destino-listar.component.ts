import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Table, TableLazyLoadEvent, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { DestinoService } from '../../../../../services/gestion/destino.service';
import { IDestinoListResponse } from '../../../../../interfaces/gestion/destino.interface';
import { finalize } from 'rxjs';
import { CustomMessageService } from '../../../../../common/services/custom-message.service';
import { SkeletonModule } from 'primeng/skeleton';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IFilterRequest } from '../../../../../interfaces/common/filter.interface';
import { EstadoTagComponent } from '../../../../../common/components/estado-tag.component';
import { ConfirmationService } from 'primeng/api';

const PRIME_NG = [TagModule, TableModule, IconFieldModule, InputIconModule, InputTextModule, ButtonModule, SkeletonModule];
@Component({
    selector: 'app-destino-listar',
    imports: [...PRIME_NG, CommonModule, FormsModule, EstadoTagComponent],
    templateUrl: './destino-listar.component.html',
    styleUrl: './destino-listar.component.scss'
})
export class DestinoListarComponent {
    globalFilter: string = '';
    destinos!: IDestinoListResponse[];
    statuses!: any[];
    loading: boolean = true;
    filter: IFilterRequest;
    totalRegistros: number = 0;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private destinoService: DestinoService,
        private messageService: CustomMessageService,
        private confirmationService: ConfirmationService,
    ) {
        this.filter = { pageIndex: 0, pageSize: 10, filtro: '' };
    }
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
    onNuevoClick() {
        this.router.navigate(['../gestion/destinos/nuevo'], { relativeTo: this.route.parent });
    }
    onEditarClick(id: number){
        this.router.navigate(['../gestion/destinos/editar/' + id], { relativeTo: this.route.parent });
    }
    listar(event: TableLazyLoadEvent) {
        if(event && event.first){
            this.filter.pageIndex = (event.first || 0 / this.filter.pageSize)
            this.filter.pageSize= event.rows || 10
            this.filter.filtro = event.globalFilter?.toString() || ''
            this.filter.order = event.sortField?.toString() || ''
            this.filter.orderDirection = event.sortOrder?.toString() || ''
        }else{
            this.filter = { pageIndex: 0, pageSize: 10, filtro: '' };
        }
        this.loading = true;
        this.destinoService
            .listarPaginado(this.filter)
            .pipe(finalize(() => (this.loading = false)))
            .subscribe({
                next: (res) => {
                    if (res.success) {
                        this.destinos = res.data.items;
                        this.totalRegistros = res.data.total;
                    } else {
                        this.messageService.showError(res.message);
                    }
                }
            });
    }
    onEliminarClick(id: number, event: any) {
        event.stopPropagation(); 
        event.preventDefault();
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Al eliminar el destino ya no podrá seguir creando eventos asociados a este, ¿desea continuar?',
            header: 'Confirmación',
            closable: true,
            closeOnEscape: true,
            icon: 'pi pi-exclamation-triangle',
            rejectButtonProps: {
                label: 'Cancelar',
                severity: 'secondary',
                outlined: true,
            },
            acceptButtonProps: {
                label: 'Eliminar',
                severity: 'danger',
                outlined: false,
            },
            accept: () => {
                this.destinoService.eliminar(id).subscribe({
                    next: res => {
                        if(res.success){
                            this.messageService.showSuccess(res.message);
                            this.listar({})
                        }else{
                            this.messageService.showError(res.message)
                        }
                    }
                })
            },
        });
    }
    onActivarClick(id: number){
        this.destinoService.activar(id).subscribe({
            next: res => {
                if(res.success){
                    this.messageService.showSuccess(res.message);
                    this.listar({})
                }else{
                    this.messageService.showError(res.message)
                }
            }
        })
    }
}
