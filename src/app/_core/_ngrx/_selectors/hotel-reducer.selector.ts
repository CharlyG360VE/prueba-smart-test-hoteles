import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IHotelInitialState } from "../_interfaces/hotel-reducer.interface";

export const getHotelReducerState = createFeatureSelector<IHotelInitialState>('hotelReducer');

export const getHotelList = createSelector(
  getHotelReducerState,
  (state: IHotelInitialState) => state.hotels
);

export const getHotelListByCityId = (cityId: number) => createSelector(
  getHotelReducerState,
  (state: IHotelInitialState) => state.hotels.filter(hotel => hotel.cityId === cityId )
)

export const getRoomListByHotelId = (hotelId: string) => createSelector(
  getHotelReducerState,
  (state: IHotelInitialState) => state.hotels.find(hotel => hotel.id === hotelId)?.rooms
);

export const getHotelById = (hotelId: string) => createSelector(
  getHotelReducerState,
  (state: IHotelInitialState) => state.hotels.find(hotel => hotel.id === hotelId)
);

export const getRoomById = (hotelId: string, roomId: string) => createSelector(
  getHotelReducerState,
  (state: IHotelInitialState) => {
    const hotelFind = state.hotels.find(hotel => hotel.id === hotelId);

    return hotelFind ?
      hotelFind.rooms.find(room => room.id === roomId) :
      undefined;
  }
);
