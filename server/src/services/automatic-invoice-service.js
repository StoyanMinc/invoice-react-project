import AutomaticInvoice from "../models/AutomaticInvoice.js";

const getAllInvoices = () => AutomaticInvoice.find();

const createInvoice = (invoiceData) => AutomaticInvoice.create(invoiceData);

export  const automaticInvoiceService = {
    createInvoice,
    getAllInvoices,
}