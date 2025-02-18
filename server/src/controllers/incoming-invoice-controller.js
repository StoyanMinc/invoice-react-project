import { Router } from "express";
import { incomingInvoiceService } from "../services/incoming-invoice-service.js";
import fs from 'fs';
import path from 'path';

const incomingInvoiceController  = Router();

incomingInvoiceController.get('/', async (req, res) => {
    const invoices = await incomingInvoiceService.getLastInvoices();
    res.json(invoices);
});

incomingInvoiceController.get('/expenses', async (req, res) => {
    const invoices = await incomingInvoiceService.getAllInvoices();
    res.json(invoices);
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

export default incomingInvoiceController;