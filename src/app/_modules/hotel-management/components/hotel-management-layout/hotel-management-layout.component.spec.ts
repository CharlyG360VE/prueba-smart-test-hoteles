import { ComponentFixture, TestBed } from '@angular/core/testing';
import HotelManagementLayoutComponent from './hotel-management-layout.component';

describe('HotelManagementLayoutComponent', () => {
  let component: HotelManagementLayoutComponent;
  let fixture: ComponentFixture<HotelManagementLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelManagementLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelManagementLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
