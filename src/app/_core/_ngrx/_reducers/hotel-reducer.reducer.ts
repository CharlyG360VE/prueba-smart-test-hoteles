import { Action, createReducer, on } from "@ngrx/store";
import { IHotelInitialState } from "../_interfaces/hotel-reducer.interface";
import * as action from '../_actions/hotel-reducer.action';

const initialState: IHotelInitialState = {
  hotels: []
};

const _hotelReducer = createReducer<IHotelInitialState, Action>(
  initialState,
  on(action.addHotel, (state, { hotel }) => (
    {
      ...state,
      hotels: [...state.hotels, hotel]
    }
  )),
  on(action.editHotel, (state, { hotel }) => (
    {
      ...state,
      hotels: state.hotels.map(item => (item.id === hotel.id ? { ...hotel } : hotel))
    }
  )),
  on(action.activeOrInactiveHotel, (state, { hotelId, active }) => (
    {
      ...state,
      hotels: state.hotels.map(hotel => (hotel.id === hotelId ? { ...hotel, active } : hotel))
    }
  )),
  on(action.viewHotelRooms, (state, { hotelId, viewRooms }) => (
    {
      ...state,
      hotels: state.hotels.map(hotel => (hotel.id === hotelId ? { ...hotel, viewRooms } : hotel))
    }
  )),
  on(action.addHotelRoom, (state, { hotelId, room }) => (
    {
      ...state,
      hotels: state.hotels.map(hotel => (
        hotel.id === hotelId ?
          (
            {
              ...hotel,
              rooms: [ ...hotel.rooms, room ]
            }
          )
        : hotel
      ))
    }
  )),
  on(action.editHotelRoom, (state, { hotelId, room }) => (
    {
      ...state,
      hotels: state.hotels.map(hotel => (
        hotel.id === hotelId ?
          (
            {
              ...hotel,
              rooms: hotel.rooms.map(item => (item.id === room.id ? { ...room } : item))
            }
          ) :
          hotel
      ))
    }
  )),
  on(action.activeOrInactiveHotelRoom, (state, { hotelId, roomId, active }) => (
    {
      ...state,
      hotels: state.hotels.map(hotel => (
        hotel.id === hotelId ?
          (
            {
              ...hotel,
              rooms: hotel.rooms.map(room => ( room.id === roomId ? { ...room, active } : room ))
            }
          )
        : hotel
      ))
    }
  )),
);

export const hotelReducer = (state: IHotelInitialState | undefined, action: Action) => _hotelReducer(state, action);
