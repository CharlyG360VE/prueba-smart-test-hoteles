import { Action, createReducer, on } from "@ngrx/store";
import { IReservationInitialState } from "../_interfaces/reservation-reducer.interface";
import * as action from '../_actions/reservation-reducer-action';

const initialState: IReservationInitialState = {
  reservations: []
};

const _reservationReducer = createReducer<IReservationInitialState, Action>(
  initialState,
    on(action.addReservation, (state, { reservation }) => (
      {
        ...state,
        reservations: [...state.reservations, reservation]
      }
    )),
);

export const reservationReducer = (state: IReservationInitialState | undefined, action: Action) => _reservationReducer(state, action);
