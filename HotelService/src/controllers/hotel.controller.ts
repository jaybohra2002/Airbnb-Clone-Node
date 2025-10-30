import { Request, Response, NextFunction } from "express";
import { hotelService } from "../services/hotel.service";
import { StatusCodes } from "http-status-codes";

export class HotelController {
    async createHotelHandler(req: Request, res: Response, next: NextFunction) {
        try {
            const hotelResponse = await hotelService.createHotel(req.body);
            res.status(StatusCodes.CREATED).json({
                message: "Hotel created successfully",
                data: hotelResponse,
                success: true,
            });
        } catch (err) {
            next(err);
        }
    }

    async getHotelByIdHandler(req: Request, res: Response, next: NextFunction) {
        try {
            const hotelResponse = await hotelService.getHotelById(Number(req.params.id));
            
            res.status(StatusCodes.OK).json({
                message: "Hotel found successfully",
                data: hotelResponse,
                success: true,
            });
        } catch (err) {
            next(err);
        }
    }

    async getAllHotelsHandler(req: Request, res: Response, next: NextFunction) {
        try {
            debugger;
            const hotelsResponse = await hotelService.getAllHotels();
            res.status(StatusCodes.OK).json({
                message: "Hotels found successfully",
                data: hotelsResponse,
                success: true,
            });
        } catch (err) {
            next(err);
        }
    }

    
    async deleteHotelHandler(req: Request, res: Response, next: NextFunction) {
        try {
            const hotelId = Number(req.params.id);
            const hotelResponse=await hotelService.softDeleteHotel(hotelId);
            res.status(StatusCodes.OK).json({
                message: "Hotel soft deleted successfully",
                success: true,
                data:hotelResponse
            });
        } catch (err) {
            next(err);
        }
    }

    async updateHotelHandler(req: Request, res: Response, next: NextFunction) {
        try {
            const hotelId = Number(req.params.id);
            const hotelData = req.body;
            const updatedHotel = await hotelService.updateHotel(hotelId, hotelData);
            res.status(StatusCodes.OK).json({
                message: "Hotel updated successfully",
                data: updatedHotel,
                success: true,
            });
        } catch (err) {
            next(err);
        }
    }
}

// Singleton instance
export const hotelController = new HotelController();