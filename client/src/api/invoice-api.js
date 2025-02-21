import { del, get, post } from "./requester.js";

const BASE_URL = 'http://localhost:5001/invoices';

const getLastInvoice =  () => get(BASE_URL + '/get-last-invoice');

const getLastProforma = () => get(BASE_URL + '/get-last-proforma');

const createInvoice = (values) => {
    values.products = values.products.filter(p => p.name !== '' && p.qty !== '0');
    post(`${BASE_URL}/create-invoice`, values);
}; 

const getAllInvoices = () => get(BASE_URL + '/sales');

const getLatestInvoices = () => get(BASE_URL);

const getOneInvoice = (invoiceId) => get(`${BASE_URL}/sales/${invoiceId}`);

export const outInvoicecService = {
    createInvoice,
    getAllInvoices,
    getLatestInvoices,
    getLastInvoice,
    getLastProforma,
    getOneInvoice,
};