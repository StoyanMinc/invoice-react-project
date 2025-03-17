import { Schema, model } from "mongoose";

const clientSchema = new Schema({
    typeOfClient: String,
    nameOfClient: String,
    mol: String,
    eikEgn: String,
    identN: String,
    address: String,
    city: String,
    country: String,
    email: String,
    phoneNumber: String,
    webSite: String
}, {timestamps: true});

const Client = model('Client', clientSchema);

export default Client;