import {Component} from '@angular/core';
import {CalculatorService} from "../../services/calculator.service";

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {

  searchResult: number[] = [];

  constructor(private calculatorService: CalculatorService) {
  }


  /**
   * Recherche une serie de combinaisons possibles.
   */
  searchCombination(input: number) {
    this.calculatorService.searchCombination(input, 5).subscribe((values) => {
      this.searchResult = values;
    }, error => {
      alert('Impossible de rechercher');
    });
  }

}
