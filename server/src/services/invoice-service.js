import Invoice from "../models/Invoice.js";

const getAllInvoices = () => Invoice.find();

const getLastInvoices = () => Invoice.find().sort({ createdAt: -1 }).limit(10);

const getLastInvoice = (documentType) => Invoice.find({ documentType }).sort({ createdAt: -1 }).limit(1);

const getOneInvoice = (_id) => Invoice.findById({ _id });

const createInvoice = (invoiceData) => {
    invoiceData.totalPrice = Number(invoiceData.totalPrice);
    invoiceData.invoiceNumber = Number(invoiceData.invoiceNumber);
    return Invoice.create(invoiceData)
};


export const invoiceService = {
    getAllInvoices,
    getLastInvoices,
    createInvoice,
    getLastInvoice,
    getOneInvoice
}