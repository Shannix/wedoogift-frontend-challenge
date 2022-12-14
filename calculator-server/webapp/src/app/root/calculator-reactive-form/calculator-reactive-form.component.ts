import {Component, OnInit} from '@angular/core';
import {CalculatorService} from "../../services/calculator.service";
import {CalculatorResult} from "../../model/calculatorResult";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {validateFormControls} from "../../util/validatorUtils";

@Component({
  selector: 'app-calculator-reactive-form',
  templateUrl: './calculator-reactive-form.component.html',
  styleUrls: ['./calculator-reactive-form.component.scss']
})
export class CalculatorReactiveFormComponent implements OnInit {

  form: FormGroup;
  amountInputForm: FormControl;

  /** les valeurs possibles à selectionner par l'utilisateur. */
  possibleValues: number[] = [];
  /** resultat de la recherche des combinaisons possibles. */
  searchResult: number[] = [];
  /** Le serveur nous a retourné une réponse. */
  isLoaded = false;
  /** Identifiant du shop par défaut. */
  shopId = 5;

  constructor(private formBuilder: FormBuilder, private calculatorService: CalculatorService) {
  }

  ngOnInit() {
    this.amountInputForm = this.formBuilder.control(null);
    this.form = this.formBuilder.group({
      amountInput: this.amountInputForm,
    },);
  }

  /**
   * Recherche une serie de combinaisons possibles.
   */
  searchCombination() {
    validateFormControls(this.form, {emitEvent: true});

    if (this.form.valid) {
      const input = this.form.value.amountInput.amountInput;
      this.calculatorService.searchCombination(input, this.shopId).subscribe((values: CalculatorResult) => {
        this.searchResult = this.getAdequateResult(values);
      }, error => {
        alert("Recherche impossible.");
      });
    }

  }

  /**
   * Calcule le resultat adéquat à retourner à l'écran.
   */
  getAdequateResult(value: CalculatorResult): number[] {
    this.isLoaded = true;
    /* le total des cards proposé est trop bas */
    if (!value.equal && value.floor && !value.ceil) {
      alert("Seulement le montant " + value.floor.value + " est possible !");
      this.calculatorService.setDesiredAmout(value.floor.value);
      return value.floor.cards;
    } else if (!value.equal && !value.floor && value.ceil) {
      /* le total des cards proposé est trop haut */
      alert("Seulement le montant " + value.ceil.value + " est possible !");
      this.calculatorService.setDesiredAmout(value.ceil.value);
      return value.ceil.cards;
    } else if (!value.equal) {
      /* L'utilisateur doit faire un choix entre le plus grand ou le plus petit */
      this.isLoaded = false;
      const result = [];
      if (value.ceil) {
        result.push(value.ceil.value);
      }
      if (value.floor) {
        result.push(value.floor.value);
      }
      this.possibleValues = result;
      return [];
    }
    /* le total des cards proposé est équivalent  */
    return value.equal.cards;
  }

  /**
   * Une fois que l'utilisateur a fait son choix, notifier l'observable de la nouvelle valeur.
   * */
  updateInputValueWithChoosenValue(value: number): void {
    this.calculatorService.setDesiredAmout(value);
  }

}
