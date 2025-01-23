import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterReservationComponent } from './filter-reservation.component';

describe('FilterReservationComponent', () => {
  let component: FilterReservationComponent;
  let fixture: ComponentFixture<FilterReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterReservationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
