import { Router } from "express";
import { warehouseService } from "../services/warehouse-service.js";

const warehouseController = Router();

warehouseController.get('/', async (req, res) => {
    try {
        const result = await warehouseService.getAll();
        res.json(result);
    } catch (error) {
        res.status(400).json({ error });
    }
});

warehouseController.post('/', async (req, res) => {
    try {
        const result = await warehouseService.createWarehouse(req.body);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error });
    }
});

export default warehouseController;