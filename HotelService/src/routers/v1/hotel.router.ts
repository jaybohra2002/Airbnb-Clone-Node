import express from 'express';
import { hotelController } from '../../controllers/hotel.controller';
import { validateRequestBody } from '../../validators';
import { hotelSchema } from '../../validators/hotel.validator';

const hotelRouter = express.Router();

hotelRouter.post(
    '/',
    validateRequestBody(hotelSchema),
    hotelController.createHotelHandler.bind(hotelController)
);

hotelRouter.get('/:id', hotelController.getHotelByIdHandler.bind(hotelController));

hotelRouter.get('/', hotelController.getAllHotelsHandler.bind(hotelController));

hotelRouter.delete(
    '/:id',
    hotelController.deleteHotelHandler.bind(hotelController)
);
hotelRouter.put(
    '/:id',
    validateRequestBody(hotelSchema),
    hotelController.updateHotelHandler.bind(hotelController)
);

export default hotelRouter;