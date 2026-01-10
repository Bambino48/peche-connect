import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerPayment } from './buyer-payment';

describe('BuyerPayment', () => {
  let component: BuyerPayment;
  let fixture: ComponentFixture<BuyerPayment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyerPayment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyerPayment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
