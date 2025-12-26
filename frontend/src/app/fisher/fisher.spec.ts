import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fisher } from './fisher';

describe('Fisher', () => {
  let component: Fisher;
  let fixture: ComponentFixture<Fisher>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fisher]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Fisher);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
