export interface IHotelInitialState {
  hotels: IHotel[];
};

export interface IHotel {
  id: number;
  name: string;
  active: boolean;
  rooms: IRoom[];
  viewRooms: boolean;
};

export interface IRoom {
  id: number;
  roomType: number;
  roomTypeName: string;
  price: number;
  tax: number;
  active: boolean;
};
