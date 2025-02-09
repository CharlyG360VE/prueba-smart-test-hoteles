import { eMagicNumbers } from '@/_enums/magic-numbers.enum';
import { IHotel } from '@/_ngrx/_interfaces/hotel-reducer.interface';
import { getHotelById } from '@/_ngrx/_selectors/hotel-reducer.selector';
import { AppState } from '@/_ngrx/app.reducer';
import { DialogService } from '@/_services/dialog.service';
import { IHotelManagementForm } from '@/hotel-management/interface/hotel-management.interface';
import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { select, Store } from '@ngrx/store';
import { first, Subscription } from 'rxjs';

@Component({
  selector: 'app-hotel-management-form',
  imports: [
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './hotel-management-form.component.html',
  styleUrl: './hotel-management-form.component.scss'
})
export class HotelManagementFormComponent {

  private readonly _store = inject(Store<AppState>);
  private readonly _fb = inject(FormBuilder);
  private readonly _subscription$ = new Subscription();
  private readonly _dialogSvc = inject(DialogService);
  private _hotelData?: IHotel;

  public id = eMagicNumbers.N_0;
  public form = this._fb.group<IHotelManagementForm>(
    {
      name: this._fb.control(
        null,
        {
          validators: [Validators.required, Validators.minLength(1)]
        }
      )
    }
  )

  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly data: number,
    private readonly _dialogRef: MatDialogRef<HotelManagementFormComponent>) { }

  ngOnInit() {
    this.id = this.data;
    this.getHotelById();
  }

  ngOnDestroy() {
    this._subscription$.unsubscribe();
  }

  public save() {
    if (this.form.invalid)
      return;

    const PAYLOAD: IHotel = {
      id: this.id === 0 ? Math.round(Math.random() * 1000000) : this.id,
      name: this.form.controls.name.value!,
      active: this._hotelData ? this._hotelData.active : true,
      viewRooms: this._hotelData ? this._hotelData.viewRooms : false,
      rooms: this._hotelData ? this._hotelData.rooms : []
    };

    this._dialogRef.close({ isSave: true, hotel: PAYLOAD });
    this._dialogSvc.alertDialog('', 'Guardado exitoso.');
  }

  private getHotelById() {
    if (this.id === 0)
      return;

    const getHotelById$ = this._store.pipe(select(getHotelById(this.id)));

    this._subscription$.add(
      getHotelById$
        .pipe(
          first()
        )
        .subscribe(
          {
            next: hotel => {
              this._hotelData = hotel;

              this.form.setValue(
                {
                  name: this._hotelData?.name ?? null
                }
              );
            }
          }
        )
    );
  }

}
