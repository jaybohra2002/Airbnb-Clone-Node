import { createHotelDTO } from "../dto/hotel.dto";
import { hotelRepository } from "../repositories/hotel.repository";

export class HotelService {
    async createHotel(hotelData: createHotelDTO) {
        return hotelRepository.create(hotelData);
    }

    async getHotelById(id: number) {
        return hotelRepository.findById(id);
    }

    async getAllHotels() {
        return hotelRepository.findAll();
    }
    async softDeleteHotel(id: number) {
        return hotelRepository.softDelete(id);
    }
    async updateHotel(id: number, hotelData: createHotelDTO) {
        return hotelRepository.update({ id }, hotelData);
    }
}

// Singleton instance
export const hotelService = new HotelService();