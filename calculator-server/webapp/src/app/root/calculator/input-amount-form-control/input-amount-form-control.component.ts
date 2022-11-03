import {Component, EventEmitter, forwardRef, OnInit, Output} from '@angular/core';
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
  amount: FormControl;

  /** Déclenche un événement de recherche. */
  @Output() searchCards = new EventEmitter<number>();

  constructor(private formBuilder: FormBuilder, private calculatorService: CalculatorService) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  /** Initialiser le formulaire. */
  initForm(): void {
    this.amount = this.formBuilder.control(undefined, [Validators.required, ValidatorUtils.numberValidator('amount')]);
    this.form = new FormGroup({
      amount: this.amount
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
    let currentValue = this.amount?.value;
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
    this.amount?.setValue(value);
    this.searchCombination();
  }

  /**
   * Renvoi la valeur saisie de l'utilisateur au composant responsable de la recherche.
   * */
  searchCombination(): void {
    if (this.form.valid) {
      this.searchCards.emit(this.form?.get('amount')?.value);
    } else {
      alert("Merci de saisir un montant positif valide ");
    }
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
    return this.form.valid ? null : {invalidForm: true};
  }

}
