import { get, post } from "./requester.js";

const BASE_URL = 'http://localhost:5001/automatic-invoices';

const createInvoice = (values) => {
    
    post(`${BASE_URL}/create-invoice`, values);
}; 

// const getAllInvoices = () => get(BASE_URL + '/expenses');

// const getLastInvoices = () => get(BASE_URL);

export const automaticInvoiceService = {
    createInvoice,
    // getAllInvoices,
    // getLastInvoices,
};