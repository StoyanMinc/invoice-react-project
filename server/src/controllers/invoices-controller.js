import { Router } from 'express';
import { invoiceService } from '../services/invoice-service.js';

const invoicesController = Router();

invoicesController.get('/', async (req, res) => {
    const invoices = await invoiceService.getLastInvoices();
    res.json(invoices);
});

invoicesController.get('/sales', async (req, res) => {
    const invoices = await invoiceService.getAllInvoices();
    res.json(invoices);
});

invoicesController.post('/create-invoice', async (req, res) => {
    console.log(req.body)
    const createtInvoice = await invoiceService.createInvoice(req.body)
    res.json(createtInvoice);
});

export default invoicesController;