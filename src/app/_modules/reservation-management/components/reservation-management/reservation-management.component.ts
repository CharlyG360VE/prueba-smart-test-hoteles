import { Component } from '@angular/core';
import { FilterReservationComponent } from "../filter-reservation/filter-reservation.component";

@Component({
  selector: 'app-reservation-management',
  imports: [FilterReservationComponent],
  templateUrl: './reservation-management.component.html',
  styleUrl: './reservation-management.component.scss'
})
export default class ReservationManagementComponent {

}
