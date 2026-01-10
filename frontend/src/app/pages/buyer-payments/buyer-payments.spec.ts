import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerPayments } from './buyer-payments';

describe('BuyerPayments', () => {
  let component: BuyerPayments;
  let fixture: ComponentFixture<BuyerPayments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyerPayments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyerPayments);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
