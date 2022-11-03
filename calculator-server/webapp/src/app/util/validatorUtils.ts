import {AbstractControl, ValidatorFn} from "@angular/forms";

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
