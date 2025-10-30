export type createHotelDTO = {
    name: string;
    address: string;
    location: string;
    rating?: number;
    ratingCount?: number;
    deletedAt?: Date | null; // Optional field for soft deletion
}