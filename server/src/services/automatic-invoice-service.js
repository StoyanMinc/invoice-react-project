import AutomaticInvoice from "../models/AutomaticInvoice.js";

const getAllInvoices = () => AutomaticInvoice.find().populate('client');

const getOneInvoice = (_id) => AutomaticInvoice.findById({ _id });

const createInvoice = (invoiceData) => AutomaticInvoice.create(invoiceData);

const editInvoice = (invoiceId, invoiceData) => AutomaticInvoice.findByIdAndUpdate(invoiceId, invoiceData);

const removeInvoice = (invoiceId) => AutomaticInvoice.findByIdAndDelete(invoiceId);

export const automaticInvoiceService = {
    getAllInvoices,
    getOneInvoice,
    createInvoice,
    editInvoice,
    removeInvoice,
}