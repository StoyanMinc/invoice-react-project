import { Schema, model, Types } from "mongoose";

const invoiceShema = new Schema({
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
    client: {
        type: Types.ObjectId,
        ref: 'Client'
    }
}, {timestamps: true});

const Invoice = model('Invoice', invoiceShema);

export default Invoice;