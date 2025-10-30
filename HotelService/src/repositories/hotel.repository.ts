import logger from "../config/logger.config";
import Hotel from "../db/models/hotel";
import { createHotelDTO } from "../dto/hotel.dto";
import { NotFoundError } from "../utils/errors/app.error";


export class HotelRepository {
    async createHotel(hotelData: createHotelDTO) {
        const hotel = await Hotel.create({
            name: hotelData.name,
            address: hotelData.address,
            location: hotelData.location,
            rating: hotelData.rating,
            ratingCount: hotelData.ratingCount,
        });
        logger.info(`Hotel created: ${hotel.id}`);
        return hotel;
    }

    async getHotelById(id: number) {
        const hotel = await Hotel.findByPk(id);
        if (!hotel) {
            logger.error(`Hotel not found: ${id}`);
            throw new NotFoundError(`Hotel with id ${id} not found`);
        }
        logger.info(`Hotel found: ${hotel.id}`);
        return hotel;
    }

    async getAllHotels() {
        const hotels = await Hotel.findAll({
            where: {
                deletedAt: null
            }       
        });
        if (hotels.length === 0) {
            logger.error(`No hotels found`);
            throw new NotFoundError(`No hotels found`);
        }
        logger.info(`Hotels found: ${hotels.length}`);
        return hotels;
    }
    async softDeleteHotel(id: number) {
        const hotel=await Hotel.findByPk(id);
        if (!hotel) {
            logger.error(`Hotel not found: ${id}`);
            throw new NotFoundError(`Hotel with id ${id} not found`);
        }
        hotel.deletedAt = new Date();
        await hotel.save();
        logger.info(`Hotel soft deleted: ${hotel.id}`);
        return true; // Induicating successful soft delete
    }
    async updateHotel(id: number, hotelData: createHotelDTO) {
        const hotel = await Hotel.findByPk(id);
        if (!hotel) {
            logger.error(`Hotel not found: ${id}`);
            throw new NotFoundError(`Hotel with id ${id} not found`);
        }
        hotel.name = hotelData.name || hotel.name;
        hotel.address = hotelData.address || hotel.address;
        hotel.location = hotelData.location || hotel.location;
        hotel.rating = hotelData.rating || hotel.rating;
        hotel.ratingCount = hotelData.ratingCount || hotel.ratingCount;
        hotel.deletedAt = hotelData.deletedAt || hotel.deletedAt; // Handle deletedAt if provided
        await hotel.save();
        logger.info(`Hotel updated: ${hotel.id}`);
        return hotel;
    }
}


export const hotelRepository = new HotelRepository();