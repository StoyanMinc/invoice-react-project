import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { createInvoice, getAllInvoices } from './services/invoice-service.js';
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
    const invoices = await getAllInvoices();
    res.json(invoices);
})

app.post('/create-invoice', async (req, res) => {
    console.log(req.body)
    await createInvoice(req.body)
   res.send(JSON.stringify({}))
})



app.listen(5001, () => console.log('Server is listening on port http://localhost:5001'))