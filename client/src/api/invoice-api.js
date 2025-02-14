import { get, post } from "./requester.js";

const BASE_URL = 'http://localhost:5001';

const createInvoice = (values) => {
    values.products = values.products.filter(p => p.name !== '' && p.qty !== '0');
    post(`${BASE_URL}/create-invoice`, values);
}; 

const getAllInvoices = () => get(BASE_URL);

export const outInvoicecService = {
    createInvoice,
    getAllInvoices,
};