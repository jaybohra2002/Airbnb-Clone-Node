import { Request, Response } from "express";
import { createBookingService } from "../services/booking.service";

export const createBookingHandler=async function (req:Request, res:Response){
    const booking = await createBookingService(req.body);
    res.status(201).json({
        bookingId:booking.bookingId,
        idempotencyKey: booking.idempotencyKey
    });
}
