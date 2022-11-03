import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CalculatorComponent} from './calculator.component';
import {HttpClientModule} from "@angular/common/http";
import {CalculatorResult} from "../../model/calculatorResult";
import {CalculatorComponentValue} from "../../model/calculatorComponentValue";

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [CalculatorComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return adequate result : EQUAL', () => {
    const ceil = new CalculatorComponentValue(7, [2, 5]);
    const equal = new CalculatorComponentValue(5, [2, 3]);
    const floor = new CalculatorComponentValue(3, [2, 1]);
    const value = new CalculatorResult(ceil, equal, floor);

    expect(component.getAdequateResult(value)).toEqual([2, 3]);
  });


  it('should return adequate result : CEIL', () => {
    const ceil = new CalculatorComponentValue(7, [2, 5]);
    const value = new CalculatorResult(ceil, undefined, undefined);

    expect(component.getAdequateResult(value)).toEqual([2, 5]);
  });


  it('should return adequate result : FLOOR', () => {
    const floor = new CalculatorComponentValue(3, [2, 1]);
    const value = new CalculatorResult(undefined, undefined, floor);

    expect(component.getAdequateResult(value)).toEqual([2, 1]);
  });


  it('should return [] >> have to choose new value', () => {
    const floor = new CalculatorComponentValue(3, [2, 1]);
    const ceil = new CalculatorComponentValue(7, [2, 5]);
    const value = new CalculatorResult(ceil, undefined, floor);

    expect(component.getAdequateResult(value)).toEqual([]);
    // les valeurs proposés à l'utilisateur sont 7 et 3
    expect(component.possibleValues).toEqual([7, 3]);
  });

  it('should return [] >> l api ne retourne rien ', () => {
    // l'api ne retourne rien
    const value = new CalculatorResult(undefined, undefined, undefined);

    expect(component.getAdequateResult(value)).toEqual([]);
    // aucune valeur n'est proposé à l'utilisateur.
    expect(component.possibleValues).toEqual([]);
  });


});
