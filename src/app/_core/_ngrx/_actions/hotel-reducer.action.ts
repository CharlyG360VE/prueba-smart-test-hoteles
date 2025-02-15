import { createAction, props } from "@ngrx/store";
import { IHotel, IRoom } from "../_interfaces/hotel-reducer.interface";

const ACTION_NAME = '[HOTEL REDUCER]';

export const addHotel = createAction(`${ACTION_NAME} add hotel`, props<{ hotel: IHotel }>());
export const editHotel = createAction(`${ACTION_NAME} edit hotel`, props<{ hotel: IHotel }>());
export const addHotelRoom = createAction(`${ACTION_NAME} add hotel room`, props<{ hotelId: string; room: IRoom }>());
export const editHotelRoom = createAction(`${ACTION_NAME} edit hotel room`, props<{ hotelId: string; room: IRoom }>());
export const activeOrInactiveHotel = createAction(`${ACTION_NAME} active/inactive hotel`, props<{ hotelId: string; active: boolean }>());
export const viewHotelRooms = createAction(`${ACTION_NAME} view hotel rooms`, props<{ hotelId: string; viewRooms: boolean }>());
export const activeOrInactiveHotelRoom = createAction(`${ACTION_NAME} active/inactive hotel room`, props<{ hotelId: string; roomId: string; active: boolean }>());
