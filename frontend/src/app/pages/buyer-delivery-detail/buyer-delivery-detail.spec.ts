import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerDeliveryDetail } from './buyer-delivery-detail';

describe('BuyerDeliveryDetail', () => {
  let component: BuyerDeliveryDetail;
  let fixture: ComponentFixture<BuyerDeliveryDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyerDeliveryDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyerDeliveryDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
