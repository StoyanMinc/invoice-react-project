import AutomaticInvoice from "../models/AutomaticInvoice.js";

const createInvoice = (invoiceData) => AutomaticInvoice.create(invoiceData);

export  const automaticInvoiceService = {
    createInvoice,

}