import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverySettings } from './delivery-settings';

describe('DeliverySettings', () => {
  let component: DeliverySettings;
  let fixture: ComponentFixture<DeliverySettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliverySettings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliverySettings);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
