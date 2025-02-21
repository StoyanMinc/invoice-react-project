import Invoice from "../models/Invoice.js";

const getAllInvoices = () => Invoice.find().populate('client', 'nameOfClient');

const getLastInvoices = () => Invoice.find().sort({ createdAt: -1 }).limit(10).populate('client', 'nameOfClient');

const getLastInvoice = (documentType) => Invoice.find({ documentType }).sort({ createdAt: -1 }).limit(1);

const getOneInvoice = (_id) => Invoice.findById({ _id }).populate('client');

const getReleasedInvoices = (invoiceDate, mol, totalPrice) => Invoice.find({ invoiceDate, mol, totalPrice });

const getLastInvoiceForServer = () => Invoice.find().sort({ createdAt: -1 }).limit(1);

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
    getOneInvoice,
    getReleasedInvoices,
    getLastInvoiceForServer
}