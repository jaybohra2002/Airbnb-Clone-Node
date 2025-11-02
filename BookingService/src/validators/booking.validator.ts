import { z } from "zod";

export const createBookingSchema=z.object({
    userId: z.number({message: "User Id must be present"}),
    hotelId: z.number({message: "Hotel must be present"}),
    totalGuests:z.number({message: "Total Guests must be present"}).min(1,{message: "Total guests must be minimum of 1"}),
    bookingAmount: z.number({message: "Booking Id must be present"}).min(1,{message: "Total guests must be minimum of 1"})

});