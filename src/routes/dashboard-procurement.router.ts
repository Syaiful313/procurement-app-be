import { Router } from "express";
import {
  DeleteUserController,
  getUsersController,
  updateProcurementNoteController,
} from "../controllers/dashboard-procurement.controller";

const router = Router();

router.get("/users", getUsersController);
router.patch("/:id", updateProcurementNoteController);
router.delete("/:id", DeleteUserController);

export default router;
