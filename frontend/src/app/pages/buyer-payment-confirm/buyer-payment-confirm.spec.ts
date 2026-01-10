import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerPaymentConfirm } from './buyer-payment-confirm';

describe('BuyerPaymentConfirm', () => {
  let component: BuyerPaymentConfirm;
  let fixture: ComponentFixture<BuyerPaymentConfirm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyerPaymentConfirm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyerPaymentConfirm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
