import { Router } from 'express';
import { automaticInvoiceService } from '../services/automatic-invoice-service.js';

const automaticInvoiceController = Router();

automaticInvoiceController.get('/', async (req, res) => {
        const invoices = await automaticInvoiceService.getAllInvoices();
        res.json(invoices);
});

automaticInvoiceController.post('/', async (req, res) => {
        const createtInvoice = await automaticInvoiceService.createInvoice(req.body)
        res.json(createtInvoice);
});

automaticInvoiceController.get('/:invoiceId/delete', async (req, res) => {
        const { invoiceId } = req.params;
        await automaticInvoiceService.removeInvoice(invoiceId);
        res.json({ message: "ok" });
});

export default automaticInvoiceController;