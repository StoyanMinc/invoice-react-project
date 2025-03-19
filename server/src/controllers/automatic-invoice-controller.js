import { Router } from 'express';
import { automaticInvoiceService } from '../services/automatic-invoice-service.js';

const automaticInvoiceController = Router();

automaticInvoiceController.get('/', async (req, res) => {
    const invoices = await automaticInvoiceService.getAllInvoices();
    res.json(invoices);
});

automaticInvoiceController.get('/:invoiceId', async (req, res) => {
    const { invoiceId } = req.params;
    try {
        const invoiceData = await automaticInvoiceService.getOneInvoice(invoiceId);
        res.json(invoiceData);
    } catch (error) {
        res.status(400).json({ error: 'Cannot get invoiceData' });
    }
});

automaticInvoiceController.post('/', async (req, res) => {
    const createtInvoice = await automaticInvoiceService.createInvoice(req.body)
    res.json(createtInvoice);
});

automaticInvoiceController.put('/:invoiceId/edit', async (req, res) => {
    const { invoiceId } = req.params;
    try {
        const editedInvoice = await automaticInvoiceService.editInvoice(invoiceId, req.body);
        res.json(editedInvoice);
    } catch (error) {
        res.status(400).res.json({ error: 'Cannot edit invoice' });
    }
});

automaticInvoiceController.get('/:invoiceId/delete', async (req, res) => {
    const { invoiceId } = req.params;
    await automaticInvoiceService.removeInvoice(invoiceId);
    res.json({ message: "ok" });
});

export default automaticInvoiceController;