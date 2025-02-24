import Invoice from "../models/Invoice.js";

const getAllInvoices = () => Invoice.find().populate('client', 'nameOfClient');

const getLastInvoices = () => Invoice.find().sort({ createdAt: -1 }).limit(10).populate('client', 'nameOfClient');

const getLastInvoice = (documentType) => Invoice.find({ documentType }).sort({ createdAt: -1 }).limit(1).populate('client', 'email');

const getOneInvoice = (_id) => Invoice.findById({ _id }).populate('client');

const getReleasedInvoices = (invoiceDate, mol, totalPrice) => Invoice.find({ invoiceDate, mol, totalPrice }).populate('client', 'email');

const getLastInvoiceForServer = () => Invoice.find().sort({ createdAt: -1 }).limit(1);

const createInvoice = (invoiceData) => {
    invoiceData.totalPrice = Number(invoiceData.totalPrice);
    invoiceData.invoiceNumber = Number(invoiceData.invoiceNumber);
    return Invoice.create(invoiceData)
};

const deleteInvoice = (invoiceId) => Invoice.findByIdAndDelete(invoiceId);

const updateInvoice = (invoiceId, invoiceData) => Invoice.findByIdAndUpdate(invoiceId, invoiceData);

export const invoiceService = {
    getAllInvoices,
    getLastInvoices,
    createInvoice,
    getLastInvoice,
    getOneInvoice,
    getReleasedInvoices,
    getLastInvoiceForServer,
    deleteInvoice,
    updateInvoice
}