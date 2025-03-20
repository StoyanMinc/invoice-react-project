import { Schema, model, Types } from "mongoose";

const partSchema = new Schema({
    name: String,
    qty: Number,
    storageType: String,
    priceIn: Number,
    priceOut: Number,
    number: Number,
    subType: String,
    storageId: {
        type: Types.ObjectId,
        ref: 'Warehouse'
    }
}, { timestamps: true });

const Part = model('Part', partSchema);

export default Part;