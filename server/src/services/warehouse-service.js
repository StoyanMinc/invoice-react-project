import Warehouse from "../models/Warehouse.js";

const getAll = () => Warehouse.find();

const createWarehouse = (warehouseData) => Warehouse.create(warehouseData);

export const warehouseService = {
    getAll,
    createWarehouse,

}