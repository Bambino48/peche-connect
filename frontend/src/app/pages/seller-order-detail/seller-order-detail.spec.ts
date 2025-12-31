import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerOrderDetail } from './seller-order-detail';

describe('SellerOrderDetail', () => {
  let component: SellerOrderDetail;
  let fixture: ComponentFixture<SellerOrderDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerOrderDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerOrderDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
