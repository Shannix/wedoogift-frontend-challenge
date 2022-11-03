import {TestBed} from '@angular/core/testing';

import {CalculatorService} from './calculator.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CalculatorService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /** teste que la méthode search*/
  it('should be searchCombination a été appelé ', () => {
    spyOn(service, 'searchCombination').and.callThrough();
    service.searchCombination(5, 5);
    expect(service.searchCombination).toHaveBeenCalled();
  });

  it('should update the dataSource value', () => {
    service.setDesiredAmout(5);
    service.dataSource.subscribe(value => {
      expect(value).toBe(5);
    });
  });

});
