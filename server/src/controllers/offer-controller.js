import { Router } from 'express';
import { offerService } from '../services/offer-service.js';

const offerController = Router();

offerController.get('/', async (req, res) => {
    const offers = await offerService.getAllOffers();
    res.json(offers);
});

offerController.post('/', async (req, res) => {
    const offerData = req.body;
    const createdOffer = await offerService.createOffer(offerData);
    res.json(createdOffer);
});

offerController.get('/:offerId', async (req, res) => {
    const { offerId } = req.params;
    const offer = await offerService.getOneOffer(offerId);
    res.json(offer);
});

offerController.put('/:offerId', async (req, res) => {
    const { offerId } = req.params;
    const offerData = req.body;
    const editedOffer = await offerService.editOffer(offerId, offerData);
    res.json(editedOffer);
});

offerController.delete('/:offerId/delete', async (req, res) => {
    const { offerId } = req.params;
    const deletedOffer = await offerService.deleteOffer(offerId);
    res.json(deletedOffer);
});

export default offerController;