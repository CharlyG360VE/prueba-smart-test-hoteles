import { IHotel } from "@/_ngrx/_interfaces/hotel-reducer.interface";
import { FormControl } from "@angular/forms";

export interface IHotelManagementForm {
  name: FormControl<string | null>;
}

export interface IRoomForm {
  hotel: FormControl<number | null>;
  roomType: FormControl<number | null>;
  price: FormControl<number | null>;
  tax: FormControl<number | null>;
}

export interface IRoomType {
  id: number;
  name: string;
}
