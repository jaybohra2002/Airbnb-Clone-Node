import { confirmBooking, createBooking, createIdempotencyKey, finalizeIdempotencyKey, getIdempotencyKey } from "../repositories/booking.repository";
import { BadRequestError, NotFoundError } from "../utils/errors/app.error";
import { generateIdempotencyKey } from "../utils/generateIdempotencyKey";

export async function createBookingService(
    userId:number,
    hotelId:number,
    totlaGuests: number,
    bookingAmount: number
){
    const booking = await createBooking({
        userId,
        hotelId,
        totalGuests:totlaGuests,
        bookingAmount: bookingAmount
    });

    const idempotencyKey=generateIdempotencyKey();

    await createIdempotencyKey(idempotencyKey,booking.id);
    return {
        bookingId: booking.id,
        idempotencyKey: idempotencyKey
    };
}

export async function finalizeBookingService(idempotencyKey:string){
    const idempotencyKeyData=await getIdempotencyKey(idempotencyKey);

    if(!idempotencyKeyData){
        throw new NotFoundError('IdempotencyKey not found');
    }

    if(idempotencyKeyData.finalized){
        throw new BadRequestError(' Idempotency key already finalized');

    }

    const booking=await confirmBooking(idempotencyKeyData.bookingId);
    await finalizeIdempotencyKey(idempotencyKey);

    return booking;
    
}