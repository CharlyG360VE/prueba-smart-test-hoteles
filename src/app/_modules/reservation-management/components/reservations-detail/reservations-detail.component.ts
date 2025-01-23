import { getAllReservations } from '@/_ngrx/_selectors/reservation-reducer.selector';
import { AppState } from '@/_ngrx/app.reducer';
import { IReservationDetail } from '@/reservation-management/interface/reservation-management.interface';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { first, Subscription } from 'rxjs';
import { HotelReservationDetailCardComponent } from '../hotel-reservation-detail-card/hotel-reservation-detail-card.component';

@Component({
  selector: 'app-reservations-detail',
  imports: [
    CommonModule,
    HotelReservationDetailCardComponent
  ],
  templateUrl: './reservations-detail.component.html',
  styleUrl: './reservations-detail.component.scss',
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition(':enter, :leave', [
        animate(200)
      ])
    ])
  ]
})
export default class ReservationsDetailComponent {

  private _store = inject(Store<AppState>);
  private _subscription$ = new Subscription();

  public getAllReservations$ = this._store.pipe(select(getAllReservations));
  public reservationDetailList: IReservationDetail[] = []

  ngOnInit() {
    this.getAllReservationList();
  }

  ngOnDestroy() {
    this._subscription$.unsubscribe();
  }

  private getAllReservationList() {
    this._subscription$.add(
      this.getAllReservations$
        .pipe(first())
        .subscribe(
          {
            next: response => {
              const groupedByHotel: { [key: string]: any[] } = response
                .reduce(
                  (acc: { [key: string]: any[] }, reservation) => {
                    const hotelName = reservation.hotelData!.name;
                    if (!acc[hotelName]) {
                      acc[hotelName] = [];
                    }
                    acc[hotelName].push(reservation);
                    return acc;
                  },
                  {}
                );
              const reservationList: IReservationDetail[] = [];

              for (const key in groupedByHotel) {
                reservationList.push(
                  {
                    hotelName: key,
                    data: groupedByHotel[key]
                  }
                );
              }

              this.reservationDetailList = reservationList;
            }
          }
        )
    );
  }

}
