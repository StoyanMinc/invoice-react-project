import { Router } from "express";
import invoicesController from "./controllers/invoices-controller.js";

const router = Router();

router.use('/invoices', invoicesController);

export default router;


