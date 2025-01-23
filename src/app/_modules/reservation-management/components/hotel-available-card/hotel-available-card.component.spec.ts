import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelAvailableCardComponent } from './hotel-available-card.component';

describe('HotelAvailableCardComponent', () => {
  let component: HotelAvailableCardComponent;
  let fixture: ComponentFixture<HotelAvailableCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelAvailableCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelAvailableCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
