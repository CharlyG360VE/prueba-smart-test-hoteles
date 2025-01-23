import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelReservationDetailCardComponent } from './hotel-reservation-detail-card.component';

describe('HotelReservationDetailCardComponent', () => {
  let component: HotelReservationDetailCardComponent;
  let fixture: ComponentFixture<HotelReservationDetailCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelReservationDetailCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelReservationDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
