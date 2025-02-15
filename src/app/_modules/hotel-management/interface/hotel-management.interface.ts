import { FormControl } from "@angular/forms";

export interface IHotelManagementForm {
  name: FormControl<string | null>;
  cityId: FormControl<number | null>;
}

export interface IRoomForm {
  hotel: FormControl<string | null>;
  roomType: FormControl<number | null>;
  price: FormControl<number | null>;
  tax: FormControl<number | null>;
}
