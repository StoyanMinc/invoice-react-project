import AutomaticInvoice from "../models/AutomaticInvoice.js";

const getAllInvoices = () => AutomaticInvoice.find().populate('client');

const createInvoice = (invoiceData) => AutomaticInvoice.create(invoiceData);

export  const automaticInvoiceService = {
    createInvoice,
    getAllInvoices,
}