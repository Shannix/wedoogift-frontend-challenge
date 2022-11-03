import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InputAmountComponent} from './input-amount.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {By} from "@angular/platform-browser";

describe('InputAmountComponent', () => {
  let component: InputAmountComponent;
  let fixture: ComponentFixture<InputAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule],
      declarations: [InputAmountComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init input with value and call search.', () => {
    component.initForm();
    spyOn(component, 'searchCombination').and.callThrough();

    //element bien défini dans l'IHM
    const element = fixture.debugElement.query(By.css('#button-valider'));
    expect(element).toBeDefined();

    /** le bouton valider est defini*/
    const button = fixture.debugElement.query(By.css('#button-valider')).nativeElement;
    expect(button).toBeDefined();

    component.setAmountAndSearch(5);
    expect(component.searchCombination).toHaveBeenCalled();

  });
});
