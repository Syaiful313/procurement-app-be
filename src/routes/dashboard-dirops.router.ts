import { Router } from "express";
import {
  getProcurementByIdController,
  getProcurementsController,
  updateProcurementStatusController,
} from "../controllers/dashboard-dirops.controller";

const router = Router();

router.get("/", getProcurementsController);
router.get("/:id", getProcurementByIdController);
router.patch("/:id", updateProcurementStatusController);

export default router;
