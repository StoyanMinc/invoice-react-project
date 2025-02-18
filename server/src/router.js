import { Router } from "express";
import invoicesController from "./controllers/invoices-controller.js";
import incomingInvoiceController from "./controllers/incoming-invoice-controller.js";

const router = Router();

router.use('/invoices', invoicesController);
router.use('/incoming-invoices', incomingInvoiceController);

export default router;


