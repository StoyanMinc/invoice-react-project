import Offer from "../models/Offers.js";

const createOffer = (offerData) => Offer.create(offerData);

const getAllOffers = () => Offer.find({}).populate('client', 'nameOfClient');

const getOneOffer = (offerId) => Offer.findById(offerId).populate('client', ['nameOfClient', 'mol']);

const editOffer = (offerId, offerData) => Offer.findByIdAndUpdate(offerId, offerData);

const deleteOffer = (offerId) => Offer.findByIdAndDelete(offerId);

export const offerService = {
    createOffer,
    getAllOffers,
    deleteOffer,
    getOneOffer,
    editOffer,

}