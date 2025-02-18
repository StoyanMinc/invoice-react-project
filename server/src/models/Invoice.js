import { Schema, model } from "mongoose";

const invoiceShema = new Schema({
    client: String,
    mol: String,
    documentType: String,
    invoiceNumber: Number,
    invoiceDate: String,
    expireDate: String,
    paymentTerm: String,
    paymentType: String,
    bankChoise: String,
    totalPrice: Number,
    products: [],
}, {timestamps: true});

const Invoice = model('Invoice', invoiceShema);

export default Invoice;