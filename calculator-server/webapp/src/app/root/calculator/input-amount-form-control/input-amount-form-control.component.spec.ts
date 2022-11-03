import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputAmountFormControlComponent } from './input-amount-form-control.component';

describe('InputAmountFormControlComponent', () => {
  let component: InputAmountFormControlComponent;
  let fixture: ComponentFixture<InputAmountFormControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputAmountFormControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputAmountFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
