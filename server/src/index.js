import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { invoiceService } from './services/invoice-service.js';
const app = express();

try {
    await mongoose.connect('mongodb://localhost:27017/axion-angular-app');
    console.log('DB connected!');

} catch (error) {
    console.log(error.message);
}

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    const invoices = await invoiceService.getLastInvoices();
    res.json(invoices);
})

app.get('/sales', async (req, res) => {
    const invoices = await invoiceService.getAllInvoices();
    res.json(invoices);
})
app.post('/create-invoice', async (req, res) => {
    console.log(req.body)
    const createtInvoice = await invoiceService.createInvoice(req.body)
    res.json(createtInvoice);
})

app.get('/test', (req, res) => {
    res.json({ message: 'test' });
})



app.listen(5001, () => console.log('Server is listening on port http://localhost:5001'))