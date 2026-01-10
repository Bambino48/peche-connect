import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerNotifications } from './buyer-notifications';

describe('BuyerNotifications', () => {
  let component: BuyerNotifications;
  let fixture: ComponentFixture<BuyerNotifications>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyerNotifications]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyerNotifications);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
