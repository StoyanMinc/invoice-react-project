import {Router} from 'express';
import { offerService } from '../services/offer-service.js';

const offerController = Router();

offerController.post('/', async (req, res) => {
    const offerData = req.body;
    const createdOffer = await offerService.createOffer(offerData);
    res.json(createdOffer);
});

export default offerController;