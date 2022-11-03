import {AbstractControl, FormArray, FormGroup, ValidatorFn} from "@angular/forms";

export function validateFormControls(
  control: AbstractControl,
  opts?: {
    onlySelf?: boolean;
    emitEvent?: boolean;
  }
): void {
  if (!opts) {
    opts = {onlySelf: true, emitEvent: false};
  }
  control.markAsTouched(opts);

  if (control instanceof FormGroup || control instanceof FormArray) {
    Object.keys(control.controls).forEach(field => {
      const fieldControl: AbstractControl | null = control.get(field);
      if (fieldControl != null) {
        validateFormControls(fieldControl, opts);
      }
    });
  } else {
    control.updateValueAndValidity(opts);
  }
  return;
}

export default class ValidatorUtils {
  /**
   * Validator pour s'assurer que ce qu'on a saisi est bien un montant positif.
   * */
  static numberValidator(valueControl: string): ValidatorFn {
    return (abstractControl: AbstractControl): null => {
      const value: AbstractControl | null = abstractControl.get(valueControl);

      if (Number.isNaN(Number(value?.value)) || Number(value?.value) < 0) {
        value?.setErrors({...(value.errors ?? {}), 'amount': true});
      }

      return null;
    };
  }
}
