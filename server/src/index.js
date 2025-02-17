import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { invoiceService } from './services/invoice-service.js';
import router from './router.js';
const app = express();

try {
    await mongoose.connect('mongodb://localhost:27017/axion-angular-app');
    console.log('DB connected!');

} catch (error) {
    console.log(error.message);
}

app.use(cors());
app.use(express.json());


app.get('/test', (req, res) => {
    res.json({ message: 'test' });
})

app.use(router);


app.listen(5001, () => console.log('Server is listening on port http://localhost:5001'))