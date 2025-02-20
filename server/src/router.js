import { Router } from "express";
import invoicesController from "./controllers/invoices-controller.js";
import incomingInvoiceController from "./controllers/incoming-invoice-controller.js";
import automaticInvoiceController from "./controllers/automatic-invoice-controller.js";

const router = Router();

router.use('/invoices', invoicesController);
router.use('/incoming-invoices', incomingInvoiceController);
router.use('/automatic-invoices', automaticInvoiceController);

export default router;


