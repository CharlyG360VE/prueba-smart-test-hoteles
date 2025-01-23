import { IHotel, IRoom } from "@/_ngrx/_interfaces/hotel-reducer.interface";
import { IEmergencyContact, IGuest } from "@/_ngrx/_interfaces/reservation-reducer.interface";
import { FormArray, FormControl, FormGroup } from "@angular/forms";

export interface IFilterForm {
  startDate: FormControl<Date | null>;
  finishDate: FormControl<Date | null>;
  numberPeople: FormControl<number | null>;
}

export interface IReservationCreateForm {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  contactNumber: FormControl<number | null>;
  guests: FormArray<FormGroup<IGuestReservationForm>>;
}

export interface IGuestReservationForm {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  birthDate: FormControl<Date | null>;
  gender: FormControl<number | null>;
  documentType: FormControl<number | null>;
  documentNumber: FormControl<string | null>;
  email: FormControl<string | null>;
  contactNumber: FormControl<number | null>;
}

export interface IReservationData {
  numberPeople: number;
  startDate: Date;
  finishDate: Date;
}

export interface IReservationDetail {
  hotelName: string;
  data: IReservationDetailData[];
}

export interface IReservationDetailData {
  hotelId: number;
  roomId: number;
  dateEntered: Date;
  departureDate: Date;
  guest: IGuest[];
  emergencyContact: IEmergencyContact;
  hotelData: IHotel;
  roomData: IRoom;
}
