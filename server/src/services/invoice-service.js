import Invoice from "../models/Invoice.js";

export const getAllInvoices = () => Invoice.find();

export const createInvoice = (invoiceData) => {

    invoiceData.totalPrice = Number(invoiceData.totalPrice);
    invoiceData.invoiceNumber = Number(invoiceData.invoiceNumber);
   return Invoice.create(invoiceData)
};