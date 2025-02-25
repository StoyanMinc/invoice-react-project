import { get, post, del, put } from "./requester.js";

const BASE_URL = 'http://localhost:5001/offers';

const createOffer = (offerData) => {
    offerData.products = offerData.products.filter(p => p.name !== '' && p.qty !== '0');
    post(BASE_URL, offerData)
};

const getAllOffers = () => get(BASE_URL);

const getOneOffer = (offerId) => get(`${BASE_URL}/${offerId}`);

const deleteOffer = (offerId) => del(`${BASE_URL}/${offerId}/delete`);

const editOffer = (offerId, offerData) => {
    offerData.products = offerData.products.filter(p => p.name !== '' && p.qty !== '0');
    put(`${BASE_URL}/${offerId}`, offerData)
};

export const offerService = {
    createOffer,
    getAllOffers,
    deleteOffer,
    getOneOffer,
    editOffer,
    
}