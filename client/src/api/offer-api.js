import { get, post } from "./requester.js";

const BASE_URL = 'http://localhost:5001/offers';

const createOffer = (offerData) => {
    offerData.products = offerData.products.filter(p => p.name !== '' && p.qty !== '0');
    post(BASE_URL, offerData)
};

export const offerService = {
    createOffer,
}