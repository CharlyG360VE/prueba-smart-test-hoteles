import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IHotelInitialState } from "../_interfaces/hotel-reducer.interface";

export const getHotelReducerState = createFeatureSelector<IHotelInitialState>('hotelReducer');

export const getHotelList = createSelector(
  getHotelReducerState,
  (state: IHotelInitialState) => state.hotels
);

export const getRoomListByHotelId = (hotelId: number) => createSelector(
  getHotelReducerState,
  (state: IHotelInitialState) => state.hotels.find(hotel => hotel.id === hotelId)?.rooms
);

export const getHotelById = (hotelId: number) => createSelector(
  getHotelReducerState,
  (state: IHotelInitialState) => state.hotels.find(hotel => hotel.id === hotelId)
);

export const getRoomById = (hotelId: number, roomId: number) => createSelector(
  getHotelReducerState,
  (state: IHotelInitialState) => {
    const hotelFind = state.hotels.find(hotel => hotel.id === hotelId);

    return hotelFind ?
      hotelFind.rooms.find(room => room.id === roomId) :
      undefined;
  }
);
