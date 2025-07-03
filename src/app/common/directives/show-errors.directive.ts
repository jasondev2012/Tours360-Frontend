import { Directive, Input, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, NgControl, Validators } from '@angular/forms';

@Directive({
    selector: '[appShowErrors]',
    standalone: true // 👈 habilita el uso en entornos standalone
})
export class ShowErrorsDirective implements OnInit {
    @Input('appShowErrors') control: AbstractControl | null = null;

    private errorElement: HTMLElement;
    private labelElement: HTMLElement | null = null;

    constructor(
        private el: ElementRef,
        private ngControl: NgControl,
        private renderer: Renderer2
    ) {
        this.errorElement = document.createElement('small');
        this.errorElement.className = 'text-danger';
        this.errorElement.style.display = 'none';
        this.el.nativeElement.parentNode.appendChild(this.errorElement);
    }

    ngOnInit() {
        // const control = this.control || this.ngControl.control;
        // if (control) {
        //     control.statusChanges?.subscribe(() => this.updateErrorMessage(control));

        //     // Detect and append asterisk to label if the field is required
        //     this.addAsteriskToLabel(control);
        // }
        const control = this.control || this.ngControl.control;
        if (control) {
            control.statusChanges?.subscribe(() => {
                this.updateErrorMessage(control);
                this.updateAsterisk(control); // 👈 Agregado aquí
            });

            this.updateAsterisk(control); // 👈 Llamada inicial
        }
    }
    private updateAsterisk(control: AbstractControl) {
        const isRequired = control.hasValidator?.(Validators.required);

        if (!this.labelElement) {
            this.labelElement = this.el.nativeElement.closest('div')?.querySelector('label');
        }

        if (this.labelElement) {
            const existingAsterisk = this.labelElement.querySelector('span.text-danger');
            if (isRequired && !existingAsterisk) {
                const asterisk = this.renderer.createElement('span');
                this.renderer.addClass(asterisk, 'text-danger');
                this.renderer.setProperty(asterisk, 'textContent', '*');
                this.renderer.appendChild(this.labelElement, asterisk);
            } else if (!isRequired && existingAsterisk) {
                this.renderer.removeChild(this.labelElement, existingAsterisk);
            }
        }
    }
    private updateErrorMessage(control: AbstractControl) {
        if (control.invalid && !control.pristine) {
            const errors = control.errors || {};
            const messages: { [key: string]: string } = {
                required: 'Este campo es obligatorio.',
                minlength: `Debe tener al menos ${errors['minlength']?.requiredLength} caracteres.`,
                maxlength: `Debe tener como máximo ${errors['maxlength']?.requiredLength} caracteres.`,
                email: 'Debe ser un correo válido.',
                soloNumeros: errors['soloNumeros'],
                soloTexto: errors['soloTexto'],
                rucInvalido: errors['rucInvalido'],
                dniInvalido: errors['dniInvalido'],
                pasaporteInvalido: errors['pasaporteInvalido'],
                carnetInvalido: errors['carnetInvalido'],
                partidaInvalida: errors['partidaInvalida'],
                otroDocInvalido: errors['otroDocInvalido'],
            };
            const firstErrorKey: any = Object.keys(errors)[0];
            const message = firstErrorKey in messages ? messages[firstErrorKey] : 'Valor no válido.';
            this.errorElement.textContent = message || 'Valor no válido.';
            this.errorElement.style.display = 'block';
        } else {
            this.errorElement.style.display = 'none';
        }
    }

    private addAsteriskToLabel(control: AbstractControl) {
        // Si el control tiene la validación required
        if (control.hasValidator(Validators.required)) {
            // Buscar el elemento <label> correspondiente
            this.labelElement = this.el.nativeElement.closest('div').querySelector('label');

            if (this.labelElement) {
                // Agregar el asterisco a la etiqueta de <label>
                const asterisk = this.renderer.createElement('span');
                this.renderer.addClass(asterisk, 'text-danger');
                this.renderer.setProperty(asterisk, 'textContent', '*');
                this.renderer.appendChild(this.labelElement, asterisk);
            }
        }
    }
}
