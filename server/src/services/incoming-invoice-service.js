import IncomingInvoice from "../models/IncomingInvoice.js";

const getAllInvoices = () => IncomingInvoice.find();

const getLastInvoices = () => IncomingInvoice.find().sort({ createdAt: -1 }).limit(10);

const createInvoice = (invoiceData) => {

    return IncomingInvoice.create(invoiceData)
};

export const incomingInvoiceService = {
    getAllInvoices,
    getLastInvoices,
    createInvoice
}