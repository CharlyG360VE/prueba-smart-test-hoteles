import { createAction, props } from "@ngrx/store";
import { IReservation } from "../_interfaces/reservation-reducer.interface";

const ACTION_NAME = '[RESERVATION REDUCER]';

export const addReservation = createAction(`${ACTION_NAME} add reservation`, props<{ reservation: IReservation }>());