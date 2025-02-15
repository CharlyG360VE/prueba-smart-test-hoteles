export interface IHotelInitialState {
  hotels: IHotel[];
};

export interface IHotel {
  id: string;
  name: string;
  active: boolean;
  cityId: number;
  cityName: string;
  rooms: IRoom[];
  viewRooms: boolean;
};

export interface IRoom {
  id: string;
  roomType: number;
  roomTypeName: string;
  maxguest: number;
  price: number;
  tax: number;
  priceWithTax: number;
  active: boolean;
};
