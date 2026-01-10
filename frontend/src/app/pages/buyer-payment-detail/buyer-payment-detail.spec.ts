import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerPaymentDetail } from './buyer-payment-detail';

describe('BuyerPaymentDetail', () => {
  let component: BuyerPaymentDetail;
  let fixture: ComponentFixture<BuyerPaymentDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyerPaymentDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyerPaymentDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
