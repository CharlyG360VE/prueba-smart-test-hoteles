import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IReservationInitialState } from "../_interfaces/reservation-reducer.interface";
import { getHotelList } from "./hotel-reducer.selector";
import { IHotel, IRoom } from "../_interfaces/hotel-reducer.interface";
import { DOCUMENT_TYPES_LIST, GENDER_LIST } from "@/reservation-management/data/parametric.data";

export const getReservationReducerState = createFeatureSelector<IReservationInitialState>('reservationReducer');

export const getAllReservations = createSelector(
  getReservationReducerState,
  getHotelList,
  (state, hotelList) => {
    return state.reservations.map(reservation => {
      const hotelFind = hotelList.find(hotel => hotel.id === reservation.hotelId);
      const roomFind = hotelFind?.rooms.find(room => room.id === reservation.roomId);

      return {
        ...reservation,
        guest: reservation.guest.map(guest => {
          const documentTypeFind = DOCUMENT_TYPES_LIST.find(dt => dt.id === guest.documentType);
          const genderFind = GENDER_LIST.find(gl => gl.id === guest.gender);

          return {
            ...guest,
            documentTypeName: documentTypeFind?.name,
            genderName: genderFind?.name
          }
        }),
        hotelData: hotelFind,
        roomData: roomFind
      }
    });
  }
);

export const getAvailableReservations = (startDate: Date, finishDate: Date) => createSelector(
  getReservationReducerState,
  (state) => {
    return state.reservations.filter(reservation =>
      (new Date(startDate) <= new Date(reservation.departureDate) && new Date(finishDate) >= new Date(reservation.dateEntered))
    );
  }
);

export const getHotelAvailableFilter = (startDate: Date, finishDate: Date) => createSelector(
  getAvailableReservations(startDate, finishDate),
  getHotelList,
  (reservationFilter, hotelList) => {
    const hotelTempList: IHotel[] = [];

    if (reservationFilter.length > 0) {
      hotelList.forEach(hotel => {
        const hotelReservation = reservationFilter.filter(reservation => reservation.hotelId === hotel.id);
        let hotelRooms: IRoom[] = [];

        if (hotelReservation.length > 0) {
          hotel.rooms.forEach(room => {
            const hotelReservationFind = hotelReservation.find(hr => hr.roomId === room.id);

            if (!hotelReservationFind && room.active)
              hotelRooms.push(room);
          })
        } else {
          if (hotel.active)
            hotelTempList.push(hotel);
        }

        if (hotelRooms.length > 0 && hotel.active)
          hotelTempList.push(
            {
              ...hotel,
              rooms: hotelRooms
            }
          );
      })
    }

    return reservationFilter.length > 0 ?
      hotelTempList :
      [
        ...hotelList.filter(hotel => hotel.active)
            .map(hotel => (
              {
                ...hotel,
                rooms: hotel.rooms.filter(room => room.active)
              }
            ))
      ];
  }
);
