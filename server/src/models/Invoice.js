import { Schema, model } from "mongoose";

const invoiceShema = new Schema({
    client: String,
    mol: String,
    documentType: String,
    invoiceNumber: Number,
    invoiceDate: String,
    paymentTerm: String,
    paymentType: String,
    bankChoise: String,
    totalPrice: Number,
    products: [],
});

const Invoice = model('Invoice', invoiceShema);

export default Invoice;