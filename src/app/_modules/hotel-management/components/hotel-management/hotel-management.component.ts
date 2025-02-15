import { Component, inject } from '@angular/core';
import { HotelManagementCardComponent } from "../hotel-management-card/hotel-management-card.component";
import { MatButtonModule } from '@angular/material/button';
import { AppState } from '@/_ngrx/app.reducer';
import { select, Store } from '@ngrx/store';
import { getHotelList } from '@/_ngrx/_selectors/hotel-reducer.selector';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { eMagicNumbers } from '@/_enums/magic-numbers.enum';
import { HotelManagementFormComponent } from '../hotel-management-form/hotel-management-form.component';
import { addHotel, addHotelRoom, editHotel, editHotelRoom } from '@/_ngrx/_actions/hotel-reducer.action';
import { RoomFormComponent } from '../room-form/room-form.component';
import { IHotel } from '@/_ngrx/_interfaces/hotel-reducer.interface';

@Component({
  selector: 'app-hotel-management',
  imports: [
    HotelManagementCardComponent,
    MatButtonModule
  ],
  templateUrl: './hotel-management.component.html',
  styleUrl: './hotel-management.component.scss'
})
export default class HotelManagementComponent {

  private readonly _store = inject(Store<AppState>);
  private readonly subscription$ = new Subscription();
  private readonly _dialog = inject(MatDialog);

  public getHotelList$ = this._store.pipe(select(getHotelList));
  public hotelList: IHotel[] = [];

  ngOnInit() {
    this.getHotelList();
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  public createHotel() {
    this.openHotelForm();
  }

  public handlerHotelEdit(id: string) {
    this.openHotelForm(id);
  }

  public createHotelRoom() {
    this.openRoomForm();
  }

  public handlerHotelRoomEdit({ hotelId, roomId }: { hotelId: string, roomId: string }) {
    this.openRoomForm(hotelId, roomId);
  }

  private getHotelList() {
    this.subscription$.add(
      this.getHotelList$.subscribe(
        {
          next: hotels => this.hotelList = [...hotels]
        }
      )
    );
  }

  private openRoomForm(hotelId = '', id = '') {
    const DIALOG_REF = this._dialog.open(RoomFormComponent, {
      minWidth: '50vw',
      maxWidth: '80vw',
      enterAnimationDuration: eMagicNumbers.N_500,
      exitAnimationDuration: eMagicNumbers.N_100,
      disableClose: true,
      data: {
        hotelList: this.hotelList,
        hotelId,
        id

      }
    });
    const SUBSCRIPTION$ = new Subscription();

    SUBSCRIPTION$.add(
      DIALOG_REF
        .afterClosed()
        .subscribe(
          {
            next: ({ isSave, room, hotelId }) => {
              if (isSave)
                if (id.length > 0)
                  this._store.dispatch(editHotelRoom({ hotelId, room }));
                else
                this._store.dispatch(addHotelRoom({ hotelId, room }));

              SUBSCRIPTION$.unsubscribe();
            }
          }
        )
    )
  }

  private openHotelForm(id = '') {
    const DIALOG_REF = this._dialog.open(HotelManagementFormComponent, {
      minWidth: '50vw',
      maxWidth: '80vw',
      enterAnimationDuration: eMagicNumbers.N_500,
      exitAnimationDuration: eMagicNumbers.N_100,
      disableClose: true,
      data: id
    });
    const SUBSCRIPTION$ = new Subscription();

    SUBSCRIPTION$.add(
      DIALOG_REF
        .afterClosed()
        .subscribe(
          {
            next: ({ isSave, hotel }) => {
              if (isSave)
                if (id.length > 0)
                  this._store.dispatch(editHotel({ hotel }));
                else
                  this._store.dispatch(addHotel({ hotel }));

              SUBSCRIPTION$.unsubscribe();
            }
          }
        )
    )
  }

}
