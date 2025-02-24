import { Router } from "express";
import invoicesController from "./controllers/invoices-controller.js";
import incomingInvoiceController from "./controllers/incoming-invoice-controller.js";
import automaticInvoiceController from "./controllers/automatic-invoice-controller.js";
import clientController from "./controllers/client-controller.js";
import offerController from "./controllers/offer-controller.js";

const router = Router();

router.use('/invoices', invoicesController);
router.use('/incoming-invoices', incomingInvoiceController);
router.use('/automatic-invoices', automaticInvoiceController);
router.use('/clients', clientController);
router.use('/offers', offerController);
export default router;


