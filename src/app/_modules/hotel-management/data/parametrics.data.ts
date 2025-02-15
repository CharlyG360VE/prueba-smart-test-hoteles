import { IRoomType } from "@/_interfaces/common.interface";

export const ROOM_TYPE_LIST: IRoomType[] = [
  { id: 1, name: "Habitación individual", maxguest: 1 },
  { id: 2, name: "Habitación doble", maxguest: 2 },
  { id: 3, name: "Habitación triple", maxguest: 3 },
  { id: 4, name: "Habitación cuádruple", maxguest: 4 },
  { id: 5, name: "Habitación con balcón o terraza", maxguest: 3 },
  { id: 6, name: "Habitación con vista", maxguest: 2 }
]