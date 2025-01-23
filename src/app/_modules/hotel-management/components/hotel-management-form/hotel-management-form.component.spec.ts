import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelManagementFormComponent } from './hotel-management-form.component';

describe('HotelManagementFormComponent', () => {
  let component: HotelManagementFormComponent;
  let fixture: ComponentFixture<HotelManagementFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelManagementFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelManagementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
