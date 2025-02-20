import { Router } from 'express';
import { automaticInvoiceService } from '../services/automatic-invoice-service.js';

const automaticInvoiceController = Router();

automaticInvoiceController.get('/automatic-invoices', async (req, res) => {
        const invoices = await automaticInvoiceService.getAllInvoices();
        res.json(invoices);
});

automaticInvoiceController.post('/create-invoice', async (req, res) => {
        const createtInvoice = await automaticInvoiceService.createInvoice(req.body)
        res.json(createtInvoice);
});

export default automaticInvoiceController;