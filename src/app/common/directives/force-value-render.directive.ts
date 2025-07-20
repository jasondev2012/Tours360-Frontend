import { Directive, Input, AfterViewInit, ElementRef, NgZone } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Directive({
  selector: '[appForceValueRender]'
})
export class ForceValueRenderDirective implements AfterViewInit {
  @Input('appForceValueRender') formControl!: AbstractControl | null;
  @Input() forceValue: any;

  constructor(private el: ElementRef, private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    // Ejecutamos fuera del ciclo Angular para evitar ExpressionChangedAfterItHasBeenCheckedError
    this.ngZone.runOutsideAngular(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Aplicar el valor al control cuando el elemento es visible
            this.ngZone.run(() => {
              if (this.formControl && this.forceValue != null) {
                this.formControl.setValue(this.forceValue);
              }
            });
            observer.disconnect();
          }
        });
      });

      observer.observe(this.el.nativeElement);
    });
  }
}
