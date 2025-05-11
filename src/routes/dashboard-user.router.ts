import { Router } from "express";
import {
  createProcurementController,
  getUserProcurementsController,
} from "../controllers/dashboard-user.controller";
import { verifyToken } from "../lib/jwt";
import { validateProcurement } from "../validators/procurement.validator";

const router = Router();

router.get("/", verifyToken, getUserProcurementsController);
router.post("/", verifyToken, validateProcurement, createProcurementController);

export default router;
