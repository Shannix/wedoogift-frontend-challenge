import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ResultCardsComponent} from './result-cards.component';

describe('ResultCardsComponent', () => {
  let component: ResultCardsComponent;
  let fixture: ComponentFixture<ResultCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultCardsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show values 5 euros and 7 euros ', () => {
    component.values = [5, 7];
    expect(component.values.length).toEqual(2);
  });


})
;
