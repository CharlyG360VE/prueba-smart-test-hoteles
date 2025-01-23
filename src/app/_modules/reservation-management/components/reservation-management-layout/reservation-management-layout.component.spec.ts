import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationManagementLayoutComponent } from './reservation-management-layout.component';

describe('ReservationManagementLayoutComponent', () => {
  let component: ReservationManagementLayoutComponent;
  let fixture: ComponentFixture<ReservationManagementLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationManagementLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationManagementLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
