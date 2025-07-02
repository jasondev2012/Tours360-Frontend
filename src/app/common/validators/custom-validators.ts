import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static serieFacturaBoletaFormat(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null; // no validar si está vacío
      const regex = /^[A-Za-z]\d{3}-\d{10}$/;
      return regex.test(control.value) ? null : { invalidSerieFormat: true };
    };
  }
  static ruc(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null; // no validar si está vacío
      const regex = /^[0-9]{11}$/;
      return regex.test(control.value) ? null : { rucInvalido: 'Debe ingresar un RUC válido' };
    };
  }
  static dni(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null; // no validar si está vacío
      const regex = /^[0-9]{8}$/;
      return regex.test(control.value) ? null : { dniInvalido: 'Debe ingresar un DNI válido' };
    };
  }
  static pasaporte(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null; // no validar si está vacío
      const regex = /^[a-zA-Z0-9]{1,12}$/;
      return regex.test(control.value) ? null : { pasaporteInvalido: 'Debe ingresar un pasaporte válido' };
    };
  }
  static carnetExtranjeria(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null; // no validar si está vacío
      const regex = /^[a-zA-Z0-9]{1,12}$/;
      return regex.test(control.value) ? null : { carnetInvalido: 'Debe ingresar un carnet de extranjería válido' };
    };
  }
  static partidaNacimiento(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null; // no validar si está vacío
      const regex = /^[a-zA-Z0-9]{1,15}$/;
      return regex.test(control.value) ? null : { partidaInvalida: 'Debe ingresar una partida de nacimiento válida' };
    };
  }
  static otroDocumentoIdentidad(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null; // no validar si está vacío
      const regex = /^[a-zA-Z0-9]{1,15}$/;
      return regex.test(control.value) ? null : { otroDocInvalido: 'Debe ingresar otro tipo de documento válido' };
    };
  }

  // Aquí puedes agregar más validadores personalizados si quieres
}
