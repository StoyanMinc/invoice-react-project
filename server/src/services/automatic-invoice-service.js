import AutomaticInvoice from "../models/AutomaticInvoice.js";

const getAllInvoices = () => AutomaticInvoice.find().populate('client');

const createInvoice = (invoiceData) => AutomaticInvoice.create(invoiceData);

const removeInvoice = (invoiceId) => AutomaticInvoice.findByIdAndDelete(invoiceId);

export  const automaticInvoiceService = {
    createInvoice,
    getAllInvoices,
    removeInvoice,
}