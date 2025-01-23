import { ActionReducerMap } from "@ngrx/store";
import { IHotelInitialState } from "./_interfaces/hotel-reducer.interface";
import { hotelReducer } from './_reducers/hotel-reducer.reducer';
import { IReservationInitialState } from "./_interfaces/reservation-reducer.interface";
import { reservationReducer } from "./_reducers/reservation-reducer.reducer";

export interface AppState {
  hotelReducer: IHotelInitialState;
  reservationReducer: IReservationInitialState;
}

export const APP_REDUCER: ActionReducerMap<AppState> = {
  hotelReducer,
  reservationReducer
};