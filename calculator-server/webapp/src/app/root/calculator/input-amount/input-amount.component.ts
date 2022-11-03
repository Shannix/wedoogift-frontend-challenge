import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CalculatorService} from "../../../services/calculator.service";
import ValidatorUtils from "../../../util/validatorUtils";

@Component({
  selector: 'app-input-amount',
  templateUrl: './input-amount.component.html',
  styleUrls: ['./input-amount.component.scss']
})
export class InputAmountComponent implements OnInit {

  /** Formulaire. */
  form: FormGroup;

  /** Déclenche un événement de recherche. */
  @Output() searchCards = new EventEmitter<number>();

  constructor(private formBuilder: FormBuilder, private calculatorService: CalculatorService) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  /** Initialiser le formulaire. */
  initForm(): void {
    this.form = this.formBuilder.group({
      amount: [undefined, [Validators.required]]
    }, {validators: ValidatorUtils.numberValidator('amount')});

    /* Observable sensible aux changement de valeurs. */
    this.calculatorService.correctDesiredAmount.subscribe(value => {
      this.setAmountAndSearch(value);
    });
  }

  /**
   * Augmente ou diminue le montant saisie par l'utilisateur.
   * */
  nextPreviousValue(isNext?: boolean): void {
    let currentValue = this.form.get('amount')?.value;
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
    this.form.get('amount')?.setValue(value);
    this.searchCombination();
  }

  /**
   * Renvoi la valeur saisie de l'utilisateur au composant responsable de la recherche.
   * */
  searchCombination(): void {
    const amountValue = this.form?.get('amount');
    if (this.form.valid) {
      this.searchCards.emit(amountValue?.value);
    } else {
      amountValue?.setValue(amountValue?.value.replace(/\D/g, ''));
      alert("Merci de saisir un montant positif valide ");
    }
  }

}
