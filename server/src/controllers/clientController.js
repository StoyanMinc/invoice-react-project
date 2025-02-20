import { Router } from 'express';
import { clientService } from '../services/clientService.js';

const clientController = Router();

clientController.post('/', async (req, res) => {
    const client = await clientService.createClient(req.body);
    res.json(client);
});

clientController.get('/', async (req, res) => {
    const clients = await clientService.getAllClients();
    res.json(clients);
});

export default clientController;

