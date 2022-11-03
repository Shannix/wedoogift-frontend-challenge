import {CalculatorComponentValue} from "./calculatorComponentValue";

export class CalculatorResult {
  ceil: CalculatorComponentValue;
  equal: CalculatorComponentValue;
  floor: CalculatorComponentValue;

  constructor(ceil: CalculatorComponentValue, equal: CalculatorComponentValue, floor: CalculatorComponentValue) {
    this.ceil = ceil;
    this.equal = equal;
    this.floor = floor;
  }
}
