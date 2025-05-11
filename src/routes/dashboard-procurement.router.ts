import { Router } from "express";
import { updateProcurementNoteController } from "../controllers/dashboard-procurement.controller";

const router = Router();

router.patch("/:id", updateProcurementNoteController);

export default router;
