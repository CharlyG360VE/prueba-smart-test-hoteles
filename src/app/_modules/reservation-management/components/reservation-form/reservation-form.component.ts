import { addReservation } from '@/_ngrx/_actions/reservation-reducer-action';
import { IReservation } from '@/_ngrx/_interfaces/reservation-reducer.interface';
import { AppState } from '@/_ngrx/app.reducer';
import { DOCUMENT_TYPES_LIST, GENDER_LIST } from '@/reservation-management/data/parametric.data';
import { IGuestReservationForm, IReservationCreateForm, IReservationData } from '@/reservation-management/interface/reservation-management.interface';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-reservation-form',
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.scss',
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
export default class ReservationFormComponent {

  private readonly _store = inject(Store<AppState>);
  private readonly _fb = inject(FormBuilder);
  private readonly _router = inject(Router);
  private readonly _activatedRoute = inject(ActivatedRoute);

  private _reservationData?: IReservationData;
  private _hotelId = '';
  private _roomId = '';

  public maxDate = new Date();
  public genderList = GENDER_LIST;
  public documentTypeList = DOCUMENT_TYPES_LIST;
  public form = this._fb.group<IReservationCreateForm>(
    {
      firstName: this._fb.control(null, { validators: Validators.required }),
      lastName: this._fb.control(null, { validators: Validators.required }),
      contactNumber: this._fb.control(null, { validators: Validators.required }),
      guests: this._fb.array<FormGroup<IGuestReservationForm>>([])
    }
  );

  get guests() {
    return this.form.controls.guests;
  }

  ngOnInit() {
    this.getParametricId();
    this.getReservationData();
  }

  public cancel() {
    localStorage.removeItem('reservationData');
    this._router.navigate(['reservacion']);
  }

  public save() {
    if (this.form.invalid)
      return;

    const reservation: IReservation = {
      hotelId: this._hotelId,
      roomId: this._roomId,
      dateEntered: this._reservationData!.startDate,
      departureDate: this._reservationData!.finishDate,
      guest: this.guests.controls.map(fg => (
        {
          firstName: fg.controls.firstName.value!,
          lastName: fg.controls.lastName.value!,
          birthDate: fg.controls.birthDate.value!,
          gender: fg.controls.gender.value!,
          documentType: fg.controls.documentType.value!,
          documentNumber: fg.controls.documentNumber.value!,
          email: fg.controls.email.value!,
          contactNumber: fg.controls.contactNumber.value!
        }
      )),
      emergencyContact: {
        firstName: this.form.controls.firstName.value!,
        lastName: this.form.controls.lastName.value!,
        contactNumber: this.form.controls.contactNumber.value!
      }
    }

    this._store.dispatch(addReservation({ reservation }));
    localStorage.removeItem('reservationData');
    this._router.navigate(['reservacion']);
  }

  private getParametricId() {
    this._hotelId =  this._activatedRoute.snapshot.paramMap.get('hotelId') ?? '';
    this._roomId =  this._activatedRoute.snapshot.paramMap.get('roomId') ?? '';
  }

  private getReservationData() {
    if (localStorage.getItem('reservationData')) {
      const data = JSON.parse(localStorage.getItem('reservationData')!) as IReservationData;

      this._reservationData = data;
      this.getGuestForm();
    } else {
      this._router.navigate(['reservacion']);
    }
  }

  private getGuestForm() {
    for (let i = 0; i < this._reservationData!.numberPeople; i++) {
      this.guests.push(
        this._fb.group<IGuestReservationForm>(
          {
            firstName: this._fb.control(null, { validators: Validators.required }),
            lastName: this._fb.control(null, { validators: Validators.required }),
            birthDate: this._fb.control(null, { validators: Validators.required }),
            gender: this._fb.control(null, { validators: Validators.required }),
            documentType: this._fb.control(null, { validators: Validators.required }),
            documentNumber: this._fb.control(null, { validators: Validators.required }),
            email: this._fb.control(null, { validators: [Validators.required, Validators.email] }),
            contactNumber: this._fb.control(null, { validators: Validators.required })
          }
        )
      );
    }
  }

}
