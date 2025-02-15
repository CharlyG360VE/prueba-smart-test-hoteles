export interface IReservationInitialState {
  reservations: IReservation[];
}

export interface IReservation {
  hotelId: string;
  roomId: string;
  dateEntered: Date;
  departureDate: Date;
  guest: IGuest[];
  emergencyContact: IEmergencyContact;
};

export interface IGuest {
  firstName: string;
  lastName: string;
  birthDate: Date;
  gender: number;
  documentType: number;
  documentNumber: string;
  email: string;
  contactNumber: number;
};

export interface IEmergencyContact {
  firstName: string;
  lastName: string;
  contactNumber: number;
}

export interface IFilterProps {
  startDate: Date;
  finishDate: Date;
  cityId: number;
  numberPeople: number;
}
