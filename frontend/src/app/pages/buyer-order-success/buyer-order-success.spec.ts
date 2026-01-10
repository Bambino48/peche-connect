import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerOrderSuccess } from './buyer-order-success';

describe('BuyerOrderSuccess', () => {
  let component: BuyerOrderSuccess;
  let fixture: ComponentFixture<BuyerOrderSuccess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyerOrderSuccess]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyerOrderSuccess);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
