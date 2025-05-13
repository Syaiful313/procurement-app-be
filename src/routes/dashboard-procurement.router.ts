import { Router } from "express";
import {
  DeleteUserController,
  getUsersController,
  updateProcurementNoteController,
  updateTrackingStatusController,
} from "../controllers/dashboard-procurement.controller";

const router = Router();

router.get("/users", getUsersController);
router.patch("/:id", updateProcurementNoteController);
router.patch("/tracking-status/:id", updateTrackingStatusController);
router.delete("/:id", DeleteUserController);

export default router;
