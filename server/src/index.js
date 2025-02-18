import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

import router from './router.js';

// Ensure uploads directory exists
const uploadDir = path.join(import.meta.dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}
// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

const app = express();

try {
    await mongoose.connect('mongodb://localhost:27017/axion-angular-app');
    console.log('DB connected!');

} catch (error) {
    console.log(error.message);
}

app.use(cors());
app.use(express.json());
app.use(router);
app.use('/uploads', express.static(uploadDir));


app.listen(5001, () => console.log('Server is listening on port http://localhost:5001'))