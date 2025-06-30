import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static serieFacturaBoletaFormat(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null; // no validar si está vacío
      const regex = /^[A-Za-z]\d{3}-\d{10}$/;
      return regex.test(control.value) ? null : { invalidSerieFormat: true };
    };
  }

  // Aquí puedes agregar más validadores personalizados si quieres
}
