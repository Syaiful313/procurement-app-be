import { Router } from "express";
import {
  DeleteProcurementController,
  DeleteUserController,
  getUsersController,
  updateProcurementNoteController,
  updateTrackingStatusController,
} from "../controllers/dashboard-procurement.controller";
import { verifyToken } from "../lib/jwt";
import { setUserData } from "../middlewares/setUserData.middleware";

const router = Router();

router.get("/users", getUsersController);
router.patch("/:id", updateProcurementNoteController);
router.patch("/tracking-status/:id", updateTrackingStatusController);
router.delete("/:id", verifyToken, setUserData, DeleteUserController);
router.delete(
  "/procurement/:id",
  verifyToken,
  setUserData,
  DeleteProcurementController
);

export default router;
