import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AppState } from '@/_ngrx/app.reducer';
import { Store } from '@ngrx/store';
import { activeOrInactiveHotel, activeOrInactiveHotelRoom, viewHotelRooms } from '@/_ngrx/_actions/hotel-reducer.action';
import { IHotel } from '@/_ngrx/_interfaces/hotel-reducer.interface';

@Component({
  selector: 'app-hotel-management-card',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule
  ],
  templateUrl: './hotel-management-card.component.html',
  styleUrl: './hotel-management-card.component.scss',
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
export class HotelManagementCardComponent {

  @Input({ required: true }) hotel!: IHotel;
  @Output() onEditHotel = new EventEmitter<string>();
  @Output() onEditHotelRoom = new EventEmitter<{ hotelId: string; roomId: string; }>();

  private readonly _store = inject(Store<AppState>);

  public getHotelEdit(id: string) {
    this.onEditHotel.emit(id);
  }

  public getHotelRoomEdit(hotelId: string, roomId: string) {
    this.onEditHotelRoom.emit({ hotelId, roomId });
  }

  public activeOrInactiveHotel(hotelId: string, active: boolean) {
    this._store.dispatch(activeOrInactiveHotel({ hotelId, active }));
  }

  public viewHotelRooms(hotelId: string, viewRooms: boolean) {
    this._store.dispatch(viewHotelRooms({ hotelId, viewRooms }));
  }

  public activeOrInactiveHotelRoom(hotelId: string, roomId: string, active: boolean) {
    this._store.dispatch(activeOrInactiveHotelRoom({ hotelId, roomId, active }));
  }

}
