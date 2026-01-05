import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopProductDetail } from './shop-product-detail';

describe('ShopProductDetail', () => {
  let component: ShopProductDetail;
  let fixture: ComponentFixture<ShopProductDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopProductDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopProductDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
