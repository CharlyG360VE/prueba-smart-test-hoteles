import { IHotel, IRoom } from '@/_ngrx/_interfaces/hotel-reducer.interface';
import { ROOM_TYPE_LIST } from '@/hotel-management/data/parametrics.data';
import { IRoomForm } from '@/hotel-management/interface/hotel-management.interface';
import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { getRoomById } from '@/_ngrx/_selectors/hotel-reducer.selector';
import { select, Store } from '@ngrx/store';
import { first, Subscription } from 'rxjs';
import { AppState } from '@/_ngrx/app.reducer';
import { DialogService } from '@/_services/dialog.service';
import { generateUuid } from '@/_helpers/common.helper';

@Component({
  selector: 'app-room-form',
  imports: [
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './room-form.component.html',
  styleUrl: './room-form.component.scss'
})
export class RoomFormComponent {

  private readonly _store = inject(Store<AppState>);
  private readonly _fb = inject(FormBuilder);
  private readonly _dialogSvc = inject(DialogService);
  private readonly _subscription$ = new Subscription();
  private _room?: IRoom;

  public hotelList: IHotel[] = [];
  public roomTypeList = ROOM_TYPE_LIST;
  public isEdit = false;
  public form = this._fb.group<IRoomForm>(
    {
      hotel: this._fb.control(null, { validators: [Validators.required] }),
      roomType: this._fb.control(null, { validators: [Validators.required] }),
      price: this._fb.control(null, { validators: [Validators.required, Validators.minLength(1)] }),
      tax: this._fb.control(19, { validators: [Validators.required, Validators.minLength(1)] })
    }
  );

  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly data: { hotelList: IHotel[]; hotelId: string; id: string; },
    private readonly _dialogRef: MatDialogRef<RoomFormComponent>) { }

  ngOnInit() {
    this.hotelList = this.data.hotelList;

    if (this.data.id.length > 0) {
      this.isEdit = true;

      this.getRoomById();
    }
  }

  ngOnDestroy() {
    this._subscription$.unsubscribe();
  }

  public save() {
    if (this.form.invalid)
      return;

    const priceWithTaxCalculate = this.form.controls.price.value! * (this.form.controls.tax.value! / 100);
    const PAYLOAD: IRoom = {
      id: this.data.id.length > 0 ? this.data.id : generateUuid(),
      roomType: this.form.controls.roomType.value!,
      roomTypeName: this.roomTypeList.find(x => x.id === this.form.controls.roomType.value)?.name ?? '',
      maxguest: this.roomTypeList.find(x => x.id === this.form.controls.roomType.value)?.maxguest ?? 0,
      price: this.form.controls.price.value!,
      priceWithTax: this.form.controls.price.value! + priceWithTaxCalculate,
      tax: this.form.controls.tax.value!,
      active: true
    };

    this._dialogRef.close({ isSave: true, room: PAYLOAD, hotelId: this.form.controls.hotel.value });
    this._dialogSvc.alertDialog('', 'Guardado exitoso.');
  }

  private getRoomById() {
    const getRoomById$ = this._store.pipe(select(getRoomById(this.data.hotelId, this.data.id)));

    this._subscription$.add(
      getRoomById$
        .pipe(
          first()
        )
        .subscribe(
          {
            next: room => {
              this._room = room;

              this.form.setValue(
                {
                  hotel: this.data.hotelId,
                  roomType: this._room?.roomType ?? null,
                  price: this._room?.price ?? null,
                  tax: this._room?.tax ?? null
                }
              );
            }
          }
        )
    );
  }

}
