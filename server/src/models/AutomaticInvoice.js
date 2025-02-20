import { Schema, model } from "mongoose";

const automaticAutomaticInvoice = new Schema({
    client: String,
    mol: String,
    dateOfAutomatization: String,
    paymentTerm: String,
    paymentType: String,
    bankChoise: String,
    products: [],
}, { timestamps: true });

const AutomaticInvoice = model('AutomaticInvoice', automaticAutomaticInvoice);

export default AutomaticInvoice;