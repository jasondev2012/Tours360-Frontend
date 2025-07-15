import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true, // 👈 necesario en standalone
  name: 'size'
})
export class SizePipe implements PipeTransform {
  transform(value: number = 0, decimals: number = 2): string {
    if (!value) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(value) / Math.log(k));
    const size = parseFloat((value / Math.pow(k, i)).toFixed(decimals));

    return `${size} ${sizes[i]}`;
  }
}
