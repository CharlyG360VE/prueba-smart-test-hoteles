import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IFilterProps, IReservationInitialState } from "../_interfaces/reservation-reducer.interface";
import { getHotelList, getHotelListByCityId } from "./hotel-reducer.selector";
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

export const getHotelAvailableFilter = (props: IFilterProps) => createSelector(
  getAvailableReservations(props.startDate, props.finishDate),
  getHotelListByCityId(props.cityId),
  (reservationFilter, hotelList) => {
    const hotelTempList: IHotel[] = [];

    if (reservationFilter.length > 0) {
      hotelList.forEach(hotel => {
        const hotelReservation = reservationFilter.filter(reservation => reservation.hotelId === hotel.id);
        let hotelRooms: IRoom[] = [];

        if (hotelReservation.length > 0) {
          hotel.rooms.forEach(room => {
            const hotelReservationFind = hotelReservation.find(hr => hr.roomId === room.id);

            if (!hotelReservationFind && room.active && props.numberPeople <= room.maxguest)
              hotelRooms.push(room);
          })
        } else {
          const roomFilter = hotel.rooms.filter(room => room.active && props.numberPeople <= room.maxguest);

          if (hotel.active && roomFilter.length > 0)
            hotelTempList.push(
              {
                ...hotel,
                rooms: roomFilter
              }
            );
        }

        console.log(hotel, hotelRooms.filter(room => room.active && props.numberPeople <= room.maxguest))

        if (hotelRooms.length > 0 && hotel.active)
          hotelTempList.push(
            {
              ...hotel,
              rooms: hotelRooms.filter(room => room.active && props.numberPeople <= room.maxguest)
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
              rooms: hotel.rooms.filter(room => room.active && props.numberPeople <= room.maxguest)
            }
          ))
          .filter(hotel => hotel.rooms.length > 0)
      ];
  }
);
