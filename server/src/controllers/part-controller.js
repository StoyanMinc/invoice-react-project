import { Router } from "express";
import { partService } from "../services/part-service.js";

const partController = Router();

partController.get('/', async (req, res) => {
    try {
        const parts = await partService.getAll();
        res.json(parts);
    } catch (error) {
        res.status(400).res.json({ error });
    }
});

partController.get('/:storageId/storage', async (req, res) => {
    const { storageId } = req.params;
    try {
        const result = await partService.getSpecificOption(storageId);
        res.json(result);
    } catch (error) {
        res.status(400).res.json({ error });
    }
});

partController.get('/:partId', async (req, res) => {
    const { partId } = req.params;

    try {
        const result = await partService.getOnePart(partId);
        res.json(result);
    } catch (error) {
        res.status(400).res.json({ error });
    }
});

partController.put('/:partId', async (req, res) => {
    const { partId } = req.params;
    try {
        const result = await partService.editPart(partId, req.body);
        res.json(result);
    } catch (error) {
        res.status(400).res.json({ error });
    }
});

partController.delete('/:partId', async (req, res) => {
    const { partId } = req.params;
    try {
        await partService.deletePart(partId);
        res.json({ message: 'successfuly delete' });
    } catch (error) {
        res.status(400).res.json({ error });
    }
});

partController.post('/', async (req, res) => {
    try {
        const partData = await partService.createPart(req.body);
        res.json(partData);
    } catch (error) {
        res.status(400).res.json({ error });
    }
});

export default partController;