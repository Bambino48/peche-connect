import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerOrderDetail } from './buyer-order-detail';

describe('BuyerOrderDetail', () => {
  let component: BuyerOrderDetail;
  let fixture: ComponentFixture<BuyerOrderDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyerOrderDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyerOrderDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
