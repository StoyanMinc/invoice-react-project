import Offer from "../models/Offers.js";

const createOffer = (offerData) => Offer.create(offerData);

export const offerService = {
    createOffer,
}