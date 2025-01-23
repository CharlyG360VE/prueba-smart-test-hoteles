import { getHotelAvailableFilter } from '@/_ngrx/_selectors/reservation-reducer.selector';
import { AppState } from '@/_ngrx/app.reducer';
import { IFilterForm } from '@/reservation-management/interface/reservation-management.interface';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { select, Store } from '@ngrx/store';
import { Subscription, take } from 'rxjs';
import { HotelAvailableCardComponent } from "../hotel-available-card/hotel-available-card.component";
import { IHotel } from '@/_ngrx/_interfaces/hotel-reducer.interface';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-filter-reservation',
  imports: [
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    HotelAvailableCardComponent
  ],
  templateUrl: './filter-reservation.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './filter-reservation.component.scss',
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
export class FilterReservationComponent {

  private _store = inject(Store<AppState>);
  private _fb = inject(FormBuilder);

  public hotelList: IHotel[] = [];
  public executeSearch = false;
  public minDate = new Date();
  public form = this._fb.group<IFilterForm>(
    {
      startDate: this._fb.control(null, { validators: Validators.required }),
      finishDate: this._fb.control(null, { validators: Validators.required }),
      numberPeople: this._fb.control(null, { validators: Validators.required })
    }
  );

  public searchHotelAvailable() {
    if (this.form.controls.startDate.invalid)
      return;

    this.hotelList = [];
    this.executeSearch = true;
    const hotelAvailableList$ = this._store.pipe(select(getHotelAvailableFilter(this.form.controls.startDate.value!, this.form.controls.finishDate.value!)));
    const subscription$ = new Subscription();

    subscription$.add(
      hotelAvailableList$
        .pipe(take(1))
        .subscribe(
          {
            next: hotelList => {
              setTimeout(() => {
                this.hotelList = [...hotelList.map(hotel => (
                  {
                    ...hotel,
                    rooms: [...hotel.rooms]
                  }
                ))];
              }, 50);
            }
          }
        )
    );
  }

}
