import { Component, OnInit, signal } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { Tag } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { SelectButton } from 'primeng/selectbutton';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product, ProductService } from '../../../../public/service/product.service';
import { SelectItem } from 'primeng/api';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CatalogoService } from '../../../../../services/catalogo/catalogo.service';
import { TipoCatalogo } from '../../../../../common/enums/tipo_catalogo.enum';
import { ICatalogoGenerico } from '../../../../../interfaces/catalogo/catalogo.interface';
import { ActivatedRoute, Router } from '@angular/router';

const PRIME_NG = [FloatLabelModule, DatePickerModule, InputTextModule, DataViewModule, Tag, ButtonModule, SelectButton, CommonModule, FormsModule, SelectModule]
@Component({
  selector: 'app-evento-listar',
  imports: [...PRIME_NG],
  templateUrl: './evento-listar.component.html',
  styleUrl: './evento-listar.component.scss'
})
export class EventoListarComponent implements OnInit {
    listaDestinos!: ICatalogoGenerico[]

    sortOptions!: SelectItem[];
    sortKey!: string;

    sortOrder!: number;

    sortField!: string;
    layout: 'list' | 'grid' = 'grid';
    products = signal<any>([]);
    options = ['list', 'grid'];

    constructor(private productService: ProductService,
                private catalogoService: CatalogoService,
                private router: Router,
                private route: ActivatedRoute,){
        
    }
    ngOnInit(): void {
    this.catalogoService.listar(TipoCatalogo.DESTINOS).subscribe({
        next: res => {
            this.listaDestinos = res.data;
        }
    })
      this.productService.getProducts().then((data) => {
            this.products.set([...data.slice(0,12)]);
        });
      this.sortOptions = [
          { label: 'Price High to Low', value: '!price' },
          { label: 'Price Low to High', value: 'price' },
      ];
    }
    onNuevoClick() {
        this.router.navigate(['../gestion/eventos/nuevo'], { relativeTo: this.route.parent });
    }
    onSortChange(event: any) {
        let value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        } else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }
    getSeverity(product: Product) {
        switch (product.inventoryStatus) {
            case 'APERTURADO':
                return 'success';

            case 'PRÓXIMO A VENCER':
                return 'warn';

            case 'VENCIDO':
                return 'danger';

            default:
                return null;
        }
    }
}
