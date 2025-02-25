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

clientController.get('/:clientId', async (req, res) => {
    const { clientId } = req.params;
    const client = await clientService.getOneClient(clientId);
    res.json(client);
});

clientController.put('/:clientId', async (req, res) => {
    const { clientId } = req.params;
    const cliendData = req.body;
    const updatedClient = await clientService.updateClient(clientId, cliendData);
    res.json(updatedClient);
});

clientController.delete('/:clientId', async (req, res) => {
    const { clientId } = req.params;
    await clientService.deleteClient(clientId);
    res.json({ message: 'delete true' });
});

export default clientController;

