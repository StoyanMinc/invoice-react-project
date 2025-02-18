import { Schema, model } from "mongoose";

const IncomingInvoiceSchema = new Schema({
    supplier: String,
    invoiceNumber: Number,
    invoiceDate: String,
    expireDate: String,
    comment: String,
    paymentTerm: String,
    paymentType: String,
    sumForPay: Number,
    currency: String,
    invoiceFile: String,
}, {timestamps: true});

const IncomingInvoice = model('IncomingInvoice', IncomingInvoiceSchema);

export default IncomingInvoice;