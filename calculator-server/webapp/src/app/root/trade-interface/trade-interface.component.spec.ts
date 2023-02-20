import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeInterfaceComponent } from './trade-interface.component';

describe('TradeInterfaceComponent', () => {
  let component: TradeInterfaceComponent;
  let fixture: ComponentFixture<TradeInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradeInterfaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
