import { Router } from "express";
import { incomingInvoiceService } from "../services/incoming-invoice-service.js";
import fs from 'fs';
import path from 'path';

const incomingInvoiceController = Router();

incomingInvoiceController.get('/', async (req, res) => {
    const invoices = await incomingInvoiceService.getLastInvoices();
    res.json(invoices);
});

incomingInvoiceController.get('/expenses', async (req, res) => {
    const invoices = await incomingInvoiceService.getAllInvoices();
    res.json(invoices);
});

incomingInvoiceController.get('/expenses/:invoiceId', async (req, res) => {
    const { invoiceId } = req.params;
    try {
        const invoiceData = await incomingInvoiceService.getOneInvoice(invoiceId);
        console.log(invoiceData)
        res.json(invoiceData);

    } catch (error) {
        res.json({ error });
    }
});

incomingInvoiceController.post('/create-invoice', async (req, res) => {
    const invoiceData = req.body;

    if (invoiceData.invoiceFileHandler != '') {
        // Decode Base64 and save the file
        const buffer = Buffer.from(invoiceData.invoiceFileHandler, "base64");
        let filePath = `uploads/${Date.now()}-invoice.pdf`; // Adjust extension as needed
        fs.writeFileSync(path.join(import.meta.dirname, "..", filePath), buffer);
        invoiceData.invoiceFile = filePath;
    }

    const createtInvoice = await incomingInvoiceService.createInvoice(invoiceData);
    res.json(createtInvoice);
});

incomingInvoiceController.put('/:invoiceId/edit', async (req, res) => {
    const { invoiceId } = req.params;
    try {
        const editedInvoice = await incomingInvoiceService.updateInvoice(invoiceId, req.body);
        console.log(editedInvoice)
        res.json(editedInvoice)
    } catch (error) {
        console.log(error)
        res.status(400).json({ error });
    }

});

incomingInvoiceController.delete('/expenses/:invoiceId/delete', async (req, res) => {
    const { invoiceId } = req.params;
    try {
        const invoice = await incomingInvoiceService.getOneInvoice(invoiceId);
        console.log(invoice)
        const absolutePath = path.resolve('src/' + invoice.invoiceFile);
        fs.unlink(absolutePath, (err) => { console.log(err); });
        await incomingInvoiceService.deleteInvoice(invoiceId);
        res.json({ message: 'ok' });

    } catch (error) {
        res.status(400).json({ error });
    }
});

export default incomingInvoiceController;