import { viewHotelRooms } from '@/_ngrx/_actions/hotel-reducer.action';
import { IHotel } from '@/_ngrx/_interfaces/hotel-reducer.interface';
import { AppState } from '@/_ngrx/app.reducer';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-hotel-available-card',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule
  ],
  templateUrl: './hotel-available-card.component.html',
  styleUrl: './hotel-available-card.component.scss',
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
export class HotelAvailableCardComponent {

  @Input({ required: true }) hotel!: IHotel;
  @Input({ required: true }) numberPeople!: number;
  @Input({ required: true }) startDate!: Date;
  @Input({ required: true }) finishDate!: Date;

  private _store = inject(Store<AppState>);
  private _router = inject(Router);

  public hotelTemp?: IHotel;

  ngOnInit() {
    this.hotelTemp = JSON.parse(JSON.stringify(this.hotel));
  }

  public viewHotelRooms(hotelId: number, viewRooms: boolean) {
    this._store.dispatch(viewHotelRooms({ hotelId, viewRooms }));
  }

  public reservationCreate(roomId: number) {
    localStorage.setItem(
      'reservationData',
      JSON.stringify(
        {
          numberPeople: this.numberPeople,
          startDate: this.startDate,
          finishDate: this.finishDate
        }
      )
    );

    this._router.navigate(['reservacion/crear-reservacion', this.hotel.id, roomId]);
  }

}
