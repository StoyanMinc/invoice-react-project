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
    const createtInvoice = await invoiceService.createInvoice(req.body)
    res.json(createtInvoice);
});

invoicesController.get('/get-last-invoice', async (req, res) => {
    const lastInvoice = await invoiceService.getLastInvoice('фактура');
    res.json(lastInvoice);
});

invoicesController.get('/get-last-proforma', async (req, res) => {
    const lastInvoice = await invoiceService.getLastInvoice('проформа');
    res.json(lastInvoice);
});

invoicesController.get('/sales/:invoiceId', async (req, res) => {
    const invoiceId = req.params.invoiceId;
    const invoice = await invoiceService.getOneInvoice(invoiceId);
    res.json(invoice);
});

invoicesController.get('/sales/:invoiceId/delete', async (req, res) => {
    console.log("DELETED INVOICE");
    const { invoiceId } = req.params;
    await invoiceService.deleteInvoice(invoiceId);
    res.json({ message: 'ok' });
});

invoicesController.put('/:invoiceId/edit', async (req, res) => {
    const {invoiceId} = req.params;
    const updatedInvoice = await invoiceService.updateInvoice(invoiceId, req.body);
    res.json(updatedInvoice);
});

export default invoicesController;