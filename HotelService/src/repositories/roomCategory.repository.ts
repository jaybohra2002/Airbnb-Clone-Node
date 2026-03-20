import BaseRepository from "./base.repository";
import RoomCategory from "../db/models/room.category";
import { NotFoundError } from "../utils/errors/app.error";

class RoomCategoryRepository extends BaseRepository<RoomCategory> {

    constructor() {
        super(RoomCategory);

    }
    async getRoomCategoryByHotelId(hotelId: number) {
        const roomCategory = await this.model.findAll({
            where: {
                hotelId: hotelId,
                deletedAt: null
            }
        });
        if (roomCategory.length === 0) {
            throw new NotFoundError(`Romcategory for hotel with id ${hotelId} not found`)
        }
        return roomCategory;
    }

}
export default RoomCategoryRepository;