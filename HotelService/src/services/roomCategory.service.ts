import { CreateRoomCategoryDto } from "../dto/roomCategory.dto";
import RoomCategoryRepository from "../repositories/roomCategory.repository";
import { HotelRepository } from "../repositories/hotel.repository";
const roomCategoryRepository = new RoomCategoryRepository();
const hotelRepository = new HotelRepository();
export async function createRoomCategory(roomCategoryDto: CreateRoomCategoryDto) {
    return await roomCategoryRepository.create(roomCategoryDto);
}
export async function getRoomCategoryById(id: number) {
    return await roomCategoryRepository.findById(id);
}
export async function getAllRoomCategories() {
    return await roomCategoryRepository.findAll();
}
export async function getRoomCategoryByHotelId(hotelId: number) {
    const hotel = await hotelRepository.findById(hotelId);
    if (!hotel) {
        throw new Error("Hotel not found");
    }
    return await roomCategoryRepository.getRoomCategoryByHotelId(hotelId);
}
export async function deleteRoomCategory(id: number) {
    const roomCategory = await roomCategoryRepository.findById(id);
    if (!roomCategory) {
        throw new Error("Room category not found");
    }
    return await roomCategoryRepository.delete({ id });
}