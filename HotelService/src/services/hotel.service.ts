import { createHotelDTO } from "../dto/hotel.dto";
import { hotelRepository } from "../repositories/hotel.repository";

export class HotelService {
    async createHotel(hotelData: createHotelDTO) {
        return hotelRepository.createHotel(hotelData);
    }

    async getHotelById(id: number) {
        return hotelRepository.getHotelById(id);
    }

    async getAllHotels() {
        return hotelRepository.getAllHotels();
    }
    async softDeleteHotel(id: number) {
        return hotelRepository.softDeleteHotel(id);
    }
    async updateHotel(id: number, hotelData: createHotelDTO) {
        return hotelRepository.updateHotel(id, hotelData);
    }
}

// Singleton instance
export const hotelService = new HotelService();