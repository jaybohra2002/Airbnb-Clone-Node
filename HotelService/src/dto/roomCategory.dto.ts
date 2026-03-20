import { RoomType } from "../db/models/room.category";

export interface CreateRoomCategoryDto {
    hotelId: number,
    roomType: RoomType,
    price: number,
    roomCount: number

}