import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerDeliveries } from './buyer-deliveries';

describe('BuyerDeliveries', () => {
  let component: BuyerDeliveries;
  let fixture: ComponentFixture<BuyerDeliveries>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyerDeliveries]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyerDeliveries);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
