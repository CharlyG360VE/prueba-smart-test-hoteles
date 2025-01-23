import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelManagementCardComponent } from './hotel-management-card.component';

describe('HotelManagementCardComponent', () => {
  let component: HotelManagementCardComponent;
  let fixture: ComponentFixture<HotelManagementCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelManagementCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelManagementCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
