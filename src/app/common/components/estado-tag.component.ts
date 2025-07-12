import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-estado-tag',
  standalone: true,
  imports: [CommonModule, TagModule],
  template: `
    <p-tag [value]="estado ? 'activo' : 'eliminado'" [severity]="estado ? 'success' : 'danger'" />
  `
})
export class EstadoTagComponent {
  @Input() estado: boolean = true;
}
