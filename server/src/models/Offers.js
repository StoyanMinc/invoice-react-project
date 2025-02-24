import {Schema, model, Types} from 'mongoose';

const offerSchema = new Schema({
    mol: String,
    offerType: String,
    offerDate: String,
    title: String,
    totalPrice: Number,
    products: [],
    client: {
        type: Types.ObjectId,
        ref: 'User'
    },
}, {timestamps: true});

const Offer = model('Offer', offerSchema);

export default Offer;