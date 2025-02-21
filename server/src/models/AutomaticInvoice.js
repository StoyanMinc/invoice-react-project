import { Schema, model, Types } from "mongoose";

const automaticAutomaticInvoice = new Schema({
    mol: String,
    dateOfAutomatization: String,
    paymentTerm: String,
    paymentType: String,
    bankChoise: String,
    totalPrice: Number,
    products: [],
    client: {
        type: Types.ObjectId,
        ref: 'Client'
    }
}, { timestamps: true });

const AutomaticInvoice = model('AutomaticInvoice', automaticAutomaticInvoice);

export default AutomaticInvoice;