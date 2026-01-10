import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerOrders } from './buyer-orders';

describe('BuyerOrders', () => {
  let component: BuyerOrders;
  let fixture: ComponentFixture<BuyerOrders>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyerOrders]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyerOrders);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
