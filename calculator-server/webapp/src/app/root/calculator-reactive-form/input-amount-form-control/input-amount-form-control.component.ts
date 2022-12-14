import {Component, forwardRef, OnInit} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {CalculatorService} from "../../../services/calculator.service";
import ValidatorUtils, {validateFormControls} from "../../../util/validatorUtils";

/**Thee value of the component will be an object following this interface: */
export interface CalculatorComponentValueForm {
  value: number;
  cards: number[];
}

@Component({
  selector: 'app-input-amount-form-control',
  templateUrl: './input-amount-form-control.component.html',
  styleUrls: ['./input-amount-form-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputAmountFormControlComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => InputAmountFormControlComponent)
    }
  ]
})
export class InputAmountFormControlComponent implements OnInit, ControlValueAccessor {

  /** Formulaire. */
  form: FormGroup;
  amountInput: FormControl;

  touched = false;

  disabled = false;

  constructor(private formBuilder: FormBuilder, private calculatorService: CalculatorService) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  /** Initialiser le formulaire. */
  initForm(): void {
    this.amountInput = this.formBuilder.control(undefined, [Validators.required, ValidatorUtils.numberValidator('amount')]);
    this.form = new FormGroup({
      amountInput: this.amountInput
    });
    /* Observable sensible aux changement de valeurs. */
    this.calculatorService.correctDesiredAmount.subscribe(value => {
      this.setAmountAndSearch(value);
    });
  }

  /**
   * Augmente ou diminue le montant saisie par l'utilisateur.
   * */
  nextPreviousValue(isNext?: boolean): void {
    let currentValue = this.amountInput?.value;
    if (!currentValue) {
      currentValue = 0;
    }

    if (isNext) {
      currentValue++;
    } else if (currentValue > 0) {
      currentValue--;
    }
    /* Affecte la nouvelle valeur. */
    this.setAmountAndSearch(currentValue);
  }

  /**
   * Setter amount et lance la recherche.
   * */
  setAmountAndSearch(value: number): void {
    this.amountInput?.setValue(value);
    //this.searchCombination();
  }


  onTouched = (): any => null;

  writeValue(value: any | null): void {
    //
  }

  registerOnChange(fn: any): void {
    this.form.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  validate(c: AbstractControl): ValidationErrors | null {
    if (c.touched) {
      validateFormControls(this.form);
    }
    if (!this.form.valid) {
      alert("Merci de saisir un montant positif valide ");
    }
    return this.form.valid ? null : {invalidForm: true};
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }
}
