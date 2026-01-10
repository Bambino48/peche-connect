import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerPaymentFailure } from './buyer-payment-failure';

describe('BuyerPaymentFailure', () => {
  let component: BuyerPaymentFailure;
  let fixture: ComponentFixture<BuyerPaymentFailure>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyerPaymentFailure]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyerPaymentFailure);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
