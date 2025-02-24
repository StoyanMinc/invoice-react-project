import { get, post } from "./requester.js";

const BASE_URL = 'http://localhost:5001/automatic-invoices';

const getAllInvoices = () => get(BASE_URL);

const createInvoice = (values) => {
    values.products = values.products.filter(p => p.name !== '' && p.qty !== '0');
    post(BASE_URL, values);
}; 

const removeInvoice = (invoiceId) => get(`${BASE_URL}/${invoiceId}/delete`);

export const automaticInvoiceService = {
    createInvoice,
    getAllInvoices,
    removeInvoice,
};