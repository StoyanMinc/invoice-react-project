import { Schema, model } from "mongoose";

const warehouseSchema = new Schema({
    name: String,
    type: String,
    productTypeHandling: String,
    lastStorageCode: Number

}, { timestamps: true });

const Warehouse = model('Warehouse', warehouseSchema);

export default Warehouse;